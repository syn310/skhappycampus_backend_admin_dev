const models = require('../../model/companyRecruit/CompanyRecruit');
const systemMessage = require('../../../config/systemMessage');
const querySequelize = require('../../model/models.js');
require('date-utils');

exports.index = (req,res) => {

  const serialNumber = req.params.serialNumber || '';
  const applyUserId = req.params.applyUserId || '';

  const query = "select" +
              "    sc.company_id as companyId," +
              "    sc.company_name as companyName," +
              "    sc.company_guide as companyGuide," +
              "    sc.company_url as companyUrl," +
              "    sc.company_address as companyAddress," +
              "    sc.contact_person as contactPerson," +
              "    sc.contact_phone as contactPhone," +
              "    sc.company_type as companyType," +
              "    sc.ideal_type as idealType," +
              "    sc.employee_number as employeeNumber," +
              "    sc.employee_number_date as employeeNumberDate," +
              "    sc.sales," +
              "    sc.sales_date as salesDate," +
              "    sc.average_salary as averageSalary," +
              "    sc.average_salary_date as averageSalaryDate," +
              "    sc.company_logo_url as companyLogoUrl," +
              "    sr.recruit_type as recruitType," +
              "    sr.recruit_seq as recruitSeq," +
              "    sr.recruit_job as recruitJob," +
              "    sr.recruit_number as recruitNumber," +
              "    sr.employ_start_date as employStartDate," +
              "    sr.employ_end_date as employEndDate," +
              "    sr.remark as remark," +
              "    sr.job_detail as jobDetail," +
              "    sr.preference_point as preferencePoint," +
              "    sr.prefer_degree as preferDegree," +
              "    sr.intern_salary as internSalary," +
              "    sr.fulltime_salary as fulltimeSalary," +
              "    sr.workplace as workplace" +
              "    from sv_companies sc, sv_company_recruits sr" +
              "    where sc.company_id = sr.company_id" +
              "    and sr.serial_number =:serialNumber order by company_name asc;";

    return querySequelize.query(query, {
      type: querySequelize.QueryTypes.RAW,
      replacements: { serialNumber:serialNumber}
    }).spread(function(results){
      return res.status(200).json(results);
    }).catch(function (err) {
      console.log(err);
      return res.status(500).json(err);
    });
};
