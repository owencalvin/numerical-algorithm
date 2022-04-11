set -e
npm run build
npm run docs
echo "DirectoryIndex index.html" > dist/docs/.htaccess
git add .
git commit
git push
