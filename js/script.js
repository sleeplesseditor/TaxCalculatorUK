/* 
- £0 to £10k is taxed at 0%
- £10,001 to £35k is taxed at 20%
- £35,001 to £100,000 is taxed at 40%
- £100k plus is taxed at 50%
*/

$(document).ready(function(){
    
	// RADIO BUTTON SELECTION
	$(".custom-checkbox").click(function() {
		// GENERAL RADIO SELECTION CODE
		var activeInput = $(this).children("input");
		if(activeInput.is(':checked')) {
			// DESELECT IF ALREADY CHECKED
			$(activeInput).prop("checked", false);
		} else {
			// SELECT IF NOT CHECKED
			$(activeInput).prop("checked", true);
		}
		
		// REMOVE SELECTION FROM OTHER OPTIONS
		var nonActiveInput = $(this).siblings().children("input");
		$(nonActiveInput).prop("checked", false);
	}); 
    // END RADIO BUTTON SELECTION
	
	$("#submitTax").click(function(){
		
		// User Salary
		var annualSalary = $("#annualSalary").val();
		
		// INCOME TAX
		// user tax code
		var tax1060L = 10600;
		// user taxable salary
		var taxableSalary = annualSalary - tax1060L;
		// make tax percent a decimal for calculation
		var taxTakenPercent = 20 / 100;
			// additional tax brackets
			if (taxableSalary >= 31786 && annualSalary <= 100000) {
				taxTakenPercent = 40 / 100;
			} else if (taxableSalary > 100000) {
				taxTakenPercent = 50 / 100;
			}
        
		// calculate tax taken yearly
		var taxTakenAmount = taxTakenPercent * taxableSalary;
		
		// NATIONAL INSURANCE – REQUIRES UPDATE
		// national insurance threshold
		var natInsureThresh = 8060;
		// national insurance taxable
		var natInsureTaxable = annualSalary - natInsureThresh;
		// make national insurance percent a decimal for calculation
		var natInsurePercent = 12 / 100;
		// calculate national insurance taken yearly
		var natInsurance = natInsurePercent * natInsureTaxable;
		// format national insurance
		natInsurance = natInsurance.toFixed(2);
		
		// OVER 65s NATIONAL INSURANCE CORRECTION – NEEDS TESTING
		if ($("#over65Yes input").is(":checked")) {
			natInsurance = 0;
		}
		
		// annual take home pay 
		var takeHomeYear = annualSalary - taxTakenAmount - natInsurance;
		
		// Annual take home pay formatting
		takeHomeYear = takeHomeYear.toFixed(2);
		// Monthly take home pay formatting
		var takeHomeMonthly = takeHomeYear / 12;
		takeHomeMonthly = takeHomeMonthly.toFixed(2);
		
		// RESULTS
		// Show results
		$(".results").show();
		// Update result figures
		$("#grossPay").html("<strong>Annual Gross Salary:</strong> £" + annualSalary);
		$("#taxFree").html("<strong>Annual Tax Free Allowance:</strong> £" + tax1060L);
		$("#totalTaxable").html("<strong>Total Taxable Amount:</strong> £" + taxableSalary);
		$("#taxPaid").html("<strong>Tax Paid Per Year:</strong> £" + taxTakenAmount);
		$("#nationalInsurance").html("<strong>Class 1 National Insurance Paid:</strong> £" + natInsurance);
		$("#takeHomeAnnual").html("<strong>Annual Take Home Pay:</strong> £" + takeHomeYear);
		$("#takeHomeMonthly").html("<strong>Monthly Take Home Pay:</strong> £" + takeHomeMonthly);
	});
});