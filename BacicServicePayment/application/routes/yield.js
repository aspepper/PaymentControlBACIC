import userRepo from '../repository/user';
import forwardAgentRepo from '../repository/company';
import userCompany from '../repository/userCompany';
import dashboard from '../repository/dashboard';
import paymentRepo from '../repository/payments';
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
                totalPromisse.then(function(total){ 
                    req.total = total; 
                    const listRecepts = paymentRepo.getRecepts(list[0].Id, 7);
                    console.log(listRecepts);
                    listRecepts.then(function(list){
                        req.listRecepts = list; 
                        next();
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
    console.log("passei pelo Yield");
    res.render('yield', 
            { 
                title: 'Meus Recebimentos', 
                option: 3,
                isAdminGeneral: global.isAdminGeneral, 
                isAdmin: global.isAdmin, 
                list: global.agentList, 
                name: global.companyName, 
                total: realPtBRLocale.format(req.total),
                listRecepts: req.listRecepts
            });
});

router.post('/', (req, res) => {
    
});

module.exports=router
