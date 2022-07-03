// to expand an article
document.getElementById('readbetter_1').onclick = function() {
    if (document.getElementById('article_1').classList.contains('article_expand')) {
        document.getElementById('article_1').classList.remove('article_expand');
        document.getElementById('article_2').classList.remove('article_hidden');
        document.getElementById('article_3').classList.remove('article_hidden');
        document.getElementById('readbetter_1').innerHTML = "Read full screen";
    } else {
        document.getElementById('article_1').classList.add('article_expand');
        document.getElementById('article_2').classList.add('article_hidden');
        document.getElementById('article_3').classList.add('article_hidden');
        document.getElementById('readbetter_1').innerHTML = "Choose another article";
    }
}

document.getElementById('readbetter_2').onclick = function() {
    if (document.getElementById('article_2').classList.contains('article_expand')) {
        document.getElementById('article_1').classList.remove('article_hidden');
        document.getElementById('article_2').classList.remove('article_expand');
        document.getElementById('article_3').classList.remove('article_hidden');
        document.getElementById('readbetter_2').innerHTML = "Read full screen";
    } else {
        document.getElementById('article_1').classList.add('article_hidden');
        document.getElementById('article_2').classList.add('article_expand');
        document.getElementById('article_3').classList.add('article_hidden');
        document.getElementById('readbetter_2').innerHTML = "Choose another article";
    }
}

document.getElementById('readbetter_3').onclick = function() {
    if (document.getElementById('article_3').classList.contains('article_expand')) {
        document.getElementById('article_1').classList.remove('article_hidden');
        document.getElementById('article_2').classList.remove('article_hidden');
        document.getElementById('article_3').classList.remove('article_expand');
        document.getElementById('readbetter_3').innerHTML = "Read full screen";
    } else {
        document.getElementById('article_1').classList.add('article_hidden');
        document.getElementById('article_2').classList.add('article_hidden');
        document.getElementById('article_3').classList.add('article_expand');
        document.getElementById('readbetter_3').innerHTML = "Choose another article";
    }
}
