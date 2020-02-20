const models = require('../../model/menuUser/Menu');
const systemMessage = require('../../../config/systemMessage');
const querySequelize = require('../../model/models.js');
const commonUtil = require('../common/commonUtil');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


exports.index = (req,res) => {
 
  const query = 
  "select " +
  "	menu_id as menuId, " +
  "	menu_name as menuName, " +
  "	url as url, " +
  "	sub_url as subUrl, " +
  "	parent, " +
  "	main_show_yn as mainShowYn, " +
  "	main_description as mainDescription, " +
  " case when length(parent) > 0 and length(sub_url) > 0 " +
  "      then 'Y' " +
  "      else 'N' end as subMenuYn, " +
  "	use_yn as useYn, " +
  "	show_yn as showYn, " +
  "	need_login_yn as needLoginYn, " +
  "	ord " +
  "	from sv_menus " +
  // " where use_yn = 'Y' " +
  "order by cast(substr(menu_id,2,5) as int); ";

  return querySequelize.query(query, {
    type: querySequelize.QueryTypes.RAW
  }).spread(function(results){
    ////console.log(results);
    return res.status(200).json(results);
  }).catch(function (err) {
      ////console.log(err);
      return res.status(500).json(err);
  });

};

exports.show = (req,res) => {
  const id = req.params.id || '';

  if(!id.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "id", req:id});
  }


models.MenuUser.findOne({
    where: {
      id: id,
    }
  }).then(menu => {
      if (!menu){
        return res.status(404).json({error:systemMessage.search.targetMissing});
      }
      return res.json(menu);
    }).catch(function (err) {
        //console.log(err);
        return res.status(500).json(err);
    });
};


exports.menuid = (req,res) => {
 
  const query = 
  "select " +
  "	menu_id as value, " +
  "	menu_id as text " +
  "from sv_menus " +
  "order by cast(substr(menu_id,2,5) as int); ";

  return querySequelize.query(query, {
    type: querySequelize.QueryTypes.RAW
  }).spread(function(results){
    ////console.log(results);
    return res.status(200).json(results);
  }).catch(function (err) {
      ////console.log(err);
      return res.status(500).json(err);
  });

};




exports.update = (req,res) => {
  const userMenuId = req.params.userMenuId || '';
  const menuName = req.body.menuInfo.menuName || '';
  const url = req.body.menuInfo.url || '';
  const subMenuYn = req.body.menuInfo.subMenuYn || '';
  const subUrl = req.body.menuInfo.subUrl || '';
  const parent = req.body.menuInfo.parent || '';
  const useYn = req.body.menuInfo.useYn || '';
  const mainShowYn = req.body.menuInfo.mainShowYn || '';
  const mainDescription = req.body.menuInfo.mainDescription || '';
  const ord = req.body.menuInfo.ord || '';
  const showYn = req.body.menuInfo.showYn || '';
  const needLoginYn = req.body.menuInfo.needLoginYn || '';
  const userId = "ADMIN"; //나중에 토큰에서 빼서 사용

  if(!userMenuId.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "userMenuId" , req:userMenuId});
  }
  if(!menuName.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "menuName" , req:menuName});
  }
  if(!url.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "url" , req:url});
  }
  if(!useYn.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "useYn" , req:useYn});
  }
  if(!mainShowYn.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "mainShowYn" , req:mainShowYn});
  }
  if(!subMenuYn.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "subMenuYn" , req:subMenuYn});
  }
  if(!showYn.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "showYn" , req:showYn});
  }
  if(!needLoginYn.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "needLoginYn" , req:needLoginYn});
  }

  const newDate = new Date()
  const time = newDate.toFormat('YYYY-MM-DD HH24:MI:SS');

  models.MenuUser.update({
      menuName: menuName,
      url: url,
      subUrl: subMenuYn==="Y" ? subUrl : "",
      parent: subMenuYn==="Y" ? parent : "",
      ord: subMenuYn==="Y" ? ord : 1,
      useYn: useYn,
      showYn : showYn,
      needLoginYn : needLoginYn,      
      depth: subMenuYn==="Y" ? 2 : 1,
      updateDatetime: time,
      updateUserId: userId,
      mainShowYn: mainShowYn,
      mainDescription: mainShowYn=="Y" ? mainDescription : ""

  } , {
        where: {
          menuId: userMenuId
        }
  }).then(()=>{
      return models.MenuUser.findOne({
        where: {
          menuId: userMenuId
        }
     });
   }).then((menu) => {
     if(menu == null) {
       res.status(404).json(systemMessage.search.targetMissing)
     }else{
       res.status(200).json(menu)
     }
    })
   .catch(function (err) {
       res.status(500).json(err)
   });
};


exports.create = (req,res) => {

  const menuId = req.body.menuInfo.menuId || '';
  const menuName = req.body.menuInfo.menuName || '';
  const url = req.body.menuInfo.url || '';
  const subUrl = req.body.menuInfo.subUrl || '';
  const parent = req.body.menuInfo.parent || '';
  const useYn = req.body.menuInfo.useYn || '';
  const mainShowYn = req.body.menuInfo.mainShowYn || '';
  const subMenuYn = req.body.menuInfo.subMenuYn || '';
  const ord = req.body.menuInfo.ord || '';
  const mainDescription = req.body.menuInfo.mainDescription || '';
  const showYn = req.body.menuInfo.showYn || '';
  const needLoginYn = req.body.menuInfo.needLoginYn || '';

  if(!menuId.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "menuId" , req:menuId});
  }
  if(!menuName.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "menuName" , req:menuName});
  }
  if(!url.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "url" , req:url});
  }
  if(!useYn.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "useYn" , req:useYn});
  }
  if(!mainShowYn.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "mainShowYn" , req:mainShowYn});
  }
  if(!subMenuYn.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "subMenuYn" , req:subMenuYn});
  }
  if(!showYn.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "showYn" , req:showYn});
  }
  if(!needLoginYn.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "needLoginYn" , req:needLoginYn});
  }

  const newDate = new Date()
  const time = newDate.toFormat('YYYY-MM-DD HH24:MI:SS');

  models.MenuUser.create({
    menuId: menuId,
    menuName: menuName,
    url: url,
    subUrl: subMenuYn==="Y" ? subUrl : "",
    parent: subMenuYn==="Y" ? parent : "",
    ord: subMenuYn==="Y" ? ord : 1,
    useYn : useYn,
    showYn : showYn,
    needLoginYn : needLoginYn,
    depth: subMenuYn==="Y" ? 2 : 1,
    mainShowYn: mainShowYn,
    mainDescription: mainShowYn==="Y" ? mainDescription : "",
    createUserId: "ADMIN",
    createDatetime: time
  }).then((faq) => res.status(201).json(faq))
  .catch(function (err) {
      res.status(500).json(err)
  });


  
};