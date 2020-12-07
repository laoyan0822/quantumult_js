/*
[task_local] 
15 2 1,10,20 * * https://raw.githubusercontent.com/reapple/JavaScript/master/jdSharedCode/jd_sharedCode.js, tag=提交互助码, enabled=true
[rewrite_local]
# 互助码获取链接
^http:\/\/api\.turinglabs\.net\/api\/v1\/jd url script-request-header https://raw.githubusercontent.com/reapple/JavaScript/master/jdSharedCode/jd_shareCodeURL.js
 
 */


const reApple = init()
const cookieName_factory = '东东工厂'
const cookieKey_factory = 'ddFactory_url'

const cookieName_jx = '京喜工厂'
const cookieKey_jx = 'jxFactory_url'

const cookieName_bean = '种豆得豆'
const cookieKey_bean = 'bean_url'

const cookieName_pet = '京东萌宠'
const cookieKey_pet = 'pet_url'

const cookieName_farm = '京东农场'
const cookieKey_farm = 'farm_url'
const messageDic = {}

reApple.log("🔔开始提交京东互助码")
commitShareCode(cookieName_factory, cookieKey_factory)
commitShareCode(cookieName_jx, cookieKey_jx)
commitShareCode(cookieName_bean, cookieKey_bean)
commitShareCode(cookieName_pet, cookieKey_pet)
commitShareCode(cookieName_farm, cookieKey_farm)


var count = 0
function commitShareCode(cookieName, cookieKey) {
    var urlStr = reApple.getdata(cookieKey)
    if (urlStr && urlStr.length) {
        var myRequest = { url: urlStr, method: "GET" }
        $task.fetch(myRequest).then(response => {
            var reDic = JSON.parse(response.body)
            if (response.body.message)  {
                reDic = response.body.message
            }
            
            if (reDic.message == "This ddfactory share code existed") {
                messageDic[cookieName] = (cookieName + "互助码已提交过🐶" + '\n')
                reApple.log(cookieName + '互助码已提交过🐶' + '\n')
            } else if (reDic.message == "code error") {
                messageDic[cookieName] = (cookieName + '互助码错误❎' + '\n')
                reApple.log(cookieName + '互助码错误❎' + '\n')
            } else if (reDic.message == "success") {
                messageDic[cookieName] = (cookieName + '互助码提交成功✅' + '\n')
                reApple.log(cookieName + '互助码提交成功✅' + '\n')
            }
            count++
            reApple.log(count)
            showMessge()
        }, reason => {
            count++
            reApple.log(count)
            messageDic[cookieName] = (cookieName + ":" + reason.error + '\n')
            reApple.log(cookieName + ":" + reason.error + '\n')
            showMessge()
        });
    } else {
        messageDic[cookieName] = '未提供' + cookieName + '的链接⚠️' + '\n'
        count++
        showMessge()
    }
}

function showMessge() {
    if (count == 5) {
        reApple.msg("京东互助码提交", "", messageDic[cookieName_factory] + messageDic[cookieName_jx] + messageDic[cookieName_bean] + messageDic[cookieName_pet] + messageDic[cookieName_farm])
    }
}

function init() {
    isSurge = () => {
        return undefined === this.$httpClient ? false : true
    }
    isQuanX = () => {
        return undefined === this.$task ? false : true
    }
    getdata = (key) => {
        if (isSurge()) return $persistentStore.read(key)
        if (isQuanX()) return $prefs.valueForKey(key)
    }
    setdata = (key, val) => {
        if (isSurge()) return $persistentStore.write(key, val)
        if (isQuanX()) return $prefs.setValueForKey(key, val)
    }
    msg = (title, subtitle, body) => {
        if (isSurge()) $notification.post(title, subtitle, body)
        if (isQuanX()) $notify(title, subtitle, body)
    }
    log = (message) => console.log(message)
    get = (url, cb) => {
        if (isSurge()) {
            $httpClient.get(url, cb)
        }
        if (isQuanX()) {
            url.method = 'GET'
            $task.fetch(url).then((resp) => cb(null, {}, resp.body))
        }
    }
    post = (url, cb) => {
        if (isSurge()) {
            $httpClient.post(url, cb)
        }
        if (isQuanX()) {
            url.method = 'POST'
            $task.fetch(url).then((resp) => cb(null, {}, resp.body))
        }
    }
    valFor = (dic) => {
        for (var item in dic) {
            return dic[item]
        }
    }
    keyFor = (dic) => {
        for (var item in dic) {
            return item
        }
    }
    done = (value = {}) => {
        $done(value)
    }
    return { isSurge, isQuanX, msg, log, getdata, setdata, get, post, done, valFor, keyFor }
}
