#!/bin/bash

# Augment Trial Reset - 上游同步脚本
# 用于同步 TrialLord/augment-trial-reset 仓库的更新

set -e  # 遇到错误立即退出

echo "🔄 开始同步上游仓库..."

# 检查是否在git仓库中
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    echo "❌ 错误：当前目录不是git仓库"
    exit 1
fi

# 配置git用户信息（如果需要）
git config user.name "Auto Sync" 2>/dev/null || true
git config user.email "autosync@local" 2>/dev/null || true

# 添加上游远程仓库（如果不存在）
if ! git remote get-url upstream > /dev/null 2>&1; then
    echo "📡 添加上游远程仓库..."
    git remote add upstream https://github.com/TrialLord/augment-trial-reset.git
else
    echo "📡 上游远程仓库已存在"
fi

# 获取上游更新
echo "⬇️ 获取上游更新..."
git fetch upstream

# 检查是否有更新
LOCAL_COMMIT=$(git rev-parse HEAD)
UPSTREAM_COMMIT=$(git rev-parse upstream/master)

echo "本地提交: $LOCAL_COMMIT"
echo "上游提交: $UPSTREAM_COMMIT"

if [ "$LOCAL_COMMIT" = "$UPSTREAM_COMMIT" ]; then
    echo "✅ 仓库已是最新版本，无需同步"
    exit 0
fi

echo "🔍 发现上游更新，开始同步..."

# 检查工作目录是否干净
if ! git diff-index --quiet HEAD --; then
    echo "⚠️ 工作目录有未提交的更改，正在暂存..."
    git stash push -m "Auto-stash before upstream sync $(date)"
    STASHED=true
else
    STASHED=false
fi

# 尝试合并
echo "🔀 合并上游更改..."
if git merge upstream/master --no-edit; then
    echo "✅ 合并成功"
else
    echo "❌ 合并冲突，需要手动解决"
    echo "请解决冲突后运行: git commit && git push origin master"
    exit 1
fi

# 如果之前有stash，尝试恢复
if [ "$STASHED" = true ]; then
    echo "📥 恢复之前暂存的更改..."
    if git stash pop; then
        echo "✅ 暂存更改已恢复"
    else
        echo "⚠️ 恢复暂存更改时发生冲突，请手动处理"
    fi
fi

echo "🚀 推送更新到远程仓库..."
git push origin master

echo "🎉 同步完成！"
echo "📊 同步详情:"
echo "  - 从: https://github.com/TrialLord/augment-trial-reset.git"
echo "  - 到: $(git remote get-url origin)"
echo "  - 提交: $LOCAL_COMMIT -> $UPSTREAM_COMMIT" 