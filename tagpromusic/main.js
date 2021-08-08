var audioplayer = document.getElementById("audioplayer");
var nowplaying = document.getElementById("nowplaying");
var JSONdata;

function makeURL(itemURL, ext) {
    return "https://tagpro.koalabeast.com/sounds/music/" + itemURL + "." + ext;
}

function attachSources(player, partialurl) {
    var types = [
        {"ext": "mp3", "type": "audio/mp3"},
        {"ext": "ogg", "type": "audio/ogg"},
        {"ext": "m4a", "type": "audio/m4a"}
    ];
    while(player.firstChild) {
        player.removeChild(player.firstChild);
    }
    for(var i = 0; i < types.length; i++) {
        var source = document.createElement("source");
        source.src = makeURL(partialurl, types[i].ext);
        source.type = types[i].type;
        player.appendChild(source);
    }
}

function attachDownloadLink(row, item, ext) {
    var td = document.createElement("td");
    var downloadLink = document.createElement("a");
    downloadLink.href = makeURL(item.url, ext);
    downloadLink.textContent = "(" + ext + ")";
    td.appendChild(downloadLink);
    row.appendChild(td);
}

function attachDownloadLinks(row, item) {
    var exts = ["mp3", "ogg"];
    for(var i = 0; i < exts.length; i++) {
        attachDownloadLink(row, item, exts[i]);
    }
}

function makeHandler(item) {
    return function() {
        audioplayer.onended = null;
        audioplayer.loop = true;

        nowplaying.textContent = item.name + " by " + item.author;
        attachSources(audioplayer, item.url);
        audioplayer.volume = item.volume;
        audioplayer.load(); // Needed when changing source elements dynamically, per http://stackoverflow.com/questions/7953593/change-source-to-audio-html5-element
        audioplayer.play();
    };
}

function init(data) {
    JSONdata = data;
    for(var i = 0; i < data.length; i++) {
        var tr = document.createElement("tr");
        var button = document.createElement("button");
        var name = data[i].name; var author = data[i].author;
        button.textContent = name + " by " + author;
        button.addEventListener("click", makeHandler(data[i]), false);
        buttonTD = document.createElement("td");
        buttonTD.appendChild(button);
        tr.appendChild(buttonTD);
        attachDownloadLinks(tr, data[i]);
        musiclist.appendChild(tr);
    }
}

function shuffleInit() {
  var playing = shuffle();
  audioplayer.loop = false;
  audioplayer.onended = shuffle;
}

function shuffle() {
    var rand = Math.floor(Math.random() * JSONdata.length) + 1; // Generate a random number 1-19
    var button = document.getElementsByTagName('button')[rand];
    button.click(); // Click a random button
    audioplayer.loop = false;
    audioplayer.onended = shuffle;
    return rand;
}

function makeListener() {
  audioplayer.addEventListener('ended', shuffle(audioplayer, 0), false);
}
