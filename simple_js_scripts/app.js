import RSSHub from 'rsshub';

RSSHub.init({
    // config
});

RSSHub.request('/youtube/user/JFlaMusic')
    .then((data) => {
        console.log(data);
    })
    .catch((e) => {
        console.log(e);
    });
