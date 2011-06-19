var tabGroup = Titanium.UI.createTabGroup();
var cocktailWindow = Titanium.UI.createWindow({  
    titleid:'cocktails',
    url:"views/cocktails.js"
});

if(Titanium.Platform.osname == 'ipad'){
	cocktailWindow.navBarHidden = true;
}

var cocktailTab = Titanium.UI.createTab({  
    icon:'images/tab_cocktails_small_white.png',
    title:L('cocktails','Cocktails'),
    window:cocktailWindow
});
cocktailWindow.tab = cocktailTab;
tabGroup.addTab(cocktailTab);  
tabGroup.open();
