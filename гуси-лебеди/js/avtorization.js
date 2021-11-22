const authoriz = function () {

    const modalWrapper = document.querySelector('.modal-auth');
    const btnClose = document.querySelector('.close-auth');

    const btnOn = document.querySelector('#btn_in');
    const btnOut = document.querySelector('#btn_out');

    const cartButton = document.querySelector('#cart-button');

    const userName = document.getElementById('login');
    const userPass = document.getElementById('password');

    const btnLog = document.querySelector('.button-login')
    const userNameSpan = document.querySelector('.user-name');// спан логин

    const author = document.getElementById('logInForm');
    const error = document.getElementById('error');

    const login = (user) => {
        btnOn.style.display = 'none';

        btnOut.style.display = 'flex';
        cartButton.style.display = 'flex';

        userNameSpan.style.display = 'flex';
        userNameSpan.textContent = user.login;

        modalWrapper.style.display = 'none';
    };

    const logout = () => {
        btnOn.style.display = 'flex';

        btnOut.style.display = 'none';
        cartButton.style.display = 'none';

        userNameSpan.style.display = 'flex';
        userNameSpan.textContent = '';

        localStorage.removeItem('user');
    };

    btnOut.addEventListener('click', logout);

    btnOn.addEventListener('click', () => {
        modalWrapper.style.display = 'flex';
    });

    btnClose.addEventListener('click', () => {
        modalWrapper.style.display = 'none';
    });

    modalWrapper.addEventListener('click', (e) => {
        if (e.target === e.currentTarget) {
            modalWrapper.style.display = 'none';
        }
    });

    document.addEventListener('keyup', (e) => {
        if (e.key === 'Escape') { modalWrapper.style.display = 'none'; }
    });

    author.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log(userNameSpan.value);

        valid();
    });

    function valid() {
        if ((userName.value.trim().length > 0) && (userPass.value.trim().length > 0)) {
            const user = {
                login: userName.value,
                password: userPass.value
            };

            localStorage.setItem('user', JSON.stringify(user))
            login(user)
        }

        else {
            error.textContent = "Вы не заполнили поля!";
        }
    }

    if (localStorage.getItem('user') !== null) {
        login(JSON.parse(localStorage.getItem('user')))
    }

}

export { authoriz }