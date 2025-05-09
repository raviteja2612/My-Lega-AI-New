Remove-Item -Recurse -Force .next, node_modules
Remove-Item -Force package-lock.json
npm install --legacy-peer-deps
npm run dev