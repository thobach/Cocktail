/**
 * Setup Data 
 */
Ti.include('../model/component.js');
Ti.include('../model/glass.js');
Ti.include('../model/recipe.js');
Ti.include('../model/photo.js');
Ti.include('../model/ingredient.js');
Ti.include('../model/video.js');

var CocktailApp = Titanium.UI.currentWindow.app;

var recipes = CocktailApp.recipes;
var photos = CocktailApp.photos;
var videos = CocktailApp.videos;
var glasses = CocktailApp.glasses;

var data = [];
var lastHeader;

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
			image: Photo.getPhoto(recipes[i].getPhotoIds()[0], photos).getUrl(),
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
			CocktailApp.recipeScrollView.scrollToView(e.index);
		});
		// group recipes by alphabet
		if(lastHeader != recipes[i].getName().charAt(0)) {
			lastHeader = row.header = recipes[i].getName().charAt(0);
		}
		data.push(row);
	} else {
		data.push({title:recipes[i].getName(), leftImage:Photo.getPhoto(recipes[i].getPhotoIds()[0], photos).getUrl(), hasChild:true});
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
		CocktailApp.recipeScrollView.scrollToView(e.index);
		Titanium.UI.currentWindow.tab.open(cocktailDetailsWindow);
	});
}

Titanium.UI.currentWindow.add(table);

Titanium.UI.currentWindow.addEventListener('focus', function (e){
	if(Titanium.Platform.osname == 'ipad'){
		updateScrollView(Titanium.Gesture.orientation);
		updateLayout(Titanium.Gesture.orientation);
		Titanium.UI.currentWindow.add(CocktailApp.recipeScrollView);
	}
});

var scrollViews = [];

for(var i = 0; i < recipes.length; i++){
	
	var scrollViewItem = Titanium.UI.createScrollView({
	    height: '100%',
	    contentWidth: '100%',
	    contentHeight: 'auto',
	    showVerticalScrollIndicator: true,
	    layout: 'vertical'
	});
	
	if(Titanium.Platform.osname != 'android'){
		scrollViewItem.backgroundColor = 'white';		
	}

	var image = Titanium.UI.createImageView({
		image: Photo.getPhoto(recipes[i].getPhotoIds()[0], photos).getUrl(),
		width: 120,
		height: 200,
		left: 10,
		top: 60
	});
	
	if(Titanium.Platform.osname == 'ipad'){
		if(recipes[i].getHasPhotos()){
			image.width = 250;
			image.height = 350;
		} else {
			image.width = 160;
			image.height = 233;
		}	
	}
	
	var aboveImageView = Titanium.UI.createView({
		layout: 'vertical'
	});
	
	var belowImageView = Titanium.UI.createView({
		layout: 'vertical'
	});
	
	scrollViewItem.aboveImageView = aboveImageView;
	scrollViewItem.belowImageView = belowImageView;
	scrollViewItem.image = image;
	scrollViewItem.glassImage = glassImage;
	
	var recipeName = Titanium.UI.createLabel({
	    text: recipes[i].getName().toUpperCase(),
	    font: {fontSize:20},
		height: 'auto',
		left: 10,
		top: 10,
		right: 10,
	    focusable: false,
	    touchEnabled: false
	});
	var recipeTags = Titanium.UI.createLabel({
	    text: recipes[i].getTags(),
	    font: {fontSize:14},
	    color:'#919191',
		height: 'auto',
		left: 10,
		right: 10,
	    focusable: false,
	    touchEnabled: false
	});
	
	var ingredients = Titanium.UI.createLabel({
	    text: L('ingredients','Ingredients') + ':\n',
		height: 'auto',
		width: 'auto',
		left: 10,
		top: 10,
	    focusable: false,
	    touchEnabled: false,
	    color: '#CF0060'
	});
	
	var ingredientList = Titanium.UI.createLabel({
	    text: Component.getIngredientList(recipes[i].getComponents()),
		height: 'auto',
		width: 'auto',
		left: 10,
	    focusable: false,
	    touchEnabled: false
	});
	
	if(Titanium.Platform.osname == 'ipad'){
		if(recipes[i].getHasPhotos()){
			belowImageView.left = 260;
		} else {
			belowImageView.left = 170;
		}
		scrollViewItem.ingredients = ingredients;
		scrollViewItem.ingredientList = ingredientList;
	}
	
		
	var glassLabel = Titanium.UI.createLabel({
	    text: L('glass','Glass') + ':',
	    height: 'auto',
	    left: 10,
		right: 10,
		top: 10,
	    focusable: false,
	    touchEnabled: false,
	    color: '#CF0060'
	});
	
	var glassImage = Titanium.UI.createImageView({
		image: Photo.getPhoto(Glass.getGlass(recipes[i].getGlassId(), glasses).getPhotoId(), photos).getUrl(),
		left: 10,
		top: 5,
		width: 100,
		height: 100*160/233,
	});
	
	var glassName = Titanium.UI.createLabel({
	    text: Glass.getGlass(recipes[i].getGlassId(), glasses).getName(),
	    height: 'auto',
	    left: 10,
		right: 10,
		top: 5,
	    focusable: false,
	    touchEnabled: false
	});
	
	var instructions = Titanium.UI.createLabel({
	   	text: L('instructions','Instructions') + ':\n',
		height: 'auto',
		top: 5,
		left: 10,
		right: 10,
	    focusable: false,
	    touchEnabled: false,
	    color: '#CF0060'
	});
	
	var instructionsText = Titanium.UI.createLabel({
	    text: recipes[i].getInstruction(),
		height: 'auto',
		left: 10,
		right: 10,
	    focusable: false,
	    touchEnabled: false
	});
	
	var description = Titanium.UI.createLabel({
	    text: L('description','Description') + ':\n',
		height: 'auto',
		top: 5,
		left: 10,
		right: 10,
	    focusable: false,
	    touchEnabled: false,
	    color: '#CF0060'
	});
	
	var descriptionText = Titanium.UI.createLabel({
	    text: recipes[i].getDescription(),
		height: 'auto',
		left: 10,
		right: 10,
	    focusable: false,
	    touchEnabled: false
	});
	
	var source = Titanium.UI.createLabel({
	    text: L('source','Source') + ':\n',
		height: 'auto',
		top: 5,
		left: 10,
		right: 10,
	    focusable: false,
	    touchEnabled: false,
	    color: '#CF0060'
	});
	
	var sourceText = Titanium.UI.createLabel({
	    text: recipes[i].getSource(),
		height: 'auto',
		left: 10,
		right: 10,
	    focusable: false,
	    touchEnabled: false
	});
	
	var furtherInfo = Titanium.UI.createLabel({
	    text: L('further_information','Further Information') + ':',
		height: 'auto',
		top: 5,
		left: 10,
		right: 10,
	    focusable: false,
	    touchEnabled: false,
	    color: '#CF0060'
	});
	
	var furtherInfoText = Titanium.UI.createLabel({
	    text: L('preparation_time','Preparation Time') + ': ' + recipes[i].getWorkMin() + ' min\n' + L('difficulty','Difficulty') + ': ' + L(recipes[i].getDifficulty(),'unknown') + '\n' + L('calories','Calories') + ': ' + recipes[i].getCaloriesKcal() + ' kcal\n' + L('alcohol_level','Alcohol Level') + ': ' + recipes[i].getAlcoholLevel() + '%\n' + L('volume','Volume') + ': ' + recipes[i].getVolumeCl() + ' cl',
		height: 'auto',
		left: 10,
		right: 10,
	    focusable: false,
	    touchEnabled: false
	});
	
	if(recipes[i].getVideoIds()[0] != undefined){
		var video = Titanium.UI.createLabel({
		    text: L('video_instruction','Video Instruction') + ':',
			height: 'auto',
			top: 5,
			left: 10,
			right: 10,
		    focusable: false,
		    touchEnabled: false,
	    	color: '#CF0060'
		});
		var videoContent = Ti.UI.createWebView({
	    	url: 'http://www.youtube.com/embed/' + Video.getVideo(recipes[i].getVideoIds()[0], videos).getYoutubeCode(),
	    	height: 200,
	    	left: 10,
	    	right: 10,
			bottom: 10
		});
	}
	aboveImageView.add(recipeName);
	aboveImageView.add(recipeTags);	
	belowImageView.add(ingredients);
	belowImageView.add(ingredientList);
	belowImageView.add(glassLabel);
	belowImageView.add(glassImage);
	belowImageView.add(glassName);
	belowImageView.add(instructions);
	belowImageView.add(instructionsText);
	belowImageView.height = 'auto';
	
	if(recipes[i].getDescription() != null){
		belowImageView.add(description);
		belowImageView.add(descriptionText);
	}
	if(recipes[i].getSource() != null){
		belowImageView.add(source);
		belowImageView.add(sourceText);
	}
	belowImageView.add(furtherInfo);
	belowImageView.add(furtherInfoText);
	if(recipes[i].getVideoIds()[0] != undefined){
		belowImageView.add(video);
		belowImageView.add(videoContent);
	}
	scrollViewItem.add(aboveImageView);
	scrollViewItem.add(image);
	scrollViewItem.add(belowImageView);
	scrollViews.push(scrollViewItem);
	CocktailApp.recipeScrollView.addView(scrollViewItem);
}
	
if(Titanium.Platform.osname == 'ipad'){
	
	function updateLayout (orientation) {
		
		CocktailApp.recipeScrollView.borderWidth = 1;
		CocktailApp.recipeScrollView.borderColor = '#999999';
		
		if(orientation == Ti.UI.LANDSCAPE_LEFT || orientation == Ti.UI.LANDSCAPE_RIGHT){
			CocktailApp.recipeScrollView.top = 40;
			CocktailApp.recipeScrollView.bottom = 40;
			CocktailApp.recipeScrollView.right = 20;
			CocktailApp.recipeScrollView.width = 644;
			CocktailApp.recipeScrollView.left = 340;
			
			table.top = 40;
			table.bottom = 40;
			table.left = 20;
			table.width = 300;
			
			Titanium.UI.currentWindow.backgroundImage = '../images/fresh_bg.png';
		} else {
			CocktailApp.recipeScrollView.top = 5;
			CocktailApp.recipeScrollView.bottom = 5;
			CocktailApp.recipeScrollView.right = 5;
			CocktailApp.recipeScrollView.width = 448;
			CocktailApp.recipeScrollView.left = 310;			
			
			table.left = 5;
			table.top = 5;
			table.bottom = 5;
			table.width = 300;
			Titanium.UI.currentWindow.backgroundImage = '../images/fresh_bg_portrait.png';
		}
	}
	
	function updateScrollView (orientation) {
		
		if(orientation == Ti.UI.LANDSCAPE_LEFT || orientation == Ti.UI.LANDSCAPE_RIGHT){
			for(var i = 0; i < scrollViews.length; i++){
				if(recipes[i].getHasPhotos()){
					scrollViews[i].aboveImageView.left = 260;
					scrollViews[i].belowImageView.left = 260;
			    } else {
			    	scrollViews[i].aboveImageView.left = 170;
			    	scrollViews[i].belowImageView.left = 170;
			    }
			    scrollViews[i].aboveImageView.right = 10;
	    		scrollViews[i].belowImageView.right = 10;
	    		scrollViews[i].aboveImageView.top = 10;
	    		scrollViews[i].belowImageView.top = 75;
	    		scrollViews[i].image.top = 25;
	    		scrollViews[i].layout = 'auto';
    		}		
    	} else {
    		for(var i = 0; i < scrollViews.length; i++){
    			scrollViews[i].layout = 'vertical';
    			
    			scrollViews[i].aboveImageView.top = 10;
    			
    			scrollViews[i].aboveImageView.left = 10;
    			scrollViews[i].belowImageView.left = 10;
    			
    			scrollViews[i].belowImageView.top = 10;
    			scrollViews[i].image.top = 60;
	    	}
    	}
    	
	}
	
	Titanium.Gesture.addEventListener('orientationchange', function(e){
		updateScrollView(e.orientation);
		updateLayout(e.orientation);
	});
	
} else {
	cocktailDetailsWindow.add(CocktailApp.recipeScrollView);
}
