Ext.namespace('Zarafa.plugins.<%= name %>');

/**
 * @class Zarafa.plugins.<%= name %>.<%= classname %>
 * @extends Zarafa.core.Plugin
 */
Zarafa.plugins.<%= name %>.<%= classname %> = Ext.extend(Zarafa.core.Plugin, {
	/**
	 * @protected
	 */
	initPlugin : function()
	{
		Zarafa.plugins.<%= name %>.<%= classname %>.superclass.initPlugin.apply(this, arguments);
	},
});

Zarafa.onReady(function() {
	container.registerPlugin(new Zarafa.core.PluginMetaData({
		name : '<%= name %>',
		displayName : _('<%= name %>'),
		pluginConstructor : Zarafa.plugins.<%= name %>.<%= classname %>
	}));
});
