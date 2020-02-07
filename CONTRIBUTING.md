# CONTRIBUTING
## General Git Workflow
The following guidelines should be followed rigorously! Above all, there is one critical rule:
* **NEVER COMMIT/PUSH CODE DIRECTLY TO THE `master` BRANCH!** 

This means that for code to end up in the master branch, pull-requests will need to be opened in order for code reviews to be conducted to ensure that incorporation of said branch will be sound not break anything. These branches, called feature branches, are created and worked on usually by 1 member. They are called feature branches because they represent a specific feature (sometimes fix, etc) that was solely meant for it to address. 

That being said, the basic process of creating branches, committing code to them, and opening pull-requests are as follow:

* If you haven't already, clone the repository locally in some folder of your choice:
```
git clone https://github.com/gisellemartel/CONPASS
```
* After each sprint has been planned and you have been assigned issues, it is time to create a new branch to start your work on
    * Issues in GitHub all have numbers associated to them. Take the name of the issue and create the name the branch based off it with the issue number appended to it. For example, say we have "#1 Good first issue" as the title of an issue, an ideal name for your new branch would be `good-first-issue-1`
    * Make sure to keep the entire thing lowercase with dashes between words/numbers and the issue number appended at the end
    * Before entering the command, make sure before you do a `git pull` and a `git branch` to ensure that you see the `*` next to the `master` branch name. Avoid branching off a feature branch at all cost, it could end up being a mess and having conflicts later down the line 
    * Create the new branch using `git branch good-first-issue-1`, i.e `git branch <new-branch-name>`
    * Switch to that branch using `git checkout good-first-issue-1`, i.e. `git checkout <new-branch-name>`
* **Make some changes**
    * Edit and save your changes inside the branch, but don't wait too long to start committing, that is bad practice and you should always aim for the motto "commit small and commit often!"
* **Stage your changes**
    * Use `git status` to see files ready to be staged
    * Use `git add <filename> <another-filename>` to add files to staging area in preparation to commit
    * Repeat above as many times as you need but only on files that should be logically grouped together for your commit (next step), i.e. don't change 10 files with each having 10 different reasons of having been edited -- "commit small and commit often!"
* **Commit your changes**
    * Use `git commit -m '[#n] <commit-msg>'` to commit your newly staged files (the staged files should only have changes to reflect/related to this commit message)
    * Example: `git commit -m '[#1] Add api route for restaurant menu'` 
    * Try to keep the commit messages one sentence, **first letter always capitalized only, no punctuation**, and write only in the **present tense**
        * **NO** "Add*ed* ability to do this.", "Fix*ed* ...", "*c*hang*ed* ...", etc
        * **YES** "Add ability to do this", "Fix ...", "Change ...", etc
    * Also remember to prepend the commit message with `[#n]`, where `n` is the issue number you are working on associated with your branch. This will ensure that all commits pushed will show up under the issue on GitHub and will make things automatically trackable, easier to manage. It's a really cool feature!
* **Push your commits to the remote repository**
    * Use `git pull` always before you push (potentially resolve merge conflicts)
    * Use `git push origin good-first-issue-1`, i.e. `git push origin <name-of-branch>`
* **Open a pull-request**
    * Over time, after doing this 4-step cycle (edit, stage, commit, push) for a while (I recommend to always push before leaving your workstation for the day or else it's easy to forget what you were working on and can be tricky if someone else made new changes that would now conflict yours when you pull), you'll be done implementing your feature/issue and will want to merge the branch into master
    * The process of opening a pull-request will ensure that only once a predetermined number of collaborators have reviewed and approved the changes will it be possible for the merge to occur. This is common practice and strongly encouraged
    * To open a pull-request, no commands are required, all is done through GitHub. Google "open pull request github" and you'll have lots of good sources showing you how
    * You're done! Well, sorta, time to move on to the next issue and branch! 

## More on Commit Messages
* Try to keep commit messages relatively short and concise, describing the changes you are introducing with it to the state of the project. Add the issue number(s) related to your commit at the start of the commit.
* Example: Assuming there are two issues (13, 20) this commit is related to then use 
```
git commit -m '[#13][#20] update feature X to include Y and remove Z
```
