// Copyright (c) 2022, Dexciss and contributors
// For license information, please see license.txt
/* eslint-disable */

frappe.query_reports["Attendance vs Timesheet"] = {
	"filters": [
		{
			"fieldname": "month",
			"label": __("Month"),
			"fieldtype": "Select",
			"reqd": 1 ,
			"options": [
				{ "value": 01, "label": __("Jan") },
				{ "value": 02, "label": __("Feb") },
				{ "value": 03, "label": __("Mar") },
				{ "value": 04, "label": __("Apr") },
				{ "value": 05, "label": __("May") },
				{ "value": 06, "label": __("June") },
				{ "value": 07, "label": __("July") },
				{ "value": 08, "label": __("Aug") },
				{ "value": 09, "label": __("Sep") },
				{ "value": 10, "label": __("Oct") },
				{ "value": 11, "label": __("Nov") },
				{ "value": 12, "label": __("Dec") },
			],
			"default": frappe.datetime.str_to_obj(frappe.datetime.get_today()).getMonth() + 1
		},
		{
			"fieldname":"year",
			"label": __("Year"),
			"fieldtype": "Select",
			"reqd": 1
		},
		
		{
			"fieldname":"employee",
			"label": __("Employee"),
			"fieldtype": "Link",
			"options": "Employee",
			
		},
		{
			"fieldname":"company",
			"label": __("Company"),
			"fieldtype": "Link",
			"options": "Company",
			"default": frappe.defaults.get_user_default("Company"),
			"reqd": 1
		}
		
		
	],

	"onload": function() {
		return  frappe.call({
			method: "hrms.hr.report.monthly_attendance_sheet.monthly_attendance_sheet.get_attendance_years",
			callback: function(r) {
				var year_filter = frappe.query_report.get_filter('year');
				year_filter.df.options = r.message;
				year_filter.df.default = r.message.split("\n")[0];
				year_filter.refresh();
				year_filter.set_input(year_filter.df.default);
				console.log("111111111111111")
			}
		});
	}
}


