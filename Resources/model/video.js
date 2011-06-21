var videos = [];

function getVideos() {
	if(videos.length == 0){
		var videoNumber = 0;
		for(var i = 0; i < recipesJson.length; i++) {
			if(recipesJson[i].videos.video != null && !videoLoaded(recipesJson[i].videos.video['@attributes'].id)) {
				var video = new Video();
				video.setListNumber(videoNumber);
				video.setId(recipesJson[i].videos.video['@attributes'].id);
				video.setName(recipesJson[i].videos.video['@attributes'].name);
				video.setDescription(recipesJson[i].videos.video['@attributes'].description);
				video.setUrl(recipesJson[i].videos.video['@attributes'].url);
				video.setInsertDate(recipesJson[i].videos.video['@attributes'].insertDate);
				video.setUpdateDate(recipesJson[i].videos.video['@attributes'].updateDate);
				videos.push(video);
				videoNumber++;
			}
		}
	}
	return videos;
}

function videoLoaded(id) {
	for(var i = 0; i < videos.length; i++) {
		if(videos[i].getId() == id) {
			return true;
		}
	}
	return false;
}

function getVideo(id) {
	for(var i = 0; i < videos.length; i++) {
		if(videos[i].getId() == id) {
			return videos[i];
		}
	}
	return null;
}

function Video() {
	this.listNumber;
	this.id;
	this.name;
	this.description;
	this.url;
	this.insertDate;
	this.updateDate;
}

Video.prototype.setListNumber = function (value) {
	this.listNumber = value;
}
Video.prototype.getListNumber = function () {
	return this.listNumber;
}
Video.prototype.setId = function (value) {
	this.id = value;
}
Video.prototype.getId = function () {
	return this.id;
}
Video.prototype.setName = function (value) {
	this.name = value;
}
Video.prototype.getName = function () {
	return this.name;
}
Video.prototype.setDescription = function (value) {
	this.description = value;
}
Video.prototype.getDescription = function () {
	return this.description;
}
Video.prototype.setUrl = function (value) {
	this.url = value;
}
Video.prototype.getUrl = function () {
	return this.url;
}
Video.prototype.getYoutubeCode = function () {
	return this.url.substr('http://www.youtube.com/v/'.length);
}
Video.prototype.setInsertDate = function (value) {
	this.insertDate = value;
}
Video.prototype.getInsertDate = function () {
	return this.insertDate;
}
Video.prototype.setUpdateDate = function (value) {
	this.updateDate = value;
}
Video.prototype.getUpdateDate = function () {
	return this.updateDate;
}