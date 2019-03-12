class github {
    constructor() {
        this.data = null
        this.viewData = null
        this.github_repositories()

        this.filterRepo()
        this.filterWithEnter()
    }

    github_repositories() {

        let username = document.querySelector('#username-input').value || 'peter-stuhlmann'

        fetch(`https://api.github.com/users/${username}/repos?client_id=25bb194b081525d08147&client_secret=85f00c5312adc3596dbbc4c15ae7db009e99f9e5`)
            .then(
                response => response.json()
            )
            .then(
                repos =>
                this.update(repos)

            )
            .catch(
                err => console.log(`panic: ${err}`)
            )
    }

    update(data) {
        this.data = data
        this.viewData = data
        this.template()
    }

    template() {
        let repoList = []
        this.viewData.forEach(repo =>
            repoList.push(`
                                <div class="repo">
                                    <a class="name" title="Redirect to github.com" target="_blanc" href="${repo.html_url}">${repo.name}</a><br>
                                    <span class="description">${repo.description}</span><br>
                                    <span><i class="fas fa-star">&nbsp;</i>${repo.stargazers_count}</span>
                                    <span><i class="fas fa-code-branch">&nbsp;</i>${repo.forks}</span>
                                </div>                    
                            `)
        )
        document.querySelector('.github-repositories').innerHTML = repoList.join('')

    }

    filterRepo() {
        document.querySelector('#repository-input').addEventListener("keyup", () => {
            let newData = this.data.filter(item => item.name.toLowerCase().includes(event.target.value.toLowerCase()))
            this.viewData = newData
            this.template()
        })
    }

    // 'Enter' instead of button click
    filterWithEnter() {
        document.querySelector('#username-input').addEventListener('keypress', (e) => {
            if (e.keyCode === 13) {
                this.github_repositories()
            }
        });
    }
}


document.body.style.backgroundImage = localStorage.getItem("background-image");

let interval = 1000;

setInterval(function () {
    let currentTime = moment().format('HH:mm:ss')
    document.querySelector("#currentTime").innerHTML = currentTime
}, interval);


function gitRepoFilter() {

}

const api = new github



function background() {
    let backgroundSelection = document.querySelector('input[type=radio]:checked').value
    localStorage.setItem("background-image", `url('assets/img/background-${backgroundSelection}.jpg')`);
    document.body.style.backgroundImage = localStorage.getItem("background-image");
}
document.querySelector('#bg-select-button').addEventListener("click", background)
