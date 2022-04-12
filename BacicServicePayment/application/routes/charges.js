import userRepo from '../repository/user';
import forwardAgentRepo from '../repository/company';
import userCompany from '../repository/userCompany';
import dashboard from '../repository/dashboard';
const express = require("express")

const router=express.Router()

global.userId = 0;
global.isAdminGeneral = false;
global.isAdmin = false;
global.agentList = [];
global.companyName = "";

router.use(function getGlobalData(req, res, next){
    global.userId = parseInt(req.session.passport.user.id);
    const company = userCompany.getByUserId(global.userId);
    company.then(function(userCompany){
        const roles = userRepo.getRoles(global.userId);
        roles.then(function(list) {
            global.isAdminGeneral = list.filter(r => r.RoleId == 1).length > 0 ? true : false;
            global.isAdmin = list.filter(r => r.RoleId == 2).length > 0 ? true : false;
            var forwardList = forwardAgentRepo.getAllByType(4);
            global.companyName = userCompany.name;
            forwardList.then(function(list) {
                global.agentList = list;
                const totalPromisse = dashboard.getTotalReceived(list[0].Id, 7);
                console.log(totalPromisse);
                totalPromisse.then(function(total){ 
                    req.total = total; 
                    const averageTicket = dashboard.getAverageTicket(list[0].Id, 7);
                    console.log(averageTicket);
                    averageTicket.then(function(averageTicketTotal){
                        req.averageTicketTotal = averageTicketTotal; 
                        const weekConversion = dashboard.getWeekConversion(list[0].Id, 7);
                        console.log(weekConversion);
                        weekConversion.then(function(weekConversionTotal){
                            req.weekConversionTotal = weekConversionTotal; 
                            next();
                        });
                    });
                });
            });
        });
    });
});

router.get('/', (req, res) => {

    let realPtBRLocale = Intl.NumberFormat('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });

    res.render('charges', 
            { 
                title: 'Minhas Cobranças', 
                option: 2,
                isAdminGeneral: global.isAdminGeneral, 
                isAdmin: global.isAdmin, 
                list: global.agentList, 
                name: global.companyName, 
                total: realPtBRLocale.format(req.total),
                averageTicketTotal: realPtBRLocale.format(req.averageTicketTotal),
                weekConversionTotal: realPtBRLocale.format(req.weekConversionTotal),
            });
});

router.post('/', (req, res) => {
    
});

module.exports=router
