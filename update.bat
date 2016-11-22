@echo off
cls
git add .
git commit -am "Snelle update"
git push origin person
cd ..
cd questionit
git add .
git commit -am "Snelle update"
git push
