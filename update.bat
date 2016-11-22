@echo off
cls
git add .
git commit -am "Snelle update"
git push
cd ..
cd questionit
git add .
git commit -am "Snelle update"
git push
