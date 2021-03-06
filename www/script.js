var module = ons.bootstrap('incident-app', ['onsen']);
module.controller('IncidentSearchController', function($scope,$http,$timeout) {

	$scope.wsUrl='https://vml707.windstream.com/itsm/index.php?callback=JSON_CALLBACK';
	$scope.wsOnCallUrl='http://192.168.26.19:8080/WinHelpdeskSupportLocator/rest/verify';
	ons.ready(function() {
	});
	
	$scope.date = new Date();
	
	$scope.searchInc = function(form){
		modal.show();
		var vIncidentid = form.incidentid.$viewValue;
		
		if(vIncidentid.length!=15){
		 var vIncLength=vIncidentid.length;
		 var vZero='0';
		 var vINC='INC000000000000';
		 var vCount=vINC.length-vIncLength;
		 var vOffset=vINC.substring(0,vCount);
		 vIncidentid=vOffset+vIncidentid;
		}
		
		if(vIncidentid.length == 15 && vIncidentid.indexOf("INC") > -1 ){
			var vSupportTeam=null;
			var url=$scope.wsUrl;
		/*	$http.jsonp(url,
			{ params :{ 'inc_id' : vIncidentid } }
			)
			.success(function(data, status, headers, config) {
				$scope.showIncidentID = vIncidentid;
				$scope.showSummary = data.Summary;
				$scope.showAssignedGroup = data.Assigned_Group;
				$scope.showStatus = data.Status;
				
				vSupportTeam = data.Assigned_Group;	

				if( 'null' != vSupportTeam ){
					//$scope.$apply();
					var vOnCallUrl = $scope.wsOnCallUrl;		
					
					$http.jsonp(vOnCallUrl+'/'+vSupportTeam+'?callback=JSON_CALLBACK')
					.success(function(data, status, headers, config) {
					
					$scope.telnum = 'tel:'+data.strOnCallContact;
					app.navi.pushPage('incidentPage.html');
					clearSearch($scope);
					ons.notification.alert({
							message: "Team Name: "+ data.strOnCallTeam,
							title: 'WIN-Helpdesk'
							});
					})
					
					.error(function(data, status, headers, config) {
					clearSearch($scope);
					ons.notification.alert({
							message: "Invalid Team Name"+data,
							title: 'WIN-Helpdesk'
							});
					})
				}			
			
			
			})			
			.error(function(data, status, headers, config) {
			clearSearch($scope);
			ons.notification.alert({
					message: "Invalid IncidentID",
					title: 'WIN-Helpdesk'
					});
			})*/
			$scope.showIncidentID = vIncidentid;
				$scope.showSummary = 'Summary';
				$scope.showAssignedGroup = 'Operations Sys Supp: EPAY';
				$scope.showStatus = 'Closed';
				
				vSupportTeam = 'Operations Sys Supp: EPAY';	

				if( 'null' != vSupportTeam ){
					//$scope.$apply();
					var vOnCallUrl = $scope.wsOnCallUrl;		
					alert( vOnCallUrl+'/'+vSupportTeam+'?callback=JSON_CALLBACK');
					
					$http.jsonp(vOnCallUrl+'/'+vSupportTeam+'?callback=JSON_CALLBACK')
					.success(function(data, status, headers, config) {
					
					$scope.telnum = 'tel:'+data.strOnCallContact;
					app.navi.pushPage('incidentPage.html');
					clearSearch($scope);
					ons.notification.alert({
							message: "Team Name: "+ data.strOnCallTeam,
							title: 'WIN-Helpdesk'
							});
					})
					
					.error(function(data, status, headers, config) {
					clearSearch($scope);
					ons.notification.alert({
							message: "Invalid Team Name",
							title: 'WIN-Helpdesk'
							});
					})
				}
		}
		else{
		clearSearch($scope);
			ons.notification.alert({
					message: "Invalid IncidentID",
					title: 'WIN-Helpdesk'
					});
		}
	}

	$scope.backClick = function(){
		ons.notification.confirm({
			message: 'Are you want to search again?',
			title: 'WIN-Helpdesk',
			buttonLabels: ['Yes', 'No'],
			animation: 'default', // or 'none'
			primaryButtonIndex: 1,
			cancelable: true,
			callback: function(index) {
				if(index == 0) {
					app.navi.pushPage("index.html", { animation: "lift"});
					//app.navi.popPage(incidentPage.html);
				}
			}
		});
	}
	
	$scope.msgSend = function(){
	
		var messageInfo = {
				phoneNumber: $scope.telnum,
				textMessage: $scope.showSummary
			};
			//alert(messageInfo);
			sms.sendMessage(messageInfo, function(message) {
				alert("success: " + message);
			}, function(error) {
				alert("code: " + error.code + ", message: " + error.message);
			});
	
	}
	
});

function clearSearch($scope) {
	modal.hide();
	$scope.search = {
		incidentid: ''
	};
}

function callAtTimeout() {
    console.log("Timeout occurred");
}