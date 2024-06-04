#! /usr/bin/env sh

# abort on error
set -e

npm run build

# create a new git repo or use existing one
git init
git add -A
git commit --allow-empty -m "deploy"

# add the remote repository
git remote add origin git@github.com:W2NJL/course_react_deep_dive.git

# push the content to the gh-pages branch in our github repo
GIT_SSH_COMMAND='ssh -i /Users/nicklangan/react_tutorial/github' git push -f origin main:gh-pages

cd -