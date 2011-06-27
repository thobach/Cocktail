function Photo() {
	this.listNumber;
	this.id;
	this.name;
	this.description;
	this.url;
	this.originalFileName;
	this.photoCategory;
}

Photo.prototype.setListNumber = function (value) {
	this.listNumber = value;
}
Photo.prototype.getListNumber = function () {
	return this.listNumber;
}
Photo.prototype.setId = function (value) {
	this.id = value;
}
Photo.prototype.getId = function () {
	return this.id;
}
Photo.prototype.setName = function (value) {
	this.name = value;
}
Photo.prototype.getName = function () {
	return this.name;
}
Photo.prototype.setDescription = function (value) {
	this.description = value;
}
Photo.prototype.getDescription = function () {
	return this.description;
}
Photo.prototype.setUrl = function (value) {
	this.url = value;
}
Photo.prototype.getUrl = function () {
	if(this.getPhotoCategory() == 2){
		return '/images/glasses/' + this.getOriginalFileName();
	} else {
		return this.url;
	}
}
Photo.prototype.setOriginalFileName = function (value) {
	this.originalFileName = value;
}
Photo.prototype.getOriginalFileName = function () {
	return this.originalFileName;
}
Photo.prototype.setPhotoCategory = function (value) {
	this.photoCategory = value;
}
Photo.prototype.getPhotoCategory = function () {
	return this.photoCategory;
}

Photo.photoLoaded = function (id, photos) {
	for(var i = 0; i < photos.length; i++) {
		if(photos[i].getId() == id) {
			return true;
		}
	}
	return false;
}

Photo.getPhoto = function (id, photos) {
	if(photos instanceof Array){
		for(var i = 0; i < photos.length; i++) {
			if(photos[i].getId() == id) {
				return photos[i];
			}
		}
	}
	return null;
}


Photo.getPhotos = function (recipesJson) {
	var photos = [];
	var photoNumber = 0;
	for(var i = 0; i < recipesJson.length; i++) {
		// glass photo
		if(!Photo.photoLoaded(recipesJson[i].glass.photo['@attributes'].id, photos)) {
			var photo = new Photo();
			photo.setListNumber(photoNumber);
			photo.setId(recipesJson[i].glass.photo['@attributes'].id);
			photo.setName(recipesJson[i].glass.photo['@attributes'].name);
			photo.setDescription(recipesJson[i].glass.photo['@attributes'].description);
			photo.setUrl(recipesJson[i].glass.photo['@attributes'].url);
			photo.setOriginalFileName(recipesJson[i].glass.photo['@attributes'].originalFileName);
			photo.setPhotoCategory(recipesJson[i].glass.photo['@attributes'].photoCategory);
			photos.push(photo);
			photoNumber++;
		}
		// recipe photos
		if(recipesJson[i].photos != null && recipesJson[i].photos.photo != null && !Photo.photoLoaded(recipesJson[i].photos.photo['@attributes'].id, photos)) {
			var photo = new Photo();
			photo.setListNumber(photoNumber);
			photo.setId(recipesJson[i].photos.photo['@attributes'].id);
			photo.setName(recipesJson[i].photos.photo['@attributes'].name);
			photo.setDescription(recipesJson[i].photos.photo['@attributes'].description);
			photo.setUrl(recipesJson[i].photos.photo['@attributes'].url);
			photo.setOriginalFileName(recipesJson[i].photos.photo['@attributes'].originalFileName);
			photo.setPhotoCategory(recipesJson[i].photos.photo['@attributes'].photoCategory);
			photos.push(photo);
			photoNumber++;
		}
	}
	return photos;
}