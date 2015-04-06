dpd.user.get({
	girl: !this.girl,
	interests: {$in: this.interests}
}, function(partners, err) {
	if (err) {
		error('user', err);
	} else {
		for (var p in partners) {
			var common = [];
			for (var i in this.interests) {
				var mine = this.interests[i];
				if (partners[p].interests.indexOf(mine) !== -1) {
					common.push(mine);
				}
			}
			var idx = Math.floor(Math.random() * common.length);
			var now = Date.now();
			var nextWeek = new Date(now.getFullYear(), now.getMonth(), now.getDay() + 7);
			dpd.dateup.post({
				users: [this.id, partners[p].id],
				date: nextWeek,
				interest: common[idx]
			}, function(dateup, err) {
				if (err) {
					error('user', err);
				}
			});
		}
	}
});