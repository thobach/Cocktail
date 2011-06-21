if(Titanium.Platform.osname == 'ipad'){
	Titanium.UI.currentWindow.backgroundImage = '../images/fresh_bg.png';
}

Ti.include('../model/photo.js');
Ti.include('../model/video.js');
Ti.include('../model/glass.js');
Ti.include('../model/recipe.js');

var glasses = Glass.getGlasses();
var recipes = Recipe.getRecipes();
var photos = getPhotos();
var videos = getVideos();

var data = [];

for(var i = 0; i < recipes.length; i++){
	if(Titanium.Platform.osname == 'android'){
		data.push({title:recipes[i].getName(), hasChild:true});
	} else if(Titanium.Platform.osname == 'ipad') {
		var row = Titanium.UI.createTableViewRow({height: 90, filter: recipes[i].getName() + ' ' + recipes[i].getTags()});
		var view = Titanium.UI.createView({});
		var recipeName = Titanium.UI.createLabel({
		    text: recipes[i].getName().toUpperCase(),
		    font: {fontSize:20},
		    left: 90,
		    top: 8,
		    height: 40
		});
		var recipeTags = Titanium.UI.createLabel({
		    text: recipes[i].getTags(),
		    font: {fontSize:14},
		    top: 35,
		    left: 90,
		    bottom: 5,
		    height: 20,
		    color:'#919191'
		});
		var image = Titanium.UI.createImageView({
			image: getPhoto(recipes[i].getPhotoIds()[0]).getUrl(),
			width: 60,
			height: 80,
			left: 8,
			top: 3,
			bottom: 3
		});
		view.add(image);
		view.add(recipeName);
		view.add(recipeTags);
		row.add(view);
		row.addEventListener('click',function(e){
			recipeScrollView.scrollToView(e.index);
		});
		data.push(row);
	} else {
		data.push({title:recipes[i].getName(), leftImage:getPhoto(recipes[i].getPhotoIds()[0]).getUrl(), hasChild:true});
	}
}

var search = Titanium.UI.createSearchBar({
	showCancel : false
});

var table = Titanium.UI.createTableView({
	data: data,
	search: search,
	autoHideSearch: true,
	filterAttribute: 'title'
});

if(Titanium.Platform.osname == 'ipad'){
	table.width = 350;
	table.top = 40;
	table.bottom = 40;
	table.left = 20;
	table.filterAttribute = 'filter';
	table.borderWidth = 1;
	table.borderColor = '#999999';
} else {
	var cocktailDetailsWindow = Titanium.UI.createWindow({
		titleid:'recipe_details',
		navBarHidden: false,
		fullscreen: false
	});
	table.addEventListener('click',function (e){
		recipeScrollView.scrollToView(e.index);
		Titanium.UI.currentWindow.tab.open(cocktailDetailsWindow);
	});
}

Titanium.UI.currentWindow.add(table);

var recipeScrollView = Titanium.UI.createScrollableView({
    showPagingControl: false
});

if(Titanium.Platform.osname == 'ipad'){
	recipeScrollView.left = 400;
	recipeScrollView.top = 40;
	recipeScrollView.bottom = 40;
	recipeScrollView.right = 20;
	recipeScrollView.borderWidth = 1;
	recipeScrollView.borderColor = '#999999';
}

for(var i = 0; i < recipes.length; i++){
	var scrollViewItem = Titanium.UI.createScrollView({
		layout: 'vertical',
	    height: '100%',
	    contentWidth: '100%',
	    contentHeight: 'auto',
	    showVerticalScrollIndicator: true
	});
	if(Titanium.Platform.osname != 'android'){
		scrollViewItem.backgroundColor = 'white';		
	}
	var recipeName = Titanium.UI.createLabel({
	    text: recipes[i].getName().toUpperCase(),
	    font: {fontSize:20},
		height: 'auto',
		left: 10,
		top: 10,
		right: 10
	});
	var recipeTags = Titanium.UI.createLabel({
	    text: recipes[i].getTags(),
	    font: {fontSize:14},
	    color:'#919191',
		height: 'auto',
		left: 10,
		right: 10
	});
	
	var innerView = Titanium.UI.createView({
		left: 10,
		right: 10
	});
	var image = Titanium.UI.createImageView({
		image: getPhoto(recipes[i].getPhotoIds()[0]).getUrl(),
		width: 120,
		height: 200,
		left: 0,
		top: 0
	});
	var ingredientList = Titanium.UI.createLabel({
	    text: L('ingredients','Ingredients') + ':\n' + Component.getIngredientList(recipes[i].getComponents()),
		height: 'auto',
		width: 'auto',
		left: 130,
		top: 10
	});
	innerView.add(image);
	innerView.add(ingredientList);
	innerView.height = 'auto';
	
	var instructions = Titanium.UI.createLabel({
	    text: L('instructions','Instructions') + ':\n' + recipes[i].getInstruction(),
		height: 'auto',
		top: 5,
		left: 10,
		right: 10
	});
	
	var description = Titanium.UI.createLabel({
	    text: L('description','Description') + ':\n' + recipes[i].getDescription(),
		height: 'auto',
		top: 5,
		left: 10,
		right: 10
	});
	
	var source = Titanium.UI.createLabel({
	    text: L('source','Source') + ':\n' + recipes[i].getSource(),
		height: 'auto',
		top: 5,
		left: 10,
		right: 10
	});
	
	if(recipes[i].getVideoIds()[0] != undefined){
		var video = Ti.UI.createWebView({
	    	url: "http://www.youtube.com/embed/" + getVideo(recipes[i].getVideoIds()[0]).getYoutubeCode(),
	    	height: 200,
	    	left: 10,
	    	right: 10,
			bottom: 10
		});
		var videoLabel = Titanium.UI.createLabel({
		    text: L('video_instruction','Video Instruction') + ':',
			height: 'auto',
			top: 5,
			left: 10,
			right: 10
		});
	}
	
	scrollViewItem.add(recipeName);
	scrollViewItem.add(recipeTags);
	scrollViewItem.add(innerView);
	scrollViewItem.add(instructions);
	if(recipes[i].getDescription() != ''){
		scrollViewItem.add(description);
	}
	if(recipes[i].getSource() != ''){
		scrollViewItem.add(source);
	}
	if(recipes[i].getVideoIds()[0] != undefined){
		scrollViewItem.add(videoLabel);
		scrollViewItem.add(video);
	}
	recipeScrollView.addView(scrollViewItem);
}
	
if(Titanium.Platform.osname == 'ipad'){
	Titanium.UI.currentWindow.add(recipeScrollView);
} else {
	cocktailDetailsWindow.add(recipeScrollView);
}
