### InVerte Q1 Dev

## Three main areas of development {api, client, scripts}
Each item is its own git module <=> Submodule structure

## Important: Commit to the individual git submodule!

## Cloning the repository, does not clone the content of the Git submodule.
Use : git submodule update --init --recursive : to pull the latest repo.

# After it is pulled, just update it constantly.
Use: git submodule update --remote --merge : to update a git submodule.
# For more specific update, fetch new submodule commits
Use:  cd name_of_submodule & git fetch
Then: git log --oneline origin/master -3
Finally: git checkout -q commit# & git add

## inverte-api repo

# Express-powered server using MVC paradigm

# How to run?
1) npm install
2) npm run dev


## inverte-react-client repo
React-powered web app. 
Requires that the inverte-api service is running.

# How to run?
1) npm install
2) npm run start


