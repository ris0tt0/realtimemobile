import {getDateTime,getBartApiDateTime,getDateLabel,getDateLabelSimple} from './Utils'

describe('should test getDateLabel',()=>{

	test('should be 11 am',() =>{
		const value = getDateLabel(new Date('December 17, 1995 11:24:00'));
	
		expect(value).toBe('December 17, 11:24 AM');
	});
	test('should be noon',() =>{
		const value = getDateLabel(new Date('December 17, 1995 12:24:00'));
	
		expect(value).toBe('December 17, 12:24 PM');
	});
	test('should be 1 pm',() =>{
		const value = getDateLabel(new Date('December 17, 1995 13:24:00'));
	
		expect(value).toBe('December 17, 1:24 PM');
	});

	test('should be 11 pm',() =>{
		const value = getDateLabel(new Date('December 17, 1995 23:24:00'));
	
		expect(value).toBe('December 17, 11:24 PM');
	});
	test('should be midnight',() =>{
		const value = getDateLabel(new Date('December 17, 1995 0:24:00'));
	
		expect(value).toBe('December 17, 12:24 AM');
	});
	test('should be 1 am',() =>{
		const value = getDateLabel(new Date('December 17, 1995 1:24:00'));
	
		expect(value).toBe('December 17, 1:24 AM');
	});
});

describe('should test getDateLabelSimple',() =>{

	test('should return 11 am',() =>{
		const value = getDateLabelSimple(new Date('December 17, 1995 11:24:00'));
	
		expect(value).toBe('12/17/1995, 11:24 AM');
	});

	test('should return noon',() =>{
		const value = getDateLabelSimple(new Date('December 17, 1995 12:24:00'));
	
		expect(value).toBe('12/17/1995, 12:24 PM');
	});

	test('should return 1 pm',() =>{
		const value = getDateLabelSimple(new Date('December 17, 1995 13:24:00'));
	
		expect(value).toBe('12/17/1995, 1:24 PM');
	});

	test('should return 11 pm',() =>{
		const value = getDateLabelSimple(new Date('December 17, 1995 23:24:00'));
	
		expect(value).toBe('12/17/1995, 11:24 PM');
	});

	test('should return midnight',() =>{
		const value = getDateLabelSimple(new Date('December 17, 1995 0:24:00'));
	
		expect(value).toBe('12/17/1995, 12:24 AM');
	});

	test('should return 1 am',() =>{
		const value = getDateLabelSimple(new Date('December 17, 1995 1:24:00'));
	
		expect(value).toBe('12/17/1995, 1:24 AM');
	});

	test('should be exactly 1 am',() =>{
		const value = getDateLabelSimple(new Date('December 17, 1995 1:00:00'));
	
		expect(value).toBe('12/17/1995, 1:00 AM');
	});

	test('should be exactly 1:07 am',() =>{
		const value = getDateLabelSimple(new Date('December 17, 1995 1:07:00'));
	
		expect(value).toBe('12/17/1995, 1:07 AM');
	});

	
	test('should be exactly 12 am',() =>{
		const value = getDateLabelSimple(new Date('December 17, 1995 00:00:00'));
	
		expect(value).toBe('12/17/1995, 12:00 AM');
	});

	test('should be exactly 12 PM',() =>{
		const value = getDateLabelSimple(new Date('December 17, 1995 12:00:00'));
	
		expect(value).toBe('12/17/1995, 12:00 PM');
	});
});

describe('should test getDateTime',()=>{
	test('should return default "now"',()=>{
		const value = getDateTime();
		expect(value).toBe('now');
	});

	test('should be 1104 am',()=>{
		const value = getDateTime(new Date('December 17, 1995 11:04:00'));
		expect(value).toBe('11:04 AM');
	});

	test('should be noon',()=>{
		const value = getDateTime(new Date('December 17, 1995 12:00:00'));
		expect(value).toBe('12:00 PM');
	});

	test('should be 124 pm',()=>{
		const value = getDateTime(new Date('December 17, 1995 13:24:00'));
		expect(value).toBe('1:24 PM');
	});

	test('should be 1124 pm',()=>{
		const value = getDateTime(new Date('December 17, 1995 23:24:00'));
		expect(value).toBe('11:24 PM');
	});

	test('should be 12:24 AM',()=>{
		const value = getDateTime(new Date('December 17, 1995 0:24:00'));
		expect(value).toBe('12:24 AM');
	});

	test('should be 123 am',()=>{
		const value = getDateTime(new Date('December 17, 1995 1:24:00'));
		expect(value).toBe('1:24 AM');
	});
});

describe('should test getBartApiDateTime',()=>{
	test('should return default "now"',()=>{
		const value = getBartApiDateTime();
		expect(value).toBe('now');
	});

	test('should be 11 am',()=>{
		const value = getBartApiDateTime(new Date('December 17, 1995 11:24:00'));
		expect(value).toBe('11:24+AM');
	});

	test('should be noon',()=>{
		const value = getBartApiDateTime(new Date('December 17, 1995 12:24:00'));
		expect(value).toBe('12:24+PM');
	});

	test('should be 1 pm',()=>{
		const value = getBartApiDateTime(new Date('December 17, 1995 13:24:00'));
		expect(value).toBe('1:24+PM');
	});

	test('should be 11 pm',()=>{
		const value = getBartApiDateTime(new Date('December 17, 1995 23:24:00'));
		expect(value).toBe('11:24+PM');
	});

	test('should be midnight',()=>{
		const value = getBartApiDateTime(new Date('December 17, 1995 0:24:00'));
		expect(value).toBe('12:24+AM');
	});

	test('should be 1 am',()=>{
		const value = getBartApiDateTime(new Date('December 17, 1995 1:24:00'));
		expect(value).toBe('1:24+AM');
	});

	test('should be exactly 12:04',()=>{
		const value = getBartApiDateTime(new Date('December 17, 1995 0:04:00'));
		expect(value).toBe('12:04+AM');
	});

	test('should be exactly 1:00',()=>{
		const value = getBartApiDateTime(new Date('December 17, 1995 1:00:00'));
		expect(value).toBe('1:00+AM');
	});

	test('should be exactly 3:00 PM',()=>{
		const value = getBartApiDateTime(new Date('December 17, 1995 15:00:00'));
		expect(value).toBe('3:00+PM');
	});

	test('should be exactly 4:01 PM',()=>{
		const value = getBartApiDateTime(new Date('December 17, 1995 14:01:00'));
		expect(value).toBe('2:01+PM');
	});
});