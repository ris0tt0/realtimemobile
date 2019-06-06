import Logger from 'js-logger';

/**
 * This function returns a promise with a value station ABBR.
 */
function getClosestCoordIndex(coord,coords)
{
	let minDif = 99999;
  let closest;

	for (index = 0; index < coords.length; ++index)
	{
		const c = coords[index];
    const dif = PythagorasEquirectangular(
			coord.latitude,
			coord.longitude,
			c.latitude,
			c.longitude
		);
    if (dif < minDif) {
      closest = index;
      minDif = dif;
    }
	}
	
	return closest;
}

function Deg2Rad(deg) {
  return deg * Math.PI / 180;
}

function PythagorasEquirectangular(lat1, lon1, lat2, lon2) {
  lat1 = Deg2Rad(lat1);
  lat2 = Deg2Rad(lat2);
  lon1 = Deg2Rad(lon1);
  lon2 = Deg2Rad(lon2);
  var R = 6371; // km
  var x = (lon2 - lon1) * Math.cos((lat1 + lat2) / 2);
  var y = (lat2 - lat1);
  var d = Math.sqrt(x * x + y * y) * R;
  return d;
}

function getMinutes(startDate,endDate)
{
	return (endDate - startDate) / 1000 / 60;
}

/**
 * returns date in bart format: MM/DD/YYYY
 * @param {Date} date objet used to display the date.
 */
function getBartDateMonth(date)
{
	if( date instanceof Date)
	{
		return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
	}
	return 'now';
}

/**
 * returns time in a bart format: 11:30+pm
 * 
 * @param {Date} date object used to display time.
 */
function getBartDateTime(date)
{
	if( date instanceof Date)
	{
		let hours = date.getHours();
		let ampm = 'AM';

		if( hours > 12)
		{
			hours-=12;
			ampm = 'pm';
		}
		return `${hours}:${date.getMinutes()}+${ampm}`;
	}
	return 'now';
}

/**
 *  returns in time format 'hh:mm'
 * @param {Number} minutes the number of minutes.
 */
function getHoursMinutes(minutes)
{
	if( typeof minutes === 'number')
	{
		const hours = Math.floor(minutes/60);
		const min = minutes % 60;
		if( min < 10){
			return `${hours}:0${min}` ;
		}

		return `${hours}:${min}`;
	}

	/**
	 * TODO how do we handle error conditions?
	 */
	return '0:00';
}


export {getClosestCoordIndex,getHoursMinutes,getMinutes,getBartDateMonth,getBartDateTime};