let interval = 1000;

setInterval(function () {
    let currentTime = moment().format('HH:mm:ss')
    document.querySelector("#currentTime").innerHTML = currentTime
}, interval);


function github_repositories() {
    
    fetch(`https://api.github.com/users/peter-stuhlmann/repos?client_id=25bb194b081525d08147&client_secret=85f00c5312adc3596dbbc4c15ae7db009e99f9e5`)
        .then(
            response => response.json()
        )
        .then(
            repos => {
                let repoList = [];
                repos.slice(0,5).forEach(
                    repo => {
                        repoList.push(`
                        <div class="repo">
                            <a class="name" title="Redirect to github.com" target="_blanc" href="${repo.html_url}">${repo.name}</a><br>
                            <span class="description">${repo.description}</span><br>
                            <span><i class="fas fa-star">&nbsp;</i>${repo.stargazers_count}</span>
                            <span><i class="fas fa-code-branch">&nbsp;</i>${repo.forks}</span>
                        </div>                    
                    `)
                    }
                )
                document.querySelector('.github-repositories').innerHTML = repoList.join('')

            },
        )
        .catch(
            err => console.log(`panic: ${err}`)
        )
}
github_repositories()