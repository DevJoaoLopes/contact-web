# Contacts Project


[![GitHub issues](https://img.shields.io/github/issues/DevJoaoLopes/contact-web)](https://github.com/DevJoaoLopes/contact-web/issues)
[![GitHub forks](https://img.shields.io/github/forks/DevJoaoLopes/contact-web)](https://github.com/DevJoaoLopes/contact-web/network)
[![GitHub forks](https://img.shields.io/github/forks/DevJoaoLopes/contact-web)](https://github.com/DevJoaoLopes/contact-web/network)
[![GitHub license](https://img.shields.io/github/license/DevJoaoLopes/contact-web)](https://github.com/DevJoaoLopes/contact-web/blob/master/LICENSE)

## Technologies used

- Laravel
- MySQL
- React JS
- Docker (Laradock)
- Send Mail

## Run project

- Follow commands: 

Clone project

```sh
    git clone https://github.com/DevJoaoLopes/contact-web.git
```

```sh
    cd contact-web/
```

create a file called ```.env``` and copy the contents of ```.env.example``` into it
(**in the email part, put your data**)

enter the folder ```laradock```
```sh
    cd laradock/
```

run containers
```sh
    sudo docker-compose up -d nginx mysql phpmyadmin
```