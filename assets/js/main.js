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

        fetch(`https://api.github.com/users/${username}/repos?sort=created&order=desc?client_id=25bb194b081525d08147&client_secret=85f00c5312adc3596dbbc4c15ae7db009e99f9e5`)
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
        this.viewData.forEach(repo => {

            if (repo.description == null) {
                repo.description = ""
            }

            repoList.push(`
                <div class="repo">
                    <a class="name" title="Redirect to github.com" target="_blanc" href="${repo.html_url}">${repo.name}</a><br>
                    <span class="description">${repo.description}</span><br>
                    <span><i class="fas fa-star">&nbsp;</i>${repo.stargazers_count}</span>
                    <span><i class="fas fa-code-branch">&nbsp;</i>${repo.forks}</span>
                </div>                    
            `)
        })
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

const api = new github


function background() {
    let backgroundSelection = document.querySelector('input[type=radio]:checked').value
    localStorage.setItem("background-image", `url('assets/img/background-${backgroundSelection}.jpg')`);
    document.body.style.backgroundImage = localStorage.getItem("background-image");
}
document.querySelector('#bg-select-button').addEventListener("click", background)



function weather_api() {
    
    fetch(`https://api.openweathermap.org/data/2.5/weather?zip=10367,de&units=metric&appid=6ae8d6fa95479985fa2f3d6c41820fbd`)
        .then(
            response => response.json()
        )
        .then(
            weather => {
                
                console.log(weather)
                let weatherData = [];
                weatherData.push(`
                    <strong>Weather in ${weather.name}:</strong><br>
                    <div class="weather">
                        <div class="weather-icon">
                            <img src="http://openweathermap.org/img/w/${weather.weather[0].icon}.png">
                        </div>
                        <div class="weather-data">
                            <span>${weather.weather[0].main}</span><br>
                            <span>${weather.main.temp}°C</span>
                        </div>
                    </div>
            `)
                document.querySelector('#weather').innerHTML = weatherData.join('')
            },
        )
        .catch(
            err => console.log(`panic: ${err}`)
        )
}
weather_api()