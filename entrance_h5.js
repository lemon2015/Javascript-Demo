/**
 * Created by mark on 18-1-10.
 */
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
    /**
     * Created by gouding on 16/4/18.
     */

    var Comm = {
        //��һ�����ʵ�url����
        preURLLink: document.referrer,
        /**
         decode
         **/
        decodeUrl: function(str) {
            if (typeof str === 'string') {
                return decodeURIComponent(str);
            } else {
                return undefined;
            }

        },
        /**
         * ��url����query�ַ���ת���ɶ���
         */
        getQueryParam: function(href) {
            href = href || document.location.href;
            var queryString = href.substring(href.lastIndexOf("?") + 1);
            if (queryString.lastIndexOf("#") >= 0) {
                queryString = queryString.substring(0, queryString.lastIndexOf("#"));
            }
            var list = queryString.split("&");
            var param = {};
            for (var i = 0; i < list.length; i++) {
                var item = list[i];
                try {
                    var key = item.substring(0, item.indexOf("="));
                    var value = item.substring(item.indexOf("=") + 1);
                    if (key.length == 0) {
                        continue;
                    }

                    if (/^-?(\d+)(\.\d+)?$/.test(value)) {
                        if (("" + value).length > 10) {
                            param[key] = "" + value;
                        } else {
                            param[key] = Number(value);
                        }
                    } else if (value === 'true') {
                        param[key] = true;
                    } else if (value === 'false') {
                        param[key] = false;
                    } else {
                        param[key] = Comm.decodeUrl(value);
                    }
                } catch (e) {
                    continue;
                }
            }
            return param;
        },
        //�����ı���urlɸѡ����
        getUrlRegex: function(strMsg) {
            strMsg = strMsg.replace(/&amp;/g, '&');
            strMsg = strMsg.replace(/&amp/g, '&');
            var res = '';
            var wordArrs = strMsg.split(/\s+/);
            for (var i = 0; i < wordArrs.length; i++) {
                var tmp = (function(str) {
                    var regExp = /((https?|ftp|news):\/\/)?([a-zA-Z]([a-z0-9A-Z\-]*[\.])+([a-zA-Z]{2}|(aero|arpa|biz|com|coop|edu|gov|info|int|jobs|mil|museum|name|nato|net|org|pro|travel)(:[0-9]{1,4})?)|(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])(:[0-9]{1,4})?)(\/[a-zA-Z0-9_%=#\-\.~]+)*(\/([a-zA-Z0-9%=#_\-\.]*)(\?[a-zA-Z0-9+_/\-\.#%=&]*)?)?(#[a-zA-Z][a-zA-Z0-9_]*)?$/;
                    //��δ��ͷ ��Ҫ���
                    if (str.match(regExp)) {
                        var regExp1 = /(https?):\/\/([a-zA-Z]([a-z0-9A-Z\-]*[\.])+([a-zA-Z]{2}|(aero|arpa|biz|com|coop|edu|gov|info|int|jobs|mil|museum|name|nato|net|org|pro|travel)(:[0-9]{1,4})?)|(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])(:[0-9]{1,4})?)(\/[a-zA-Z0-9_%=#\-\.~]+)*(\/([a-zA-Z0-9%=#_\-\.]*)(\?[a-zA-Z0-9+_/\-\.#%=&]*)?)?(#[a-zA-Z][a-zA-Z0-9_]*)?$/;
                        if (!str.match(regExp1)) {
                            str = '<a href="http://' + str + '" target="_blank">' + str + '</a>';
                        } else
                            str = '<a href="' + str + '" target="_blank">' + str + '</a>';
                    }
                    return str + ' ';

                })(wordArrs[i]);
                res += tmp;
            }
            return res;
        },
        getNewUrlRegex: function(strMsg) {
            strMsg = strMsg.replace(/&amp;/g, '&');
            strMsg = strMsg.replace(/&amp/g, '&');
            var res = '';
            var wordArrs = strMsg.split(/\s+/);
            for (var i = 0; i < wordArrs.length; i++) {
                var tmp = (function(str) {
                    var regExp = /^(((https?):\/\/)|(www))[a-zA-Z0-9_\-]+((\.(com|cn|org))|(:[0-9]{2,4}))?(:[0-9]{2,4})?([:\/\?\.&\-=a-zA-Z0-9;#%_]+)?$/g;
                    //�Ƿ���ƥ���url �˴�ȷ��ƥ��
                    if (str.match(regExp)) {
                        //�ж��Ƿ���� http ��ǩ
                        if (!str.match(regExp)) {
                            str = '<a href="http://' + str + '" target="_blank">' + str + '</a>';
                        } else {
                            str = '<a href="' + str + '" target="_blank">' + str + '</a>';
                        }
                    }
                    else {
                        var regExp1 = /((www.)|((https?):\/\/))[a-zA-Z0-9_\-]+((\.(com|cn|org))|(:[0-9]{2,4}))?(:[0-9]{2,4})?([:\/\?\.&\-=a-zA-Z0-9;#%_]+)?/g;
                        var regArr = str.match(regExp1);
                        var ret = regArr;
                        if (regArr && regArr.length > 0) {
                            //ȡ����һ���ƥ��
                            var indexNo = str.indexOf(regArr[0]);
                            //�Ƿ��� http��ͷ
                            var isHttpNo = regArr[0].indexOf('http');
                            if (isHttpNo >= 0) {
                                ret = '<a href="' + regArr[0] + '" target="_blank">' + regArr[0] + '</a>';
                            } else {
                                ret = '<a href="http://' + regArr[0] + '" target="_blank">' + regArr[0] + '</a>';
                            }
                            //ƴurl
                            // var _str;
                            if (indexNo === 0) {
                                str = ret + str.substring(regArr[0].length, str.length);
                            } else {
                                var _str1 = str.substring(0, indexNo);
                                var _str2 = _str1 + regArr[0];
                                var _str3 = str.substring(_str2.length, str.length);
                                str = _str1 + ret + _str3;
                            }
                        }
                    }
                    return str + ' ';

                })(wordArrs[i]);
                res += tmp;
            }
            return res;
        },
        //str ϵͳ��ʾ��  args ��װ����  isFormat �Ƿ���Ҫ��װ
        format: function(str, args, isFormat) {
            if (isFormat) {
                var result;
                if (typeof(args) == "object") {
                    for (var key in args) {
                        var reg = '{' + key + '}';
                        result = str.replace(reg, args[key]);
                    }
                } else {
                    for (var i = 0; i < args.length; i++) {
                        if (args[i] == undefined) {
                            return "";
                        } else {
                            var reg = '{' + i + '}';
                            result = str.replace(reg, args[i]);
                        }
                    }
                }
                return result;
            } else {
                return str;
            }
        },
        //�ж�������Ƿ�֧��ĳ���¼�
        detectEventSupport: function(eventName) {
            var tempElement = document.createElement('div'),
                isSupported;
            eventName = 'on' + eventName;
            isSupported = (eventName in tempElement); // ʹ�õ�һ�ַ�ʽ
            // �����һ�ַ�ʽ�в�ͨ���Ǿ����������ǲ�����֪�¼�����
            if (!isSupported) {
                tempElement.setAttribute(eventName, 'xxx');
                isSupported = typeof tempElement[eventName] === 'function';
            }
            // �������̬������Ԫ�أ��Ա��ڴ����
            tempElement = null;
            // ���ؼ����
            return isSupported;
        }
    };
    module.exports = Comm;

},{}],2:[function(require,module,exports){
    module.exports={
        "errorlogPath": "log.sobot.com/errorlog/"
    }

},{}],3:[function(require,module,exports){
    var initConfig = function(pageType) {
        //�����ⲿjs
        var Comm = require('./comm.js');
        var Promise = require('./util/promise.js');
        var initText = require("./initText.js");
        var outerPromise = new Promise();
        //api�ӿ�
        var api = {
            config_url: '/chat/user/config.action',
            init_url: '/chat/user/init.action',
            active_url: '/chat/user/productRecommend.action'
        };
        var isMobile = window.navigator.userAgent.indexOf("Mobile") >= 0;
        //�洢���ݶ���
        var That = {};
        That.cacheInfo = {};

        That.cacheInfo.flags = {
            status: 'enabled',
            isLoaded: false,
            pageNow: 1,
            pageSize: 20,
            moreHistroy: false,
            isConnected: false, // �Ƿ��ѽ����Ự����
            isEnableManual: false, // �ͷ��Ƿ����
            isEnableOnInput: true, // �Ƿ������ʾ�ͷ�����״̬
            isGetCustomConfig: false, // ���һ����ʶ�����ж��Ƿ��Ƿ�����getCustomConfig
            isEnableBigImg: true, // Ĭ�Ͽ��ԷŴ�ͼƬ
            isPeopleModel: false, // �˹�ģʽ�Ƿ����
            isWaitModel: false, // �Ƿ��ڵȴ�ģʽ
            isTimeLine: false, // �Ƿ���ʾʱ���ߣ�Ĭ�ϲ���ʾ
            isUserTalked: false, // �Ƿ����Ĺ�
            isSurveyed: false, // �Ƿ�������
            isKeepSessions: false, // �Ƿ񱣳ֻỰ
            isOutOneMinute: false // �Ƿ��ѳ�ʱһ����
        };
        //�Ƿ���ϵͳ��ʾ��
        var isLanOpen = true,
            lanType = 'CN';
        var params = Comm.getQueryParam();
        //��ʼ��������Ϣ
        var config = {
            //FIXME ��ʼ��url����
            initParams: function() {

                var that = That.cacheInfo.urlParams = {};
                var _urlParams = Comm.getQueryParam();
                if (_urlParams) {
                    for (var item in _urlParams) {
                        that[item] = _urlParams[item];
                    }
                }

                //FIXME ��������
                if (That.cacheInfo.urlParams.lan) {
                    var lan = That.cacheInfo.urlParams.lan;
                    switch (lan) {
                        //Ĭ��Ϊ���� 0   Ӣ�� 1
                        case 'en':
                            That.cacheInfo.urlParams.lanFlag = 1;
                            break;
                        default:
                            That.cacheInfo.urlParams.lanFlag = 0;
                            break;
                    }
                }


            },
            //FIXME ��ʼ��UA����
            initUA: function() {
                var that = That.cacheInfo.UAInfo = {};
                // FIXME �Ƿ�����������'mz'������֤��
                var uaList = ['mz', 'xiaomi', 'android', 'ipad', 'iphone'],
                    pcUaList = ['windows', 'linux', 'mac'],
                    uaListLen = uaList.length,
                    pcUaListLen = pcUaList.length,
                    userAgent = navigator.userAgent.toLowerCase(),
                    uaWidth = $(window).width(),
                    uaHeight = $(window).height(),
                    uaIndex = 0,
                    iphoneVersion = 'iphone-5',
                    returnUA = '';
                that.uaHeight = uaHeight;
                // ��ȡ�ֻ���UA
                for (var i = 0,
                         item = ''; i < uaListLen; i++) {
                    if (returnUA.length) {
                        break;
                    }
                    item = uaList[i];
                    // FIXME �Ƿ���Ҫͨ��������ƥ�䣬����̰�����µ�ʶ�����
                    // ���ߴ���UA�׶λ��iPhone��iPod touch�ȶ�ʶ��ΪiPhone��Ȼ����ͨ��widht&height�����ְ汾
                    uaIndex = userAgent.indexOf(item);
                    // 1.��Ҫʶ��iphone�汾
                    if (item === 'iphone' && uaIndex > 0) {
                        // ���ݿ�����ж�iPhone�汾
                        // ����iPhone�汾
                        if (uaWidth > 310 && uaWidth < 320) {
                            uaWidth = 1;
                        }
                        if (uaWidth > 365 && uaWidth < 385) {
                            uaWidth = 2;
                        }
                        if (uaWidth > 404 && uaWidth < 424) {
                            uaWidth = 3;
                        }
                        switch (uaWidth) {
                            case 1:
                                iphoneVersion = 'iphone-5';
                                // iPhone 4 (4, 4S) && iPhone 5 (5c, 5s)
                                break;
                            case 2:
                                iphoneVersion = 'iphone-6';
                                // iPhone 6
                                break;
                            case 3:
                                iphoneVersion = 'iphone-6+';
                                // iPhone 6+
                                break;
                        }
                        // ����ȫ�ֵ�iphoneVersion
                        that.iphoneVersion = iphoneVersion;
                        that.UA = item;
                        break;
                    }
                    // 2.ʶ����������
                    if (uaIndex > 0) {
                        that.UA = item;
                        break;
                    }
                }
                // ��ȡPC��UA
                if (uaIndex <= 0) {
                    for (var i = 0,
                             item = ''; i < pcUaListLen; i++) {
                        item = pcUaList[i];
                        uaIndex = userAgent.indexOf(item);

                        if (uaIndex > 0) {
                            that.UA = 'pc';
                            break;
                        }
                    }
                }
            },
            //FIXME ��ʼ���������Ϣ
            initBrowser: function() {
                var that = That.cacheInfo.browser = {};
                var browserList = ['mqqbrowser', // QQ�����(ע��mqqbrowser��qq��˳��)
                        'qq', // �ֻ�qq
                        'micromessenger', // ΢�������
                        'ucbrowser', // UC�����(ע��ucbrowser��safari��˳��)
                        'miuibrowser', // С�������
                        'safari', // Safari�����
                        'opera mobi', // Opera�����
                        'opera mini', // Opera Mini�����
                        'firefox' // Firefox�����
                    ],
                    browserListLen = browserList.length,
                    userAgent = navigator.userAgent.toLowerCase(),
                    uaIndex = 0;

                for (var i = 0,
                         item = ''; i < browserListLen; i++) {
                    item = browserList[i];
                    uaIndex = userAgent.indexOf(item);
                    if (uaIndex > 0) {
                        that.browser = item;
                        return;
                        //  return item;
                    }
                }
            },
            //FIXME ��ʼ����������
            initLanguage: function() {
                var that = That.cacheInfo.language = {};
                //����򿪾���ʾϵͳ��ʾ
                if (isLanOpen) {
                    that.open = true;

                } else {
                    that.open = false;
                }
            },
            //FIXME ��ʼ��Event����
            initEventType: function() {
                var that = That.cacheInfo.eventType = {};
                if (That.cacheInfo.UAInfo.UA == 'xiaomi') {
                    //С����mousedown�¼�
                    that.type = 'mousedown';
                    //  return 'mousedown';
                } else if (That.cacheInfo.UAInfo.UA != 'pc') {
                    var isTouchPad = (/hp-tablet/gi).test(navigator.appVersion),
                        hasTouch = 'ontouchstart' in window && !isTouchPad;
                    that.type = hasTouch ? 'touchstart' : 'mousedown';
                    //  return hasTouch ? 'touchstart' : 'mousedown';
                } else {
                    that.type = 'click';
                    //  return 'click';
                }
            },
            //FIXME ��ʼ���û���Ϣ
            initUserInfo: function() {
                //������Դ��0�ͷ��ύ��1 PC��ͨ�û������ύ��2 H5��ͨ�û������ύ��3��ͨ�û�΢���ύ��4��ͨ�û�APP�ύ
                // �û���Դ��PC 0,΢�� 1 ,APP 2,WAP 4
                var oSource = isMobile ? 4 : 0, // �û���Դ 0��PC 1��΢�� 2��APP 3��΢�� 4��WAP
                    urlParams = Comm.getQueryParam();
                var sourceData = urlParams['source'];
                if (typeof sourceData == 'number') {
                    oSource = sourceData;
                }
                //console.log(urlParams);
                That.cacheInfo.userInfo = {
                    source: oSource,
                    tel: urlParams['tel'] ? urlParams['tel'] : '',
                    uname: urlParams['uname'] ? urlParams['uname'] : '',
                    partnerId: urlParams['partnerId'] ? urlParams['partnerId'] + "" : '',
                    email: urlParams['email'] ? urlParams['email'] : '',
                    visitUrl: urlParams['visitUrl'] ? urlParams['visitUrl'] : Comm.preURLLink,
                    visitTitle: urlParams['visitTitle'] ? urlParams['visitTitle'] : '',
                    // face : urlParams['face'] ? urlParams['face'] : getHanderImg(),//Ĭ���û�ͷ��
                    face: urlParams['face'] ? urlParams['face'] : '', //Ĭ���û�ͷ��
                    back: urlParams['back'] ? urlParams['back'] : '',
                    realname: urlParams['realname'] ? urlParams['realname'] : '',
                    weibo: urlParams['weibo'] ? urlParams['weibo'] : '',
                    weixin: urlParams['weixin'] ? urlParams['weixin'] : '',
                    qq: urlParams['qq'] ? urlParams['qq'] : '',
                    sex: urlParams['sex'] ? urlParams['sex'] : urlParams['sex'] === 0 ? 0 : '',
                    birthday: urlParams['birthday'] ? urlParams['birthday'] : '',
                    remark: urlParams['remark'] ? urlParams['remark'] : '',
                    color: urlParams['color'] ? urlParams['color'] : '', //FIXME  Ĭ�����ȴ�������ȡ����ɫ
                    modulType: urlParams['modulType'] ? urlParams['modulType'] : '', //FIXME Ĭ�����ȿͷ�ģʽ��������ȡ
                    params: urlParams['params'] ? urlParams['params'] : '', //FIXME �Զ����ֶ�
                    lastCid: urlParams['cid'] ? urlParams['cid'] : '', //cid
                    customerFields: urlParams['customerFields'] ? urlParams['customerFields'] : '' //�û��Զ����ֶ�
                };
            },
            //FIXME ��ʼ��SysNumϵͳ id
            initSysNum: function() {
                That.cacheInfo.sysNum = Comm.getQueryParam()['sysNum'];
            }
        };

        var judgeEnviroment = function() {
            var promise = new Promise();
            setTimeout(promise.resolve, 0);
            return promise;
        };

        var getLeaveMessage = function(params, global) {
            //console.log(params);
            var arr = ['leaveMessage.html'];
            var count = 0;
            var obj = {};
            for (var el in params) {
                obj[el] = params[el];
            }
            obj['uid'] = global.apiInit.uid;
            obj['uname'] = global.apiInit.uname;

            for (var el in obj) {
                var value = encodeURIComponent(obj[el]);
                if (value.length > 50) {
                    continue;
                }
                if (count == 0) {
                    arr.push("?");
                } else {
                    arr.push("&");
                }
                arr.push(el + "=" + value);
                count++;
            }
            var str = arr.join("");
            return str;
        };

        var decodeURL = function(str) {
            if (str === undefined || str === null || str !== str) {
                return '';
            }
            try {
                return decodeURIComponent(str);
            } catch (e) {
                return '';
            }
        }
        //promise����
        var promiseHandler = function() {
            judgeEnviroment().then(function(value, promise) {
                var promise = promise || new Promise();
                config.initUA();
                config.initParams();
                config.initLanguage();
                config.initSysNum();
                config.initBrowser();
                config.initUserInfo();
                config.initEventType();
                $.ajax({
                    type: "post",
                    url: api.config_url,
                    dataType: "json",
                    data: {
                        sysNum: That.cacheInfo.sysNum,
                        source: That.cacheInfo.userInfo.source,
                        lanFlag: That.cacheInfo.urlParams.lanFlag || 0,
                        robotFlag: params.robotFlag || ""
                    },
                    success: (function(data) {
                        //FIXME  �ڴ��жϿͷ�ģʽ
                        var mType = That.cacheInfo.userInfo.modulType;
                        var mColor = That.cacheInfo.userInfo.color;
                        if (typeof mType == 'number' && (mType >= 1 && mType <= 4)) { //����ģʽֻ��1��4���ĸ��ȼ�
                            mType = Math.floor(mType);
                            data.type = mType;
                        }
                        //��ɫֻ�ܴ�#666 �� #ffddaa
                        var _color;
                        var testColor = /^(([a-fA-F0-9]{3})|([a-fA-F0-9]{6}))$/;
                        if (mColor) {
                            _color = decodeURIComponent(mColor);
                            if (testColor.test(_color)) {
                                data.color = '#' + _color;
                            }
                        }
                        That.cacheInfo.userInfo.color = data.color;
                        That.cacheInfo.apiConfig = data;
                        ////��̨���ó�ʼ��
                        // console.log(That.cacheInfo);
                        //Ĭ��Ϊ���� 0   Ӣ�� 1
                        if (!That.cacheInfo.urlParams.lanFlag) {
                            if (That.cacheInfo.apiConfig.lan) {
                                That.cacheInfo.urlParams.lanFlag = That.cacheInfo.apiConfig.lan
                                That.cacheInfo.urlParams.lan = "en"
                            }
                        }

                        //FIXME ��ʼ�������˻ش��������ʾת�˹���ť,��ȡurl���棬û����ȡ��̨
                        var manualTypeObj = {},
                            manualTypeAry = [];
                        if (typeof params.manualType === "string") {
                            manualTypeAry = params.manualType.split(",");
                        } else if (typeof That.cacheInfo.apiConfig.manualType === "string") {
                            manualTypeAry = That.cacheInfo.apiConfig.manualType.split(",");
                        }
                        manualTypeObj.direct = manualTypeAry[0];
                        manualTypeObj.under = manualTypeAry[1];
                        manualTypeObj.guide = manualTypeAry[2];
                        manualTypeObj.unknow = manualTypeAry[3];
                        That.cacheInfo.urlParams.manualTypeObj = manualTypeObj;

                        //����������δ֪��ʾת�˹���ť
                        if (typeof params.artificial !== "undefined") {
                            That.cacheInfo.urlParams.chatConnectButton = params.artificial;
                        } else {
                            That.cacheInfo.urlParams.chatConnectButton = That.cacheInfo.apiConfig.chatConnectButton;
                        }
                        if (typeof params.tranFlag !== 'number') {
                            That.cacheInfo.urlParams.tranFlag = 0;
                        } else {
                            That.cacheInfo.urlParams.tranFlag = params.tranFlag;
                        }
                        if (typeof params.artificialCount !== "undefined") {
                            That.cacheInfo.urlParams.manualBtnCount = params.artificialCount;
                        } else {
                            That.cacheInfo.urlParams.manualBtnCount = That.cacheInfo.apiConfig.manualBtnCount;
                        }
                        var urlpar = window.location.href.split("?")[1];
                        var urlafter = "";

                        //������url,���ܽ�sysNum����ȥ
                        var reg = /sysNum=(\w){1,100}(&)?/;
                        if (reg.test(urlpar)) {
                            var regAry = reg.exec(urlpar);
                            urlpar = urlpar.replace(regAry[0], "");
                        };
                        //console.log(urlpar);
                        if (typeof params.wurl !== "undefined") {
                            if (params.wurl.split("?")[1]) {
                                urlafter = "?" + params.wurl.split("?")[1] + "&" + urlpar;
                                That.cacheInfo.urlParams.wurl = params.wurl.split("?")[0] + urlafter;
                            } else {
                                urlafter = "?" + urlpar;
                                That.cacheInfo.urlParams.wurl = params.wurl + urlafter;
                            }
                        } else {
                            if (That.cacheInfo.apiConfig.wurl.split("?")[1]) {
                                //console.log(2);
                                urlafter = "?" + That.cacheInfo.apiConfig.wurl.split("?")[1] + "&" + urlpar;
                                That.cacheInfo.urlParams.wurl = That.cacheInfo.apiConfig.wurl.split("?")[0] + urlafter;
                            } else {
                                //console.log(3);
                                urlafter = "?" + urlpar;
                                That.cacheInfo.urlParams.wurl = That.cacheInfo.apiConfig.wurl + urlafter;
                            }
                        }
                        // console.log(That.cacheInfo.apiConfig.leaveCustomUrl + urlafter);

                        if (typeof params.leaveCustomUrl !== "undefined") {
                            if (params.leaveCustomUrl.split("?")[1]) {
                                urlafter = "?" + params.leaveCustomUrl.split("?")[1] + "&" + urlpar;
                                That.cacheInfo.urlParams.leaveCustomUrl = params.leaveCustomUrl.split("?")[0] + urlafter;
                            } else {
                                urlafter = "?" + urlpar;
                                That.cacheInfo.urlParams.leaveCustomUrl = params.leaveCustomUrl + urlafter;
                            }
                        } else {
                            if (That.cacheInfo.apiConfig.leaveCustomUrl && That.cacheInfo.apiConfig.leaveCustomUrl.split("?")[1]) {
                                urlafter = "?" + That.cacheInfo.apiConfig.leaveCustomUrl.split("?")[1] + "&" + urlpar;
                                That.cacheInfo.urlParams.leaveCustomUrl = That.cacheInfo.apiConfig.leaveCustomUrl.split("?")[0] + urlafter;
                            } else {
                                urlafter = "?" + urlpar;
                                That.cacheInfo.urlParams.leaveCustomUrl = That.cacheInfo.apiConfig.leaveCustomUrl + urlafter;
                            }
                        }

                        //ת�˹���ť�򿪷�ʽ(wurlOpenStyle)
                        //ת�˹���ť�򿪷�ʽ(�´��ڴ򿪻��ǵ�ǰҳ�򿪣�С��������ֻ�����´��ڴ򿪣�������)
                        if (typeof params.wurlOpenStyle !== "undefined") {
                            That.cacheInfo.urlParams.wurlOpenStyle = params.wurlOpenStyle;
                        } else {
                            That.cacheInfo.urlParams.wurlOpenStyle = true;
                        }
                        //ת�˹�����������
                        if (typeof params.isCustomSysFlag !== "undefined" && params.wurl) {
                            That.cacheInfo.urlParams.isCustomSysFlag = params.isCustomSysFlag;
                        } else {
                            That.cacheInfo.urlParams.isCustomSysFlag = That.cacheInfo.apiConfig.isCustomSysFlag;
                        }
                        //���ԵĴ򿪷�ʽ
                        if (typeof params.isLeaveCustomSysFlag !== "undefined") {
                            That.cacheInfo.urlParams.isLeaveCustomSysFlag = params.isLeaveCustomSysFlag;
                        } else {
                            That.cacheInfo.urlParams.isLeaveCustomSysFlag = That.cacheInfo.apiConfig.isLeaveCustomSysFlag;
                        }
                        //���Ե���������
                        // if (typeof params.isLeaveCustomSysFlag !== "undefined" && params.leaveCustomUrl) {
                        //     That.cacheInfo.urlParams.leaveWurl = params.leaveCustomUrl;
                        // } else {
                        //     That.cacheInfo.urlParams.leaveWurl = That.cacheInfo.apiConfig.leaveCustomUrl;
                        // }
                        //msgflag���ƴ����кͽ����Ự������,0������1�ر�
                        if (typeof params.msgflag !== "undefined") {
                            That.cacheInfo.urlParams.msgflag = params.msgflag;
                        } else {
                            That.cacheInfo.urlParams.msgflag = That.cacheInfo.apiConfig.msgflag;
                        }
                        //ismessageflag����������е�����,0�رգ�1����
                        if (typeof params.isMessageFlag !== "undefined") {
                            That.cacheInfo.urlParams.isMessageFlag = params.isMessageFlag;
                        } else {
                            That.cacheInfo.urlParams.isMessageFlag = That.cacheInfo.apiConfig.isMessageFlag;
                        }
                        // alert(typeof params.satDegree_A);
                        //����ȿ��أ�falseΪ�ر�
                        if (typeof params.satDegree_A !== "undefined") {
                            That.cacheInfo.urlParams.satDegree_A = params.satDegree_A;
                        } else {
                            That.cacheInfo.urlParams.satDegree_A = true; //That.cacheInfo.apiConfig.satDegree_A;
                        }
                        //����������ȿ���
                        if (typeof params.isFeedBackFlag !== "undefined") {
                            That.cacheInfo.urlParams.isFeedBackFlag = params.isFeedBackFlag;
                        } else {
                            That.cacheInfo.urlParams.isFeedBackFlag = That.cacheInfo.apiConfig.isFeedBackFlag;
                        }
                        //�ǳ�logo
                        if (typeof params.powered !== "undefined") {
                            That.cacheInfo.urlParams.designButton = params.powered;
                        } else {
                            That.cacheInfo.urlParams.designButton = That.cacheInfo.apiConfig.designButton;
                        }
                        //�����Ƿ���ʾ����  0 ����ʾ  1��ʾ��ticketStartWay 1 ���䷢��ʽ 2 �ֻ��ŷ���ʽ
                        if (typeof params.emailShowFlag !== "undefined" && That.cacheInfo.apiConfig.ticketStartWay != 1) {
                            That.cacheInfo.urlParams.emailShowFlag = params.emailShowFlag;
                        } else {
                            That.cacheInfo.urlParams.emailShowFlag = That.cacheInfo.apiConfig.emailShowFlag;
                        }
                        //�����������Ƿ�Ϊ�����ֶ�  0 ѡ��   1���� ��ticketStartWay 1 ���䷢��ʽ 2 �ֻ��ŷ���ʽ
                        if (typeof params.emailFlag !== "undefined" && That.cacheInfo.apiConfig.ticketStartWay != 1) {
                            That.cacheInfo.urlParams.emailFlag = params.emailFlag;
                        } else {
                            That.cacheInfo.urlParams.emailFlag = That.cacheInfo.apiConfig.emailFlag;
                        }
                        //�����Ƿ���ʾ�ֻ���  0 ����ʾ  1��ʾ�� ticketStartWay 1 ���䷢��ʽ 2 �ֻ��ŷ���ʽ
                        if (typeof params.telShowFlag !== "undefined" && That.cacheInfo.apiConfig.ticketStartWay != 2) {
                            That.cacheInfo.urlParams.telShowFlag = params.telShowFlag;
                        } else {
                            That.cacheInfo.urlParams.telShowFlag = That.cacheInfo.apiConfig.telShowFlag;
                        }
                        //�����ֻ����Ƿ�Ϊ�����ֶ�  0 ѡ��   1���ticketStartWay 1 ���䷢��ʽ 2 �ֻ��ŷ���ʽ
                        if (typeof params.telFlag !== "undefined" && That.cacheInfo.apiConfig.ticketStartWay != 2) {
                            That.cacheInfo.urlParams.telFlag = params.telFlag;
                        } else {
                            That.cacheInfo.urlParams.telFlag = That.cacheInfo.apiConfig.telFlag;
                        };
                        /*�ж��ֻ��ź����� ���߱�ѡ��һ*/
                        // if ((!That.cacheInfo.urlParams.telShowFlag && !That.cacheInfo.urlParams.emailShowFlag) || (That.cacheInfo.urlParams.telShowFlag && !That.cacheInfo.urlParams.telFlag && That.cacheInfo.urlParams.emailShowFlag && !That.cacheInfo.urlParams.emailFlag) || (That.cacheInfo.urlParams.telShowFlag && !That.cacheInfo.urlParams.telFlag && !That.cacheInfo.urlParams.emailShowFlag) || (!That.cacheInfo.urlParams.telShowFlag && That.cacheInfo.urlParams.emailShowFlag && !That.cacheInfo.urlParams.emailFlag)) {
                        //     That.cacheInfo.urlParams.emailFlag = 1;
                        //     That.cacheInfo.urlParams.emailShowFlag = 1;
                        // }
                        // �Ƿ���ʾ����  0 ����ʾ  1��ʾ
                        //if (typeof params.enclosureShowFlag !== "undefined") {
                        //That.cacheInfo.urlParams.enclosureShowFlag = params.enclosureShowFlag;
                        //} else {
                        That.cacheInfo.urlParams.enclosureShowFlag = That.cacheInfo.apiConfig.enclosureShowFlag;
                        //}
                        //�����Ƿ�Ϊ�����ֶ�  0 ѡ��  1 ����
                        if (typeof params.enclosureFlag !== "undefined") {
                            That.cacheInfo.urlParams.enclosureFlag = params.enclosureFlag;
                        } else {
                            That.cacheInfo.urlParams.enclosureFlag = That.cacheInfo.apiConfig.enclosureFlag;
                        }
                        //�����˶��ȿ���  0 �ر�  1����
                        if (typeof params.realuateFlag !== "undefined") {
                            That.cacheInfo.urlParams.realuateFlag = params.realuateFlag;
                        } else {
                            That.cacheInfo.urlParams.realuateFlag = That.cacheInfo.apiConfig.realuateFlag;
                        }
                        //���û����˻�ӭ��
                        if (typeof params.robotHelloWord !== "undefined") {
                            That.cacheInfo.urlParams.robotHelloWord = params.robotHelloWord;
                        } else {
                            That.cacheInfo.urlParams.robotHelloWord = That.cacheInfo.apiConfig.robotHelloWord;
                        }
                        //�����˹���ӭ��
                        if (typeof params.adminHelloWord !== "undefined") {
                            That.cacheInfo.urlParams.adminHelloWord = params.adminHelloWord;
                        } else {
                            That.cacheInfo.urlParams.adminHelloWord = That.cacheInfo.apiConfig.adminHelloWord;
                        }
                        //�����˹���ʱ��ʾ��
                        if (typeof params.adminTipWord !== "undefined") {
                            That.cacheInfo.urlParams.adminTipWord = params.adminTipWord;
                        } else {
                            That.cacheInfo.urlParams.adminTipWord = That.cacheInfo.apiConfig.adminTipWord;
                        }
                        //�����û���ʾ��
                        if (typeof params.userTipWord !== "undefined") {
                            That.cacheInfo.urlParams.userTipWord = params.userTipWord;
                        } else {
                            That.cacheInfo.urlParams.userTipWord = That.cacheInfo.apiConfig.userTipWord;
                        }
                        //����ת�˹���������ʾ��
                        if (typeof params.adminNonelineTitle !== "undefined") {
                            That.cacheInfo.urlParams.adminNonelineTitle = params.adminNonelineTitle;
                        } else {
                            That.cacheInfo.urlParams.adminNonelineTitle = That.cacheInfo.apiConfig.adminNonelineTitle;
                        }
                        //���õ��������ת�˹����Ի����groupId����
                        if (typeof params.leaveMsgSendGroupIdFlag !== "undefined") {
                            That.cacheInfo.urlParams.leaveMsgSendGroupIdFlag = params.leaveMsgSendGroupIdFlag;
                        } else {
                            That.cacheInfo.urlParams.leaveMsgSendGroupIdFlag = That.cacheInfo.apiConfig.leaveMsgSendGroupIdFlag;
                        }
                        //�����������������͵Ŀ���
                        if (typeof params.ticketTypeFlag !== "undefined") {
                            That.cacheInfo.urlParams.ticketTypeFlag = params.ticketTypeFlag;
                        } else {
                            That.cacheInfo.urlParams.ticketTypeFlag = That.cacheInfo.apiConfig.ticketTypeFlag;
                        }
                        //�����������������͵���ҵ�Լ����õ����ͣ��������������͹رյ�ʱ��
                        if (typeof params.ticketTypeId !== "undefined") {
                            That.cacheInfo.urlParams.ticketTypeId = params.ticketTypeId;
                        } else {
                            That.cacheInfo.urlParams.ticketTypeId = That.cacheInfo.apiConfig.ticketTypeId;
                        }

                        promise.resolve();
                    })
                });
                return promise;
            })
                .then(function(value, promise) {
                    var promise = promise || new Promise(),
                        params = That.cacheInfo.urlParams;
                    if (params.rput === 1) {
                        $.ajax({
                            type: 'get',
                            url: api.active_url,
                            dataType: 'json',
                            timeout: 1000 * 3,
                            data: {
                                sysNum: params.sysNum,
                                partnerId: params.partnerId || '',
                                rpuc: params.rpuc || ''
                            },
                            success: function(ret) {
                                if (ret && ret.status === 'ok') {
                                    That.cacheInfo.activeData = ret;
                                    promise.resolve(ret.params);
                                } else
                                    promise.resolve();
                            }
                        })
                    } else {
                        promise.resolve();
                    }
                    return promise;
                })
                .then(function(value, promise) {
                    // console.log(value);
                    var params = '';
                    if (Object.prototype.toString.call(value) === '[object Object]') {
                        params = JSON.stringify(value);
                    }
                    $.ajax({
                        type: "post",
                        url: api.init_url,
                        dataType: "json",
                        data: {
                            'ack': 1,
                            sysNum: decodeURL(That.cacheInfo.sysNum),
                            source: decodeURL(That.cacheInfo.userInfo.source),
                            'chooseAdminId': That.cacheInfo.urlParams.aid || '',
                            'tranFlag': That.cacheInfo.urlParams.tranFlag,
                            'groupId': decodeURL(That.cacheInfo.urlParams.groupId) || '',
                            partnerId: decodeURL('' + That.cacheInfo.userInfo.partnerId),
                            tel: decodeURL(That.cacheInfo.userInfo.tel),
                            email: decodeURL(That.cacheInfo.userInfo.email),
                            uname: decodeURL(That.cacheInfo.userInfo.uname),
                            visitTitle: decodeURL(That.cacheInfo.userInfo.visitTitle),
                            visitUrl: decodeURL(That.cacheInfo.userInfo.visitUrl),
                            face: decodeURL(That.cacheInfo.userInfo.face),
                            realname: decodeURL(That.cacheInfo.userInfo.realname),
                            weibo: decodeURL(That.cacheInfo.userInfo.weibo),
                            weixin: decodeURL(That.cacheInfo.userInfo.weixin),
                            qq: decodeURL(That.cacheInfo.userInfo.qq),
                            sex: decodeURL(That.cacheInfo.userInfo.sex),
                            birthday: decodeURL(That.cacheInfo.userInfo.birthday),
                            remark: decodeURL(That.cacheInfo.userInfo.remark),
                            params: decodeURL(params || That.cacheInfo.userInfo.params),
                            isReComment: decodeURL(1),
                            customerFields: decodeURL(That.cacheInfo.userInfo.customerFields), //�û��Զ����ֶ�
                            visitStartTime: decodeURL(That.cacheInfo.urlParams.visitStartTime || '') //��ֵ�Ǵ�js�����load�ӿ��õ���ͨ��init�ش������
                            //lastCid:defaultcodeURL(That.cacheInfo.userInfo.lastCid)
                        },
                        success: function(res) {
                            var data = res.data ? res.data : res;
                            That.cacheInfo.apiInit = data;
                            initText(That.cacheInfo);
                            if (That.cacheInfo.urlParams.msgflag == 0 || That.cacheInfo.urlParams.isMessageFlag == 1) {
                                var url = getLeaveMessage(That.cacheInfo.urlParams, That.cacheInfo);
                                var lan = That.cacheInfo.language.lan;
                                if (isMobile) {
                                    That.cacheInfo.apiConfig.leaveMsg = lan['L10024'].replace("{0}", url).replace("{1}", url);
                                } else {
                                    That.cacheInfo.apiConfig.leaveMsg = lan['L10039'];
                                }
                                That.cacheInfo.apiConfig.leaveMsgUrl = url;
                            } else {
                                That.cacheInfo.apiConfig.leaveMsg = '';
                            }


                            That.cacheInfo.pageType = pageType;
                            outerPromise.resolve(That.cacheInfo);
                        }
                    });
                });
        };

        var init = function() {
            promiseHandler();
        };
        init();
        return outerPromise;

    };
    module.exports = initConfig;
},{"./comm.js":1,"./initText.js":4,"./util/promise.js":31}],4:[function(require,module,exports){
    var localeFactory = require("./locale.js");

    var initHTML = function(locale) {
        var classList = ['.js-text-return-btn', '.js-text-pulldown', '.js-text-transfer-btn', '.js-text-sendBtn', '.js-text-upload-btn', '.js-text-comment-btn', '.js-text-satisfition-btn', '.js-text-conversation-btn', '.js-text-submit-btn', '.js-text-success-btn', '.js-text-contact', '.js-text-ok-btn'];
        for (var i = 0; i < classList.length; i++) {
            var item = classList[i];
            var $elm = $(item);
            var text = locale.html['HTML_MSG0' + i];
            $elm.text(text).attr("placeholder", text);
        }
        $('.js-text-tel').html(locale.html['HTML_MSG' + 18]);
        //112������pc
        var classListPc = ['.js-pulldown-text', '.js-text-chatSwitch', '.js-text-send', '.js-text-satisfaction', '.js-text-newMessage', '.js-text-leaveMessage'];
        for (var i = 0; i < classListPc.length; i++) {
            var item = classListPc[i];
            var $elm = $(item);
            var text = locale.html['HTML_MSG01' + (i + 12)];
            $elm.text(text);
        }

    };


    function initText(global) {
        var locale = localeFactory(global);
        initHTML(locale);
        global.language.lan = locale.system;
        global.language.text = locale.text;
    }


    module.exports = initText;

},{"./locale.js":6}],5:[function(require,module,exports){
    /**
     * Detect.js: User-Agent Parser
     * https://github.com/darcyclarke/Detect.js
     * Dual licensed under the MIT and GPL licenses.
     *
     * @version 2.2.2
     * @author Darcy Clarke
     * @url https://darcyclarke.me
     * @createdat Mon Oct 26 2015 08:21:54 GMT-0200 (Hor��rio brasileiro de ver?o)
     *
     * Based on UA-Parser (https://github.com/tobie/ua-parser) by Tobie Langel
     *
     * Example Usage:
     * var agentInfo = detect.parse(navigator.userAgent);
     * console.log(agentInfo.browser.family); // Chrome
     *
     */
    (function(root, undefined) {
        // Shim Array.prototype.map if necessary
        // Production steps of ECMA-262, Edition 5, 15.4.4.19
        // Reference: https://es5.github.com/#x15.4.4.19
        if (!Array.prototype.map) {
            Array.prototype.map = function(callback, thisArg) {
                var T, A, k;
                if (this == null) {
                    throw new TypeError(" this is null or not defined");
                }
                // 1. Let O be the result of calling ToObject passing the |this| value as the argument.
                var O = Object(this);
                // 2. Let lenValue be the result of calling the Get internal method of O with the argument "length".
                // 3. Let len be ToUint32(lenValue).
                var len = O.length >>> 0;
                // 4. If IsCallable(callback) is false, throw a TypeError exception.
                // See: https://es5.github.com/#x9.11
                if (typeof callback !== "function") {
                    throw new TypeError(callback + " is not a function");
                }
                // 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
                if (thisArg) {
                    T = thisArg;
                }
                // 6. Let A be a new array created as if by the expression new Array(len) where Array is
                // the standard built-in constructor with that name and len is the value of len.
                A = new Array(len);
                // 7. Let k be 0
                k = 0;
                // 8. Repeat, while k < len
                while (k < len) {
                    var kValue, mappedValue;
                    // a. Let Pk be ToString(k).
                    //   This is implicit for LHS operands of the in operator
                    // b. Let kPresent be the result of calling the HasProperty internal method of O with argument Pk.
                    //   This step can be combined with c
                    // c. If kPresent is true, then
                    if (k in O) {
                        // i. Let kValue be the result of calling the Get internal method of O with argument Pk.
                        kValue = O[k];
                        // ii. Let mappedValue be the result of calling the Call internal method of callback
                        // with T as the this value and argument list containing kValue, k, and O.
                        mappedValue = callback.call(T, kValue, k, O);
                        // iii. Call the DefineOwnProperty internal method of A with arguments
                        // Pk, Property Descriptor {Value: mappedValue, : true, Enumerable: true, Configurable: true},
                        // and false.
                        // In browsers that support Object.defineProperty, use the following:
                        // Object.defineProperty(A, Pk, { value: mappedValue, writable: true, enumerable: true, configurable: true });
                        // For best browser support, use the following:
                        A[k] = mappedValue;
                    }
                    // d. Increase k by 1.
                    k++;
                }
                // 9. return A
                return A;
            };
        }
        // Detect
        var detect = root.detect = function() {
            // Context
            var _this = function() {};
            // Regexes
            var regexes = {
                browser_parsers: [{
                    regex: "^(Opera)/(\\d+)\\.(\\d+) \\(Nintendo Wii",
                    family_replacement: "Wii",
                    manufacturer: "Nintendo"
                }, {
                    regex: "(SeaMonkey|Camino)/(\\d+)\\.(\\d+)\\.?([ab]?\\d+[a-z]*)",
                    family_replacement: "Camino",
                    other: true
                }, {
                    regex: "(Pale[Mm]oon)/(\\d+)\\.(\\d+)\\.?(\\d+)?",
                    family_replacement: "Pale Moon (Firefox Variant)",
                    other: true
                }, {
                    regex: "(Fennec)/(\\d+)\\.(\\d+)\\.?([ab]?\\d+[a-z]*)",
                    family_replacement: "Firefox Mobile"
                }, {
                    regex: "(Fennec)/(\\d+)\\.(\\d+)(pre)",
                    family_replacment: "Firefox Mobile"
                }, {
                    regex: "(Fennec)/(\\d+)\\.(\\d+)",
                    family_replacement: "Firefox Mobile"
                }, {
                    regex: "Mobile.*(Firefox)/(\\d+)\\.(\\d+)",
                    family_replacement: "Firefox Mobile"
                }, {
                    regex: "(Namoroka|Shiretoko|Minefield)/(\\d+)\\.(\\d+)\\.(\\d+(?:pre)?)",
                    family_replacement: "Firefox ($1)"
                }, {
                    regex: "(Firefox)/(\\d+)\\.(\\d+)(a\\d+[a-z]*)",
                    family_replacement: "Firefox Alpha"
                }, {
                    regex: "(Firefox)/(\\d+)\\.(\\d+)(b\\d+[a-z]*)",
                    family_replacement: "Firefox Beta"
                }, {
                    regex: "(Firefox)-(?:\\d+\\.\\d+)?/(\\d+)\\.(\\d+)(a\\d+[a-z]*)",
                    family_replacement: "Firefox Alpha"
                }, {
                    regex: "(Firefox)-(?:\\d+\\.\\d+)?/(\\d+)\\.(\\d+)(b\\d+[a-z]*)",
                    family_replacement: "Firefox Beta"
                }, {
                    regex: "(Namoroka|Shiretoko|Minefield)/(\\d+)\\.(\\d+)([ab]\\d+[a-z]*)?",
                    family_replacement: "Firefox ($1)"
                }, {
                    regex: "(Firefox).*Tablet browser (\\d+)\\.(\\d+)\\.(\\d+)",
                    family_replacement: "MicroB",
                    tablet: true
                }, {
                    regex: "(MozillaDeveloperPreview)/(\\d+)\\.(\\d+)([ab]\\d+[a-z]*)?"
                }, {
                    regex: "(Flock)/(\\d+)\\.(\\d+)(b\\d+?)",
                    family_replacement: "Flock",
                    other: true
                }, {
                    regex: "(RockMelt)/(\\d+)\\.(\\d+)\\.(\\d+)",
                    family_replacement: "Rockmelt",
                    other: true
                }, {
                    regex: "(Navigator)/(\\d+)\\.(\\d+)\\.(\\d+)",
                    family_replacement: "Netscape"
                }, {
                    regex: "(Navigator)/(\\d+)\\.(\\d+)([ab]\\d+)",
                    family_replacement: "Netscape"
                }, {
                    regex: "(Netscape6)/(\\d+)\\.(\\d+)\\.(\\d+)",
                    family_replacement: "Netscape"
                }, {
                    regex: "(MyIBrow)/(\\d+)\\.(\\d+)",
                    family_replacement: "My Internet Browser",
                    other: true
                }, {
                    regex: "(Opera Tablet).*Version/(\\d+)\\.(\\d+)(?:\\.(\\d+))?",
                    family_replacement: "Opera Tablet",
                    tablet: true
                }, {
                    regex: "(Opera)/.+Opera Mobi.+Version/(\\d+)\\.(\\d+)",
                    family_replacement: "Opera Mobile"
                }, {
                    regex: "Opera Mobi",
                    family_replacement: "Opera Mobile"
                }, {
                    regex: "(Opera Mini)/(\\d+)\\.(\\d+)",
                    family_replacement: "Opera Mini"
                }, {
                    regex: "(Opera Mini)/att/(\\d+)\\.(\\d+)",
                    family_replacement: "Opera Mini"
                }, {
                    regex: "(Opera)/9.80.*Version/(\\d+)\\.(\\d+)(?:\\.(\\d+))?",
                    family_replacement: "Opera"
                }, {
                    regex: "(OPR)/(\\d+)\\.(\\d+)(?:\\.(\\d+))?",
                    family_replacement: "Opera"
                }, {
                    regex: "(webOSBrowser)/(\\d+)\\.(\\d+)",
                    family_replacement: "webOS"
                }, {
                    regex: "(webOS)/(\\d+)\\.(\\d+)",
                    family_replacement: "webOS"
                }, {
                    regex: "(wOSBrowser).+TouchPad/(\\d+)\\.(\\d+)",
                    family_replacement: "webOS TouchPad"
                }, {
                    regex: "(luakit)",
                    family_replacement: "LuaKit",
                    other: true
                }, {
                    regex: "(Lightning)/(\\d+)\\.(\\d+)([ab]?\\d+[a-z]*)",
                    family_replacement: "Lightning",
                    other: true
                }, {
                    regex: "(Firefox)/(\\d+)\\.(\\d+)\\.(\\d+(?:pre)?) \\(Swiftfox\\)",
                    family_replacement: "Swiftfox",
                    other: true
                }, {
                    regex: "(Firefox)/(\\d+)\\.(\\d+)([ab]\\d+[a-z]*)? \\(Swiftfox\\)",
                    family_replacement: "Swiftfox",
                    other: true
                }, {
                    regex: "rekonq",
                    family_replacement: "Rekonq",
                    other: true
                }, {
                    regex: "(conkeror|Conkeror)/(\\d+)\\.(\\d+)\\.?(\\d+)?",
                    family_replacement: "Conkeror",
                    other: true
                }, {
                    regex: "(konqueror)/(\\d+)\\.(\\d+)\\.(\\d+)",
                    family_replacement: "Konqueror",
                    other: true
                }, {
                    regex: "(WeTab)-Browser",
                    family_replacement: "WeTab",
                    other: true
                }, {
                    regex: "(Comodo_Dragon)/(\\d+)\\.(\\d+)\\.(\\d+)",
                    family_replacement: "Comodo Dragon",
                    other: true
                }, {
                    regex: "(YottaaMonitor)",
                    family_replacement: "Yottaa Monitor",
                    other: true
                }, {
                    regex: "(Kindle)/(\\d+)\\.(\\d+)",
                    family_replacement: "Kindle"
                }, {
                    regex: "(Symphony) (\\d+).(\\d+)",
                    family_replacement: "Symphony",
                    other: true
                }, {
                    regex: "Minimo",
                    family_replacement: "Minimo",
                    other: true
                }, {
                    regex: "(Edge)/(\\d+)\\.(\\d+)",
                    family_replacement: "Edge"
                }, {
                    regex: "(CrMo)/(\\d+)\\.(\\d+)\\.(\\d+)\\.(\\d+)",
                    family_replacement: "Chrome Mobile"
                }, {
                    regex: "(CriOS)/(\\d+)\\.(\\d+)\\.(\\d+)\\.(\\d+)",
                    family_replacement: "Chrome Mobile iOS"
                }, {
                    regex: "(Chrome)/(\\d+)\\.(\\d+)\\.(\\d+)\\.(\\d+) Mobile",
                    family_replacement: "Chrome Mobile"
                }, {
                    regex: "(chromeframe)/(\\d+)\\.(\\d+)\\.(\\d+)",
                    family_replacement: "Chrome Frame"
                }, {
                    regex: "(UC Browser)(\\d+)\\.(\\d+)\\.(\\d+)",
                    family_replacement: "UC Browser",
                    other: true
                }, {
                    regex: "(SLP Browser)/(\\d+)\\.(\\d+)",
                    family_replacement: "Tizen Browser",
                    other: true
                }, {
                    regex: "(Epiphany)/(\\d+)\\.(\\d+).(\\d+)",
                    family_replacement: "Epiphany",
                    other: true
                }, {
                    regex: "(SE 2\\.X) MetaSr (\\d+)\\.(\\d+)",
                    family_replacement: "Sogou Explorer",
                    other: true
                }, {
                    regex: "(Pingdom.com_bot_version_)(\\d+)\\.(\\d+)",
                    family_replacement: "PingdomBot",
                    other: true
                }, {
                    regex: "(facebookexternalhit)/(\\d+)\\.(\\d+)",
                    family_replacement: "FacebookBot"
                }, {
                    regex: "(Twitterbot)/(\\d+)\\.(\\d+)",
                    family_replacement: "TwitterBot"
                }, {
                    regex: "(AdobeAIR|Chromium|FireWeb|Jasmine|ANTGalio|Midori|Fresco|Lobo|PaleMoon|Maxthon|Lynx|OmniWeb|Dillo|Camino|Demeter|Fluid|Fennec|Shiira|Sunrise|Chrome|Flock|Netscape|Lunascape|WebPilot|NetFront|Netfront|Konqueror|SeaMonkey|Kazehakase|Vienna|Iceape|Iceweasel|IceWeasel|Iron|K-Meleon|Sleipnir|Galeon|GranParadiso|Opera Mini|iCab|NetNewsWire|ThunderBrowse|Iron|Iris|UP\\.Browser|Bunjaloo|Google Earth|Raven for Mac)/(\\d+)\\.(\\d+)\\.(\\d+)"
                }, {
                    regex: "(Bolt|Jasmine|IceCat|Skyfire|Midori|Maxthon|Lynx|Arora|IBrowse|Dillo|Camino|Shiira|Fennec|Phoenix|Chrome|Flock|Netscape|Lunascape|Epiphany|WebPilot|Opera Mini|Opera|NetFront|Netfront|Konqueror|Googlebot|SeaMonkey|Kazehakase|Vienna|Iceape|Iceweasel|IceWeasel|Iron|K-Meleon|Sleipnir|Galeon|GranParadiso|iCab|NetNewsWire|Iron|Space Bison|Stainless|Orca|Dolfin|BOLT|Minimo|Tizen Browser|Polaris)/(\\d+)\\.(\\d+)"
                }, {
                    regex: "(iRider|Crazy Browser|SkipStone|iCab|Lunascape|Sleipnir|Maemo Browser) (\\d+)\\.(\\d+)\\.(\\d+)"
                }, {
                    regex: "(iCab|Lunascape|Opera|Android|Jasmine|Polaris|BREW) (\\d+)\\.(\\d+)\\.?(\\d+)?"
                }, {
                    regex: "(Android) Donut",
                    v2_replacement: "2",
                    v1_replacement: "1"
                }, {
                    regex: "(Android) Eclair",
                    v2_replacement: "1",
                    v1_replacement: "2"
                }, {
                    regex: "(Android) Froyo",
                    v2_replacement: "2",
                    v1_replacement: "2"
                }, {
                    regex: "(Android) Gingerbread",
                    v2_replacement: "3",
                    v1_replacement: "2"
                }, {
                    regex: "(Android) Honeycomb",
                    v1_replacement: "3"
                }, {
                    regex: "(IEMobile)[ /](\\d+)\\.(\\d+)",
                    family_replacement: "IE Mobile"
                }, {
                    regex: "(MSIE) (\\d+)\\.(\\d+).*XBLWP7",
                    family_replacement: "IE Large Screen"
                }, {
                    regex: "(Firefox)/(\\d+)\\.(\\d+)\\.(\\d+)"
                }, {
                    regex: "(Firefox)/(\\d+)\\.(\\d+)(pre|[ab]\\d+[a-z]*)?"
                }, {
                    regex: "(Obigo)InternetBrowser",
                    other: true
                }, {
                    regex: "(Obigo)\\-Browser",
                    other: true
                }, {
                    regex: "(Obigo|OBIGO)[^\\d]*(\\d+)(?:.(\\d+))?",
                    other: true
                }, {
                    regex: "(MAXTHON|Maxthon) (\\d+)\\.(\\d+)",
                    family_replacement: "Maxthon",
                    other: true
                }, {
                    regex: "(Maxthon|MyIE2|Uzbl|Shiira)",
                    v1_replacement: "0",
                    other: true
                }, {
                    regex: "(PLAYSTATION) (\\d+)",
                    family_replacement: "PlayStation",
                    manufacturer: "Sony"
                }, {
                    regex: "(PlayStation Portable)[^\\d]+(\\d+).(\\d+)",
                    manufacturer: "Sony"
                }, {
                    regex: "(BrowseX) \\((\\d+)\\.(\\d+)\\.(\\d+)",
                    other: true
                }, {
                    regex: "(POLARIS)/(\\d+)\\.(\\d+)",
                    family_replacement: "Polaris",
                    other: true
                }, {
                    regex: "(Embider)/(\\d+)\\.(\\d+)",
                    family_replacement: "Polaris",
                    other: true
                }, {
                    regex: "(BonEcho)/(\\d+)\\.(\\d+)\\.(\\d+)",
                    family_replacement: "Bon Echo",
                    other: true
                }, {
                    regex: "(iPod).+Version/(\\d+)\\.(\\d+)\\.(\\d+)",
                    family_replacement: "Mobile Safari",
                    manufacturer: "Apple"
                }, {
                    regex: "(iPod).*Version/(\\d+)\\.(\\d+)",
                    family_replacement: "Mobile Safari",
                    manufacturer: "Apple"
                }, {
                    regex: "(iPod)",
                    family_replacement: "Mobile Safari",
                    manufacturer: "Apple"
                }, {
                    regex: "(iPhone).*Version/(\\d+)\\.(\\d+)\\.(\\d+)",
                    family_replacement: "Mobile Safari",
                    manufacturer: "Apple"
                }, {
                    regex: "(iPhone).*Version/(\\d+)\\.(\\d+)",
                    family_replacement: "Mobile Safari",
                    manufacturer: "Apple"
                }, {
                    regex: "(iPhone)",
                    family_replacement: "Mobile Safari",
                    manufacturer: "Apple"
                }, {
                    regex: "(iPad).*Version/(\\d+)\\.(\\d+)\\.(\\d+)",
                    family_replacement: "Mobile Safari",
                    tablet: true,
                    manufacturer: "Apple"
                }, {
                    regex: "(iPad).*Version/(\\d+)\\.(\\d+)",
                    family_replacement: "Mobile Safari",
                    tablet: true,
                    manufacturer: "Apple"
                }, {
                    regex: "(iPad)",
                    family_replacement: "Mobile Safari",
                    tablet: true,
                    manufacturer: "Apple"
                }, {
                    regex: "(AvantGo) (\\d+).(\\d+)",
                    other: true
                }, {
                    regex: "(Avant)",
                    v1_replacement: "1",
                    other: true
                }, {
                    regex: "^(Nokia)",
                    family_replacement: "Nokia Services (WAP) Browser",
                    manufacturer: "Nokia"
                }, {
                    regex: "(NokiaBrowser)/(\\d+)\\.(\\d+).(\\d+)\\.(\\d+)",
                    manufacturer: "Nokia"
                }, {
                    regex: "(NokiaBrowser)/(\\d+)\\.(\\d+).(\\d+)",
                    manufacturer: "Nokia"
                }, {
                    regex: "(NokiaBrowser)/(\\d+)\\.(\\d+)",
                    manufacturer: "Nokia"
                }, {
                    regex: "(BrowserNG)/(\\d+)\\.(\\d+).(\\d+)",
                    family_replacement: "NokiaBrowser",
                    manufacturer: "Nokia"
                }, {
                    regex: "(Series60)/5\\.0",
                    v2_replacement: "0",
                    v1_replacement: "7",
                    family_replacement: "NokiaBrowser",
                    manufacturer: "Nokia"
                }, {
                    regex: "(Series60)/(\\d+)\\.(\\d+)",
                    family_replacement: "Nokia OSS Browser",
                    manufacturer: "Nokia"
                }, {
                    regex: "(S40OviBrowser)/(\\d+)\\.(\\d+)\\.(\\d+)\\.(\\d+)",
                    family_replacement: "Nokia Series 40 Ovi Browser",
                    manufacturer: "Nokia"
                }, {
                    regex: "(Nokia)[EN]?(\\d+)",
                    manufacturer: "Nokia"
                }, {
                    regex: "(PlayBook).+RIM Tablet OS (\\d+)\\.(\\d+)\\.(\\d+)",
                    family_replacement: "Blackberry WebKit",
                    tablet: true,
                    manufacturer: "Nokia"
                }, {
                    regex: "(Black[bB]erry).+Version/(\\d+)\\.(\\d+)\\.(\\d+)",
                    family_replacement: "Blackberry WebKit",
                    manufacturer: "RIM"
                }, {
                    regex: "(Black[bB]erry)\\s?(\\d+)",
                    family_replacement: "Blackberry",
                    manufacturer: "RIM"
                }, {
                    regex: "(OmniWeb)/v(\\d+)\\.(\\d+)",
                    other: true
                }, {
                    regex: "(Blazer)/(\\d+)\\.(\\d+)",
                    family_replacement: "Palm Blazer",
                    manufacturer: "Palm"
                }, {
                    regex: "(Pre)/(\\d+)\\.(\\d+)",
                    family_replacement: "Palm Pre",
                    manufacturer: "Palm"
                }, {
                    regex: "(Links) \\((\\d+)\\.(\\d+)",
                    other: true
                }, {
                    regex: "(QtWeb) Internet Browser/(\\d+)\\.(\\d+)",
                    other: true
                }, {
                    regex: "(Silk)/(\\d+)\\.(\\d+)(?:\\.([0-9\\-]+))?",
                    other: true,
                    tablet: true
                }, {
                    regex: "(AppleWebKit)/(\\d+)\\.?(\\d+)?\\+ .* Version/\\d+\\.\\d+.\\d+ Safari/",
                    family_replacement: "WebKit Nightly"
                }, {
                    regex: "(Version)/(\\d+)\\.(\\d+)(?:\\.(\\d+))?.*Safari/",
                    family_replacement: "Safari"
                }, {
                    regex: "(Safari)/\\d+"
                }, {
                    regex: "(OLPC)/Update(\\d+)\\.(\\d+)",
                    other: true
                }, {
                    regex: "(OLPC)/Update()\\.(\\d+)",
                    v1_replacement: "0",
                    other: true
                }, {
                    regex: "(SEMC\\-Browser)/(\\d+)\\.(\\d+)",
                    other: true
                }, {
                    regex: "(Teleca)",
                    family_replacement: "Teleca Browser",
                    other: true
                }, {
                    regex: "Trident(.*)rv.(\\d+)\\.(\\d+)",
                    family_replacement: "IE"
                }, {
                    regex: "(MSIE) (\\d+)\\.(\\d+)",
                    family_replacement: "IE"
                }],
                os_parsers: [{
                    regex: "(Android) (\\d+)\\.(\\d+)(?:[.\\-]([a-z0-9]+))?"
                }, {
                    regex: "(Android)\\-(\\d+)\\.(\\d+)(?:[.\\-]([a-z0-9]+))?"
                }, {
                    regex: "(Android) Donut",
                    os_v2_replacement: "2",
                    os_v1_replacement: "1"
                }, {
                    regex: "(Android) Eclair",
                    os_v2_replacement: "1",
                    os_v1_replacement: "2"
                }, {
                    regex: "(Android) Froyo",
                    os_v2_replacement: "2",
                    os_v1_replacement: "2"
                }, {
                    regex: "(Android) Gingerbread",
                    os_v2_replacement: "3",
                    os_v1_replacement: "2"
                }, {
                    regex: "(Android) Honeycomb",
                    os_v1_replacement: "3"
                }, {
                    regex: "(Silk-Accelerated=[a-z]{4,5})",
                    os_replacement: "Android"
                }, {
                    regex: "(Windows Phone 6\\.5)"
                }, {
                    regex: "(Windows (?:NT 5\\.2|NT 5\\.1))",
                    os_replacement: "Windows XP"
                }, {
                    regex: "(XBLWP7)",
                    os_replacement: "Windows Phone OS"
                }, {
                    regex: "(Windows NT 6\\.1)",
                    os_replacement: "Windows 7"
                }, {
                    regex: "(Windows NT 6\\.0)",
                    os_replacement: "Windows Vista"
                }, {
                    regex: "(Windows 98|Windows XP|Windows ME|Windows 95|Windows CE|Windows 7|Windows NT 4\\.0|Windows Vista|Windows 2000)"
                }, {
                    regex: "(Windows NT 6\\.4|Windows NT 10\\.0)",
                    os_replacement: "Windows 10"
                }, {
                    regex: "(Windows NT 6\\.2)",
                    os_replacement: "Windows 8"
                }, {
                    regex: "(Windows Phone 8)",
                    os_replacement: "Windows Phone 8"
                }, {
                    regex: "(Windows NT 5\\.0)",
                    os_replacement: "Windows 2000"
                }, {
                    regex: "(Windows Phone OS) (\\d+)\\.(\\d+)"
                }, {
                    regex: "(Windows ?Mobile)",
                    os_replacement: "Windows Mobile"
                }, {
                    regex: "(WinNT4.0)",
                    os_replacement: "Windows NT 4.0"
                }, {
                    regex: "(Win98)",
                    os_replacement: "Windows 98"
                }, {
                    regex: "(Tizen)/(\\d+)\\.(\\d+)",
                    other: true
                }, {
                    regex: "(Mac OS X) (\\d+)[_.](\\d+)(?:[_.](\\d+))?",
                    manufacturer: "Apple"
                }, {
                    regex: "(?:PPC|Intel) (Mac OS X)",
                    manufacturer: "Apple"
                }, {
                    regex: "(CPU OS|iPhone OS) (\\d+)_(\\d+)(?:_(\\d+))?",
                    os_replacement: "iOS",
                    manufacturer: "Apple"
                }, {
                    regex: "(iPhone|iPad|iPod); Opera",
                    os_replacement: "iOS",
                    manufacturer: "Apple"
                }, {
                    regex: "(iPad); Opera",
                    tablet: true,
                    manufacturer: "Apple"
                }, {
                    regex: "(iPhone|iPad|iPod).*Mac OS X.*Version/(\\d+)\\.(\\d+)",
                    os_replacement: "iOS",
                    manufacturer: "Apple"
                }, {
                    regex: "(CrOS) [a-z0-9_]+ (\\d+)\\.(\\d+)(?:\\.(\\d+))?",
                    os_replacement: "Chrome OS"
                }, {
                    regex: "(Debian)-(\\d+)\\.(\\d+)\\.(\\d+)(?:\\.(\\d+))?",
                    other: true
                }, {
                    regex: "(Linux Mint)(?:/(\\d+))?",
                    other: true
                }, {
                    regex: "(Mandriva)(?: Linux)?/(\\d+)\\.(\\d+)\\.(\\d+)(?:\\.(\\d+))?",
                    other: true
                }, {
                    regex: "(Symbian[Oo][Ss])/(\\d+)\\.(\\d+)",
                    os_replacement: "Symbian OS"
                }, {
                    regex: "(Symbian/3).+NokiaBrowser/7\\.3",
                    os_replacement: "Symbian^3 Anna"
                }, {
                    regex: "(Symbian/3).+NokiaBrowser/7\\.4",
                    os_replacement: "Symbian^3 Belle"
                }, {
                    regex: "(Symbian/3)",
                    os_replacement: "Symbian^3"
                }, {
                    regex: "(Series 60|SymbOS|S60)",
                    os_replacement: "Symbian OS"
                }, {
                    regex: "(MeeGo)",
                    other: true
                }, {
                    regex: "Symbian [Oo][Ss]",
                    os_replacement: "Symbian OS"
                }, {
                    regex: "(Black[Bb]erry)[0-9a-z]+/(\\d+)\\.(\\d+)\\.(\\d+)(?:\\.(\\d+))?",
                    os_replacement: "BlackBerry OS",
                    manufacturer: "RIM"
                }, {
                    regex: "(Black[Bb]erry).+Version/(\\d+)\\.(\\d+)\\.(\\d+)(?:\\.(\\d+))?",
                    os_replacement: "BlackBerry OS",
                    manufacturer: "RIM"
                }, {
                    regex: "(RIM Tablet OS) (\\d+)\\.(\\d+)\\.(\\d+)",
                    os_replacement: "BlackBerry Tablet OS",
                    tablet: true,
                    manufacturer: "RIM"
                }, {
                    regex: "(Play[Bb]ook)",
                    os_replacement: "BlackBerry Tablet OS",
                    tablet: true,
                    manufacturer: "RIM"
                }, {
                    regex: "(Black[Bb]erry)",
                    os_replacement: "Blackberry OS",
                    manufacturer: "RIM"
                }, {
                    regex: "(webOS|hpwOS)/(\\d+)\\.(\\d+)(?:\\.(\\d+))?",
                    os_replacement: "webOS"
                }, {
                    regex: "(SUSE|Fedora|Red Hat|PCLinuxOS)/(\\d+)\\.(\\d+)\\.(\\d+)\\.(\\d+)",
                    other: true
                }, {
                    regex: "(SUSE|Fedora|Red Hat|Puppy|PCLinuxOS|CentOS)/(\\d+)\\.(\\d+)\\.(\\d+)",
                    other: true
                }, {
                    regex: "(Ubuntu|Kindle|Bada|Lubuntu|BackTrack|Red Hat|Slackware)/(\\d+)\\.(\\d+)"
                }, {
                    regex: "(Windows|OpenBSD|FreeBSD|NetBSD|Ubuntu|Kubuntu|Android|Arch Linux|CentOS|WeTab|Slackware)"
                }, {
                    regex: "(Linux|BSD)",
                    other: true
                }],
                mobile_os_families: ["Windows Phone 6.5", "Windows CE", "Symbian OS"],
                device_parsers: [{
                    regex: "HTC ([A-Z][a-z0-9]+) Build",
                    device_replacement: "HTC $1",
                    manufacturer: "HTC"
                }, {
                    regex: "HTC ([A-Z][a-z0-9 ]+) \\d+\\.\\d+\\.\\d+\\.\\d+",
                    device_replacement: "HTC $1",
                    manufacturer: "HTC"
                }, {
                    regex: "HTC_Touch_([A-Za-z0-9]+)",
                    device_replacement: "HTC Touch ($1)",
                    manufacturer: "HTC"
                }, {
                    regex: "USCCHTC(\\d+)",
                    device_replacement: "HTC $1 (US Cellular)",
                    manufacturer: "HTC"
                }, {
                    regex: "Sprint APA(9292)",
                    device_replacement: "HTC $1 (Sprint)",
                    manufacturer: "HTC"
                }, {
                    regex: "HTC ([A-Za-z0-9]+ [A-Z])",
                    device_replacement: "HTC $1",
                    manufacturer: "HTC"
                }, {
                    regex: "HTC-([A-Za-z0-9]+)",
                    device_replacement: "HTC $1",
                    manufacturer: "HTC"
                }, {
                    regex: "HTC_([A-Za-z0-9]+)",
                    device_replacement: "HTC $1",
                    manufacturer: "HTC"
                }, {
                    regex: "HTC ([A-Za-z0-9]+)",
                    device_replacement: "HTC $1",
                    manufacturer: "HTC"
                }, {
                    regex: "(ADR[A-Za-z0-9]+)",
                    device_replacement: "HTC $1",
                    manufacturer: "HTC"
                }, {
                    regex: "(HTC)",
                    manufacturer: "HTC"
                }, {
                    regex: "SonyEricsson([A-Za-z0-9]+)/",
                    device_replacement: "Ericsson $1",
                    other: true,
                    manufacturer: "Sony"
                }, {
                    regex: "Android[\\- ][\\d]+\\.[\\d]+\\; [A-Za-z]{2}\\-[A-Za-z]{2}\\; WOWMobile (.+) Build"
                }, {
                    regex: "Android[\\- ][\\d]+\\.[\\d]+\\.[\\d]+; [A-Za-z]{2}\\-[A-Za-z]{2}\\; (.+) Build"
                }, {
                    regex: "Android[\\- ][\\d]+\\.[\\d]+\\-update1\\; [A-Za-z]{2}\\-[A-Za-z]{2}\\; (.+) Build"
                }, {
                    regex: "Android[\\- ][\\d]+\\.[\\d]+\\; [A-Za-z]{2}\\-[A-Za-z]{2}\\; (.+) Build"
                }, {
                    regex: "Android[\\- ][\\d]+\\.[\\d]+\\.[\\d]+; (.+) Build"
                }, {
                    regex: "NokiaN([0-9]+)",
                    device_replacement: "Nokia N$1",
                    manufacturer: "Nokia"
                }, {
                    regex: "Nokia([A-Za-z0-9\\v-]+)",
                    device_replacement: "Nokia $1",
                    manufacturer: "Nokia"
                }, {
                    regex: "NOKIA ([A-Za-z0-9\\-]+)",
                    device_replacement: "Nokia $1",
                    manufacturer: "Nokia"
                }, {
                    regex: "Nokia ([A-Za-z0-9\\-]+)",
                    device_replacement: "Nokia $1",
                    manufacturer: "Nokia"
                }, {
                    regex: "Lumia ([A-Za-z0-9\\-]+)",
                    device_replacement: "Lumia $1",
                    manufacturer: "Nokia"
                }, {
                    regex: "Symbian",
                    device_replacement: "Nokia",
                    manufacturer: "Nokia"
                }, {
                    regex: "(PlayBook).+RIM Tablet OS",
                    device_replacement: "Blackberry Playbook",
                    tablet: true,
                    manufacturer: "RIM"
                }, {
                    regex: "(Black[Bb]erry [0-9]+);",
                    manufacturer: "RIM"
                }, {
                    regex: "Black[Bb]erry([0-9]+)",
                    device_replacement: "BlackBerry $1",
                    manufacturer: "RIM"
                }, {
                    regex: "(Pre)/(\\d+)\\.(\\d+)",
                    device_replacement: "Palm Pre",
                    manufacturer: "Palm"
                }, {
                    regex: "(Pixi)/(\\d+)\\.(\\d+)",
                    device_replacement: "Palm Pixi",
                    manufacturer: "Palm"
                }, {
                    regex: "(Touchpad)/(\\d+)\\.(\\d+)",
                    device_replacement: "HP Touchpad",
                    manufacturer: "HP"
                }, {
                    regex: "HPiPAQ([A-Za-z0-9]+)/(\\d+).(\\d+)",
                    device_replacement: "HP iPAQ $1",
                    manufacturer: "HP"
                }, {
                    regex: "Palm([A-Za-z0-9]+)",
                    device_replacement: "Palm $1",
                    manufacturer: "Palm"
                }, {
                    regex: "Treo([A-Za-z0-9]+)",
                    device_replacement: "Palm Treo $1",
                    manufacturer: "Palm"
                }, {
                    regex: "webOS.*(P160UNA)/(\\d+).(\\d+)",
                    device_replacement: "HP Veer",
                    manufacturer: "HP"
                }, {
                    regex: "(Kindle Fire)",
                    manufacturer: "Amazon"
                }, {
                    regex: "(Kindle)",
                    manufacturer: "Amazon"
                }, {
                    regex: "(Silk)/(\\d+)\\.(\\d+)(?:\\.([0-9\\-]+))?",
                    device_replacement: "Kindle Fire",
                    tablet: true,
                    manufacturer: "Amazon"
                }, {
                    regex: "(iPad) Simulator;",
                    manufacturer: "Apple"
                }, {
                    regex: "(iPad);",
                    manufacturer: "Apple"
                }, {
                    regex: "(iPod);",
                    manufacturer: "Apple"
                }, {
                    regex: "(iPhone) Simulator;",
                    manufacturer: "Apple"
                }, {
                    regex: "(iPhone);",
                    manufacturer: "Apple"
                }, {
                    regex: "Nexus\\ ([A-Za-z0-9\\-]+)",
                    device_replacement: "Nexus $1"
                }, {
                    regex: "acer_([A-Za-z0-9]+)_",
                    device_replacement: "Acer $1",
                    manufacturer: "Acer"
                }, {
                    regex: "acer_([A-Za-z0-9]+)_",
                    device_replacement: "Acer $1",
                    manufacturer: "Acer"
                }, {
                    regex: "Amoi\\-([A-Za-z0-9]+)",
                    device_replacement: "Amoi $1",
                    other: true,
                    manufacturer: "Amoi"
                }, {
                    regex: "AMOI\\-([A-Za-z0-9]+)",
                    device_replacement: "Amoi $1",
                    other: true,
                    manufacturer: "Amoi"
                }, {
                    regex: "Asus\\-([A-Za-z0-9]+)",
                    device_replacement: "Asus $1",
                    manufacturer: "Asus"
                }, {
                    regex: "ASUS\\-([A-Za-z0-9]+)",
                    device_replacement: "Asus $1",
                    manufacturer: "Asus"
                }, {
                    regex: "BIRD\\-([A-Za-z0-9]+)",
                    device_replacement: "Bird $1",
                    other: true
                }, {
                    regex: "BIRD\\.([A-Za-z0-9]+)",
                    device_replacement: "Bird $1",
                    other: true
                }, {
                    regex: "BIRD ([A-Za-z0-9]+)",
                    device_replacement: "Bird $1",
                    other: true
                }, {
                    regex: "Dell ([A-Za-z0-9]+)",
                    device_replacement: "Dell $1",
                    manufacturer: "Dell"
                }, {
                    regex: "DoCoMo/2\\.0 ([A-Za-z0-9]+)",
                    device_replacement: "DoCoMo $1",
                    other: true
                }, {
                    regex: "([A-Za-z0-9]+)\\_W\\;FOMA",
                    device_replacement: "DoCoMo $1",
                    other: true
                }, {
                    regex: "([A-Za-z0-9]+)\\;FOMA",
                    device_replacement: "DoCoMo $1",
                    other: true
                }, {
                    regex: "vodafone([A-Za-z0-9]+)",
                    device_replacement: "Huawei Vodafone $1",
                    other: true
                }, {
                    regex: "i\\-mate ([A-Za-z0-9]+)",
                    device_replacement: "i-mate $1",
                    other: true
                }, {
                    regex: "Kyocera\\-([A-Za-z0-9]+)",
                    device_replacement: "Kyocera $1",
                    other: true
                }, {
                    regex: "KWC\\-([A-Za-z0-9]+)",
                    device_replacement: "Kyocera $1",
                    other: true
                }, {
                    regex: "Lenovo\\-([A-Za-z0-9]+)",
                    device_replacement: "Lenovo $1",
                    manufacturer: "Lenovo"
                }, {
                    regex: "Lenovo\\_([A-Za-z0-9]+)",
                    device_replacement: "Lenovo $1",
                    manufacturer: "Levovo"
                }, {
                    regex: "LG/([A-Za-z0-9]+)",
                    device_replacement: "LG $1",
                    manufacturer: "LG"
                }, {
                    regex: "LG-LG([A-Za-z0-9]+)",
                    device_replacement: "LG $1",
                    manufacturer: "LG"
                }, {
                    regex: "LGE-LG([A-Za-z0-9]+)",
                    device_replacement: "LG $1",
                    manufacturer: "LG"
                }, {
                    regex: "LGE VX([A-Za-z0-9]+)",
                    device_replacement: "LG $1",
                    manufacturer: "LG"
                }, {
                    regex: "LG ([A-Za-z0-9]+)",
                    device_replacement: "LG $1",
                    manufacturer: "LG"
                }, {
                    regex: "LGE LG\\-AX([A-Za-z0-9]+)",
                    device_replacement: "LG $1",
                    manufacturer: "LG"
                }, {
                    regex: "LG\\-([A-Za-z0-9]+)",
                    device_replacement: "LG $1",
                    manufacturer: "LG"
                }, {
                    regex: "LGE\\-([A-Za-z0-9]+)",
                    device_replacement: "LG $1",
                    manufacturer: "LG"
                }, {
                    regex: "LG([A-Za-z0-9]+)",
                    device_replacement: "LG $1",
                    manufacturer: "LG"
                }, {
                    regex: "(KIN)\\.One (\\d+)\\.(\\d+)",
                    device_replacement: "Microsoft $1"
                }, {
                    regex: "(KIN)\\.Two (\\d+)\\.(\\d+)",
                    device_replacement: "Microsoft $1"
                }, {
                    regex: "(Motorola)\\-([A-Za-z0-9]+)",
                    manufacturer: "Motorola"
                }, {
                    regex: "MOTO\\-([A-Za-z0-9]+)",
                    device_replacement: "Motorola $1",
                    manufacturer: "Motorola"
                }, {
                    regex: "MOT\\-([A-Za-z0-9]+)",
                    device_replacement: "Motorola $1",
                    manufacturer: "Motorola"
                }, {
                    regex: "Philips([A-Za-z0-9]+)",
                    device_replacement: "Philips $1",
                    manufacturer: "Philips"
                }, {
                    regex: "Philips ([A-Za-z0-9]+)",
                    device_replacement: "Philips $1",
                    manufacturer: "Philips"
                }, {
                    regex: "SAMSUNG-([A-Za-z0-9\\-]+)",
                    device_replacement: "Samsung $1",
                    manufacturer: "Samsung"
                }, {
                    regex: "SAMSUNG\\; ([A-Za-z0-9\\-]+)",
                    device_replacement: "Samsung $1",
                    manufacturer: "Samsung"
                }, {
                    regex: "Softbank/1\\.0/([A-Za-z0-9]+)",
                    device_replacement: "Softbank $1",
                    other: true
                }, {
                    regex: "Softbank/2\\.0/([A-Za-z0-9]+)",
                    device_replacement: "Softbank $1",
                    other: true
                }, {
                    regex: "(hiptop|avantgo|plucker|xiino|blazer|elaine|up.browser|up.link|mmp|smartphone|midp|wap|vodafone|o2|pocket|mobile|pda)",
                    device_replacement: "Generic Smartphone"
                }, {
                    regex: "^(1207|3gso|4thp|501i|502i|503i|504i|505i|506i|6310|6590|770s|802s|a wa|acer|acs\\-|airn|alav|asus|attw|au\\-m|aur |aus |abac|acoo|aiko|alco|alca|amoi|anex|anny|anyw|aptu|arch|argo|bell|bird|bw\\-n|bw\\-u|beck|benq|bilb|blac|c55/|cdm\\-|chtm|capi|comp|cond|craw|dall|dbte|dc\\-s|dica|ds\\-d|ds12|dait|devi|dmob|doco|dopo|el49|erk0|esl8|ez40|ez60|ez70|ezos|ezze|elai|emul|eric|ezwa|fake|fly\\-|fly\\_|g\\-mo|g1 u|g560|gf\\-5|grun|gene|go.w|good|grad|hcit|hd\\-m|hd\\-p|hd\\-t|hei\\-|hp i|hpip|hs\\-c|htc |htc\\-|htca|htcg)",
                    device_replacement: "Generic Feature Phone"
                }, {
                    regex: "^(htcp|htcs|htct|htc\\_|haie|hita|huaw|hutc|i\\-20|i\\-go|i\\-ma|i230|iac|iac\\-|iac/|ig01|im1k|inno|iris|jata|java|kddi|kgt|kgt/|kpt |kwc\\-|klon|lexi|lg g|lg\\-a|lg\\-b|lg\\-c|lg\\-d|lg\\-f|lg\\-g|lg\\-k|lg\\-l|lg\\-m|lg\\-o|lg\\-p|lg\\-s|lg\\-t|lg\\-u|lg\\-w|lg/k|lg/l|lg/u|lg50|lg54|lge\\-|lge/|lynx|leno|m1\\-w|m3ga|m50/|maui|mc01|mc21|mcca|medi|meri|mio8|mioa|mo01|mo02|mode|modo|mot |mot\\-|mt50|mtp1|mtv |mate|maxo|merc|mits|mobi|motv|mozz|n100|n101|n102|n202|n203|n300|n302|n500|n502|n505|n700|n701|n710|nec\\-|nem\\-|newg|neon)",
                    device_replacement: "Generic Feature Phone"
                }, {
                    regex: "^(netf|noki|nzph|o2 x|o2\\-x|opwv|owg1|opti|oran|ot\\-s|p800|pand|pg\\-1|pg\\-2|pg\\-3|pg\\-6|pg\\-8|pg\\-c|pg13|phil|pn\\-2|pt\\-g|palm|pana|pire|pock|pose|psio|qa\\-a|qc\\-2|qc\\-3|qc\\-5|qc\\-7|qc07|qc12|qc21|qc32|qc60|qci\\-|qwap|qtek|r380|r600|raks|rim9|rove|s55/|sage|sams|sc01|sch\\-|scp\\-|sdk/|se47|sec\\-|sec0|sec1|semc|sgh\\-|shar|sie\\-|sk\\-0|sl45|slid|smb3|smt5|sp01|sph\\-|spv |spv\\-|sy01|samm|sany|sava|scoo|send|siem|smar|smit|soft|sony|t\\-mo|t218|t250|t600|t610|t618|tcl\\-|tdg\\-|telm|tim\\-|ts70|tsm\\-|tsm3|tsm5|tx\\-9|tagt)",
                    device_replacement: "Generic Feature Phone"
                }, {
                    regex: "^(talk|teli|topl|tosh|up.b|upg1|utst|v400|v750|veri|vk\\-v|vk40|vk50|vk52|vk53|vm40|vx98|virg|vite|voda|vulc|w3c |w3c\\-|wapj|wapp|wapu|wapm|wig |wapi|wapr|wapv|wapy|wapa|waps|wapt|winc|winw|wonu|x700|xda2|xdag|yas\\-|your|zte\\-|zeto|aste|audi|avan|blaz|brew|brvw|bumb|ccwa|cell|cldc|cmd\\-|dang|eml2|fetc|hipt|http|ibro|idea|ikom|ipaq|jbro|jemu|jigs|keji|kyoc|kyok|libw|m\\-cr|midp|mmef|moto|mwbp|mywa|newt|nok6|o2im|pant|pdxg|play|pluc|port|prox|rozo|sama|seri|smal|symb|treo|upsi|vx52|vx53|vx60|vx61|vx70|vx80|vx81|vx83|vx85|wap\\-|webc|whit|wmlb|xda\\-|xda\\_)",
                    device_replacement: "Generic Feature Phone"
                }, {
                    regex: "(bot|borg|google(^tv)|yahoo|slurp|msnbot|msrbot|openbot|archiver|netresearch|lycos|scooter|altavista|teoma|gigabot|baiduspider|blitzbot|oegp|charlotte|furlbot|http%20client|polybot|htdig|ichiro|mogimogi|larbin|pompos|scrubby|searchsight|seekbot|semanticdiscovery|silk|snappy|speedy|spider|voila|vortex|voyager|zao|zeal|fast\\-webcrawler|converacrawler|dataparksearch|findlinks)",
                    device_replacement: "Spider"
                }],
                mobile_browser_families: ["Firefox Mobile", "Opera Mobile", "Opera Mini", "Mobile Safari", "webOS", "IE Mobile", "Playstation Portable", "Nokia", "Blackberry", "Palm", "Silk", "Android", "Maemo", "Obigo", "Netfront", "AvantGo", "Teleca", "SEMC-Browser", "Bolt", "Iris", "UP.Browser", "Symphony", "Minimo", "Bunjaloo", "Jasmine", "Dolfin", "Polaris", "BREW", "Chrome Mobile", "Chrome Mobile iOS", "UC Browser", "Tizen Browser"]
            };
            // Parsers
            _this.parsers = ["device_parsers", "browser_parsers", "os_parsers", "mobile_os_families", "mobile_browser_families"];
            // Types
            _this.types = ["browser", "os", "device"];
            // Regular Expressions
            _this.regexes = regexes || function() {
                    var results = {};
                    _this.parsers.map(function(parser) {
                        results[parser] = [];
                    });
                    return results;
                }();
            // Families
            _this.families = function() {
                var results = {};
                _this.types.map(function(type) {
                    results[type] = [];
                });
                return results;
            }();
            // Utility Variables
            var ArrayProto = Array.prototype,
                ObjProto = Object.prototype,
                FuncProto = Function.prototype,
                nativeForEach = ArrayProto.forEach,
                nativeIndexOf = ArrayProto.indexOf;
            // Find Utility
            var find = function(ua, obj) {
                var ret = {};
                for (var i = 0; i < obj.length; i++) {
                    ret = obj[i](ua);
                    if (ret) {
                        break;
                    }
                }
                return ret;
            };
            // Remove Utility
            var remove = function(arr, props) {
                each(arr, function(obj) {
                    each(props, function(prop) {
                        delete obj[prop];
                    });
                });
            };
            // Contains Utility
            var contains = function(obj, target) {
                var found = false;
                if (obj == null) return found;
                if (nativeIndexOf && obj.indexOf === nativeIndexOf) return obj.indexOf(target) != -1;
                found = any(obj, function(value) {
                    return value === target;
                });
                return found;
            };
            // Each Utility
            var each = forEach = function(obj, iterator, context) {
                if (obj == null) return;
                if (nativeForEach && obj.forEach === nativeForEach) {
                    obj.forEach(iterator, context);
                } else if (obj.length === +obj.length) {
                    for (var i = 0, l = obj.length; i < l; i++) {
                        iterator.call(context, obj[i], i, obj);
                    }
                } else {
                    for (var key in obj) {
                        if (_.has(obj, key)) {
                            iterator.call(context, obj[key], key, obj);
                        }
                    }
                }
            };
            // Extend Utiltiy
            var extend = function(obj) {
                each(slice.call(arguments, 1), function(source) {
                    for (var prop in source) {
                        obj[prop] = source[prop];
                    }
                });
                return obj;
            };
            // Check String Utility
            var check = function(str) {
                return !!(str && typeof str != "undefined" && str != null);
            };
            // To Version String Utility
            var toVersionString = function(obj) {
                var output = "";
                obj = obj || {};
                if (check(obj)) {
                    if (check(obj.major)) {
                        output += obj.major;
                        if (check(obj.minor)) {
                            output += "." + obj.minor;
                            if (check(obj.patch)) {
                                output += "." + obj.patch;
                            }
                        }
                    }
                }
                return output;
            };
            // To String Utility
            var toString = function(obj) {
                obj = obj || {};
                var suffix = toVersionString(obj);
                if (suffix) suffix = " " + suffix;
                return obj && check(obj.family) ? obj.family + suffix : "";
            };
            // Parse User-Agent String
            _this.parse = function(ua) {
                // Parsers Utility
                var parsers = function(type) {
                    return _this.regexes[type + "_parsers"].map(function(obj) {
                        var regexp = new RegExp(obj.regex),
                            rep = obj[(type === "browser" ? "family" : type) + "_replacement"],
                            major_rep = obj.major_version_replacement;

                        function parser(ua) {
                            var m = ua.match(regexp);
                            if (!m) return null;
                            var ret = {};
                            ret.family = (rep ? rep.replace("$1", m[1]) : m[1]) || "other";
                            ret.major = parseInt(major_rep ? major_rep : m[2]) || null;
                            ret.minor = m[3] ? parseInt(m[3]) : null;
                            ret.patch = m[4] ? parseInt(m[4]) : null;
                            ret.tablet = obj.tablet;
                            ret.man = obj.manufacturer || null;
                            return ret;
                        }
                        return parser;
                    });
                };
                // User Agent
                var UserAgent = function() {};
                // Browsers Parsed
                var browser_parsers = parsers("browser");
                // Operating Systems Parsed
                var os_parsers = parsers("os");
                // Devices Parsed
                var device_parsers = parsers("device");
                // Set Agent
                var a = new UserAgent();
                // Remember the original user agent string
                a.source = ua;
                // Set Browser
                a.browser = find(ua, browser_parsers);
                if (check(a.browser)) {
                    a.browser.name = toString(a.browser);
                    a.browser.version = toVersionString(a.browser);
                } else {
                    a.browser = {};
                }
                // Set OS
                a.os = find(ua, os_parsers);
                if (check(a.os)) {
                    a.os.name = toString(a.os);
                    a.os.version = toVersionString(a.os);
                } else {
                    a.os = {};
                }
                // Set Device
                a.device = find(ua, device_parsers);
                if (check(a.device)) {
                    a.device.name = toString(a.device);
                    a.device.version = toVersionString(a.device);
                } else {
                    a.device = {
                        tablet: false,
                        family: "Other"
                    };
                }
                // Determine Device Type
                var mobile_agents = {};
                var mobile_browser_families = _this.regexes.mobile_browser_families.map(function(str) {
                    mobile_agents[str] = true;
                });
                var mobile_os_families = _this.regexes.mobile_os_families.map(function(str) {
                    mobile_agents[str] = true;
                });
                // Is Spider
                if (a.browser.family === "Spider") {
                    a.device.type = "Spider";
                } else if (a.browser.tablet || a.os.tablet || a.device.tablet) {
                    a.device.type = "Tablet";
                } else if (mobile_agents.hasOwnProperty(a.browser.family)) {
                    a.device.type = "Mobile";
                } else {
                    a.device.type = "Desktop";
                }
                // Determine Device Manufacturer
                a.device.manufacturer = a.browser.man || a.os.man || a.device.man || null;
                // Cleanup Objects
                remove([a.browser, a.os, a.device], ["tablet", "man"]);
                // Return Agent
                return a;
            };
            // Return context
            return _this;
        }();
        // Export the Underscore object for **Node.js** and **"CommonJS"**,
        // backwards-compatibility for the old `require()` API. If we're not
        // CommonJS, add `_` to the global object via a string identifier
        // the Closure Compiler "advanced" mode. Registration as an AMD
        // via define() happens at the end of this file
        if (typeof exports !== "undefined") {
            if (typeof module !== "undefined" && module.exports) {
                exports = module.exports = detect;
            }
            exports.detect = detect;
        }
    })(window);
},{}],6:[function(require,module,exports){
    var zhCh = require("./locale/zh-cn.json");
    var en = require("./locale/en.json");
    var list = ['zh-cn', 'en'];

    function LanguageFactory(global) {
        var lan = global.urlParams.lan || 'zh-cn';
        var flag = false;
        for (var i = 0; i < list.length; i++) {
            if (list[i] == lan) {
                flag = true;
                break;
            }
        }
        if (!flag) {
            lan = 'zh-cn';
        }
        switch (lan) {
            case 'zh-cn':
                return zhCh;
                break;
            case 'en':
                return en;
                break;
        }
    };

    module.exports = LanguageFactory;

},{"./locale/en.json":7,"./locale/zh-cn.json":8}],7:[function(require,module,exports){
    module.exports={
        "html": {
            "HTML_MSG00": "Back",
            "HTML_MSG01": "Load more record",
            "HTML_MSG02": "Manual",
            "HTML_MSG03": "Send",
            "HTML_MSG04": "Photos",
            "HTML_MSG05": "Feedback",
            "HTML_MSG06": "Feedback",
            "HTML_MSG07": "Continue",
            "HTML_MSG08": "Submit",
            "HTML_MSG09": "The email has been sent successfully",
            "HTML_MSG010": "The team will contact you soon",
            "HTML_MSG011": "OK",
            "HTML_MSG0112": "Load more record",
            "HTML_MSG0113": "Manual",
            "HTML_MSG0114": "Send",
            "HTML_MSG0115": "Feedback",
            "HTML_MSG0116": "Continue",
            "HTML_MSG0117": "Email",
            "HTML_MSG0118": "Tel"
        },
        "system": {
            "L10001": "Sorry, the team is not in service right now ",
            "L10002": "{0} is at your service ",
            "L10003": "Conversation has ended temporarily,{0} ",
            "L10004": "Please wait, there are {0} people in need of service before you ",
            "L10005": "You haven't been talking for long time ",
            "L10006": "<a href=\"javascript: window.location.reload();\">Continue</a> ",
            "L10007": "Conversation with {0} has been ended temporarily {1} ",
            "L10008": "Conversation with {0} has been ended temporarily {1} ",
            "L10009": "Conversation with {0} has been ended temporarily ",
            "L10010": "Conversation has been ended temporarily.{0} ",
            "L10011": "{0} You have opened a new window {1}",
            "L10012": "No more record",
            "L10013": "Sorry, the team is not in service right now ",
            "L10014": "Image size can not exceed 5M",
            "L10015": "This file type is not supported",
            "L10016": "Loading...",
            "L10017": "Loading...",
            "L10018": "Load more record",
            "L10019": "{0} is at your service",
            "L10020": "{0} is typing",
            "L10021": "Conversation with {0} has been ended temporarily",
            "L10022": "{0} You can also get replies by<a href=\"javascript: void(0);\" id=\"systemMsgLeaveMessage\"> email </a>",
            "L10023": "{0} <span  id=\"systemMsgLeaveMsg\">Please wait...</span>",
            "L10024": "You can also get replies by <a class=\"leave-msg-btn\" href=\"{0}\" data-href=\"{1}\"> email </a>",
            "L10025": "Service Unavailable",
            "L10026": "Waiting",
            "L10027": "Sorry, the team is not in service right now",
            "L10028": "Conversation with {0} has been ended temporarily",
            "L10029": "You haven't been talking for long time",
            "L10030": "You've opened a new window",
            "L10031": "Conversation has been ended temporarily",
            "L10032": "Please try to describe your problem in other ways",
            "L10033": "This file type is not supported",
            "L10034": "Image size can not exceed 5M",
            "L10035": "Please try another browser",
            "L10036": "Sending...",
            "L10037": "Thank you",
            "L10038": "Failure, please try again",
            "L10039": " You can also get replies by<a class=\"leave-msg-btn js-leaveMessage\" href=\"javascript:void(0);\" > email </a>"
        },
        "text": {
            "T0000": "Cancel",
            "T0001": "OK",
            "T0002": "Load more record",
            "T0003": "Loading��������",
            "T0004": "No more record",
            "T0005": "Yes",
            "T0006": "No",
            "T0010": "What do you need?",
            "T0011": "Today",
            "T0012": "Customer Support_",
            "T0013": "Yesterday",
            "T0020": "Customer Service is typing",
            "T0021": "Are you satisfied with our service?",
            "T0022": "Are you satisfied with our service?",
            "T0023": "Send a massage",
            "T0024": "Please wait...",
            "T0025": "We've received your feedback",
            "T0026": "You need to ask questions before feedback",
            "T0027": "What is the problem?",
            "T0028": "Tell us your suggestion",
            "T0029": "Submit",
            "T0030": "Email",
            "T0031": "Sending������",
            "T0032": "Thank you",
            "T0033": "Failure, please try again",
            "T0034": "Email@domain.com (required)",
            "T0035": "Email doesn't look quite right",
            "T0036": "Email doesn't look quite right",
            "T0037": "The description is needed",
            "T0038": "Continue",
            "T0039": "Submit email",
            "T0040": "Email",
            "T0041": "Yes",
            "T0042": "No",
            "T0043": "Feedback",
            "T0044": "Tel",
            "T0045": "tel is not correct",
            "T0046": " (required)",
            "T0047": "",
            "T0048": "Send a massage",
            "T0049": "qq Face",
            "T0050": "upload",
            "T0051": "Email",
            "T0052": "Feedback",
            "T0053": "Email@domain.com (required)",
            "T0054": "telphone(required)",
            "T0055": "telphone(optional)",
            "T0056": "The email has been sent successfully",
            "T0057": "Powered by Sobot",
            "T0058": " new messages",
            "T0059": "new messages",
            "T0060": "Manual",
            "T0061": "Company:",
            "T0062": "Email:",
            "T0063": "serviceNo:",
            "T0064": "Name:",
            "T0065": "Remark:",
            "T0066": "Tel:",
            "T0067": "phone:",
            "T0068": "open",
            "T0069": "close",
            "T0070": "Thank You",
            "T0071": "Sorry",
            "T0072": "Session end",
            "T0073": "Error",
            "T0074": "Already evaluated",
            "T0075": "Upload Error",
            "T0076": "Please Upload Files",
            "T0077": "Maximum upload file size",
            "T0078": "Upload file is not supported",
            "T0079": "Image size can not exceed 5M",
            "T0080": "Please Upload Image",
            "T0081": "This file type is not supported",
            "T0082": "file size can not exceed 20M",
            "T0083": "upload...",
            "T0084": "upload failed",
            "T0085": "upload attachments",
            "T0086": "Maximum upload 5",
            "T0087": "Confirm closing?",
            "T0088": "Ignore upload failed files?",
            "T0089": "Continue",
            "T0090": "Uploading",
            "T0091": "Ignore upload failed Images?",
            "T0092": "Email@domain.com(optional)",
            "T0093": "Feedback",
            "T0094": "Tell us about your problems?",
            "T0095": "Submit",
            "T0096": "Feedback",
            "T0097": "Not evaluate",
            "T0098": "Whether to solve the problem?",
            "T0099": "title",
            "T0100": "abstract",
            "T0101": "label",
            "T0102": "url",
            "T0103": "Please rate the service",
            "T0104": "Please choose tag",
            "T0105": "evaluate can't be blank",
            "T0106": "Has your question been resolved?",
            "T0107":"Your evaluation will make us do better",
            "T0108":"Please Fill ",
            "T0109":"Types",
            "T0110":"Problem Description",
            "T0111":"close",
            "T0112":"Return",
            "T0113":"Choose minutes",
            "T0114":"Choose hours",
            "T0115":"hours",
            "T0116":"minutes",
            "T0117":"Please fill in the description of the problem",
            "T0118":"Select",
            "T0119":"Customer is typing"

        }
    }

},{}],8:[function(require,module,exports){
    module.exports={
        "html": {
            "HTML_MSG00": "����",
            "HTML_MSG01": "������ʾ����",
            "HTML_MSG02": "ת�˹�",
            "HTML_MSG03": " �� �� ",
            "HTML_MSG04": "ͼƬ",
            "HTML_MSG05": "����",
            "HTML_MSG06": "���������",
            "HTML_MSG07": "�»Ự",
            "HTML_MSG08": "�ύ",
            "HTML_MSG09": "���Գɹ�",
            "HTML_MSG010": "���ǽ��ܿ���ϵ��",
            "HTML_MSG011": "�õ�",
            "HTML_MSG0112": "���������ʷ��¼",
            "HTML_MSG0113": "ת�˹�����",
            "HTML_MSG0114": "����",
            "HTML_MSG0115": "�����",
            "HTML_MSG0116": "�����Ự",
            "HTML_MSG0117": "����",
            "HTML_MSG0118": "�ֻ�"
        },
        "system": {
            "L10001": "��ʱ�޷�ת���˹��ͷ�",
            "L10002": "����,�ͷ�{0}��������������",
            "L10003": "���Ѿ���������Ͽ�����,{0}",
            "L10004": "�Ŷ��У����ڶ����еĵ�{0}��",
            "L10005": "����˼������������������ʱ����Ŷ",
            "L10006": "<a href=\"javascript: window.location.reload();\">���½���</a>",
            "L10007": "{0}�����뿪��{1}",
            "L10008": "����{0}�ĻỰ�ѽ���{1}",
            "L10009": "{0}�����˱��λỰ",
            "L10010": "����ʱ��û��˵�������λỰ�ѽ�����{0}",
            "L10011": "{0}���Ѵ������촰��{1}",
            "L10012": "û�и����¼",
            "L10013": "��Ǹ�����޷��������߿ͷ�",
            "L10014": "ͼƬ����",
            "L10015": "��ʽ��֧��",
            "L10016": "���ڼ���...",
            "L10017": "���ڼ���...",
            "L10018": "������ʾ����",
            "L10019": "�ͷ�{0}�����˻Ự",
            "L10020": "{0}��������",
            "L10021": "���λỰ����{0}",
            "L10022": "{0} ������<a href=\"javascript: void(0);\" id=\"systemMsgLeaveMessage\"> ���� </a>",
            "L10023": "{0} <span  id=\"systemMsgLeaveMsg\">��ȴ�</span>",
            "L10024": "������<a class=\"leave-msg-btn\" href=\"#0\"  data-href=\"{1}\"> ���� </a>",
            "L10025": "���޿ͷ�����",
            "L10026": "�Ŷ���",
            "L10027": "�����˹��ͷ�����",
            "L10028": "����{0}�ĻỰ�Ѿ�����",
            "L10029": "���Ѿ��ܳ�ʱ��δ˵����Ӵ�������⾡����ѯ",
            "L10030": "���Ѵ��´��ڣ�ˢ�¿ɼ����Ự",
            "L10031": "���ѳ�ʱ��δ˵����ϵͳ�Զ��رձ��λỰ��ˢ�¿ɼ����Ự",
            "L10032": "�ǳ��Բ���Ŷ����֪����ô�ش���������أ��һ�Ŭ��ѧϰ�ġ�",
            "L10033": "���ϴ���ȷ��ͼƬ��ʽ",
            "L10034": "ͼƬ���ܴ���5M",
            "L10035": "��Ǹ�����������֧���ϴ�ͼƬ��",
            "L10036": "���ڷ��ͣ����Ժ�...",
            "L10037": "лл���ķ���",
            "L10038": "�ύʧ��!������",
            "L10039": " ������<a class=\"leave-msg-btn js-leaveMessage\" href=\"javascript:void(0);\" > ���� </a>"

        },
        "text": {
            "T0000": "ȡ��",
            "T0001": "ȷ��",
            "T0002": "�������ظ���",
            "T0003": "�����С�������",
            "T0004": "û�и���",
            "T0005": "��",
            "T0006": "��",
            "T0010": "ѡ��Ҫ��ѯ������",
            "T0011": "����",
            "T0012": "��ѯ�ͷ���",
            "T0013": "����",
            "T0020": "�ͷ��������롤����",
            "T0021": "�Ƿ������������⣿",
            "T0022": "�ͷ�����",
            "T0023": "���Ҫ������������",
            "T0024": "�Ŷ��У����Ժ󡤡�����",
            "T0025": "���������ѳɹ��ύ",
            "T0026": "��ѯ��������۷�������",
            "T0027": "����������Щ���⣺",
            "T0028": " ��ӭ�����Ƿ����Ὠ��~",
            "T0029": "�ύ����",
            "T0030": "����",
            "T0031": "���ڷ���",
            "T0032": "лл���ķ���",
            "T0033": "�ύʧ��!������",
            "T0034": "���� �����",
            "T0035": "����д����",
            "T0036": "�����ʽ����",
            "T0037": "����д����������",
            "T0038": "��ʼ��ѯ",
            "T0039": "�ύ����",
            "T0040": "��������",
            "T0041": "�ѽ��",
            "T0042": "δ���",
            "T0043": "����",
            "T0044": "�ֻ�",
            "T0045": "�ֻ��Ÿ�ʽ����ȷ",
            "T0046": "�����",
            "T0047": "��ѡ�",
            "T0048": "���Ҫ������������...",
            "T0049": "����",
            "T0050": "�ϴ��ļ�",
            "T0051": "����",
            "T0052": "�����",
            "T0053": "����",
            "T0054": "�ֻ�",
            "T0055": "�ֻ���ѡ�",
            "T0056": "���������ѳɹ��ύ",
            "T0057": "Powered by �ǳݿƼ�",
            "T0058": " ������Ϣ",
            "T0059": "����Ϊδ����Ϣ",
            "T0060": "ת�˹�����",
            "T0061": "��˾��",
            "T0062": "���䣺",
            "T0063": "���ţ�",
            "T0064": "������",
            "T0065": "��ע��",
            "T0066": "�ֻ���",
            "T0067": "�绰��",
            "T0068": "չ��",
            "T0069": "����",
            "T0070": "��л���ķ���",
            "T0071": "�ܱ�Ǹû�ܰﵽ��",
            "T0072": "�Ự�������޷�����",
            "T0073": "�ύʧ�����Ժ�����",
            "T0074": "�����۹��ô���",
            "T0075": "�ϴ�ʧ�ܣ�",
            "T0076": "���ϴ�����!",
            "T0077": "�Ѵﵽ����ϴ���������",
            "T0078": "��֧���ϴ��˸�ʽ�ļ�,�����Խ��ļ����Ϊzip����rar��ʽ�ļ��ϴ�",
            "T0079": "ͼƬ��С���ܳ���5MB",
            "T0080": "���ϴ�ͼƬ",
            "T0081": "���ϴ���ȷ��ͼƬ��ʽ",
            "T0082": "�ļ���С���ܳ���20MB",
            "T0083": "�ϴ���...",
            "T0084": "�ϴ�ʧ��",
            "T0085": "�ϴ�����",
            "T0086": "����ϴ�5������",
            "T0087": "����������δ�ύ��ȷ�Ϲرգ�",
            "T0088": "�ύ���Զ������ϴ�ʧ�ܵĸ���",
            "T0089": "��Ȼ�ύ",
            "T0090": "���ļ������ϴ����޷��ύ",
            "T0091": "�ύ���Զ������ϴ�ʧ�ܵ�ͼƬ",
            "T0092": "���䣨ѡ�",
            "T0093": "�������Ա��η����������",
            "T0094": "�������������������⣿",
            "T0095": "�ύ",
            "T0096": "�����Ա��η����������",
            "T0097": "�ݲ�����",
            "T0098": "�Ƿ������������⣿",
            "T0099": "����",
            "T0100": "ժҪ",
            "T0101": "��ǩ",
            "T0102": "����",
            "T0103": "�����Ա��η����������",
            "T0104":"������ѡ��һ����ǩ",
            "T0105":"����д��������",
            "T0106":"�Ƿ������������⣿",
            "T0107":"�������ۻ����������ø���",
            "T0108":"����д",
            "T0109":"��������",
            "T0110":"��������",
            "T0111":"�ر�",
            "T0112":"��һ��",
            "T0113":"ѡ�����",
            "T0114":"ѡ��Сʱ",
            "T0115":"ʱ",
            "T0116":"��",
            "T0117":"����д�������ͣ�",
            "T0118":"��ѡ��",
            "T0119": "�������롤����"












        }

    }

},{}],9:[function(require,module,exports){
    var that = {};

    var state;
    var listener = require('../util/listener.js');
    that.setCurrentState = function(s) {
        state = s;
        listener.trigger("core.statechange", state);
    };

    that.getCurrentState = function() {
        return state;
    };

    module.exports = that;
},{"../util/listener.js":29}],10:[function(require,module,exports){
    /**
     * @author Treagzhao
     */
    var HumanFirst = function(global) {
        var listener = require("../util/listener.js");
        var Promise = require('../util/promise.js');
        var DateUtil = require('../util/date.js');
        var Robot = require('../socket/robot.js');
        var modeState = require('./currentState.js');
        var $ajax = require("../util/monitAjax.js")(global);
        var WebSocket = require('../socket/websocket.js');
        var Rolling = require('../socket/rolling.js');
        var transfer = require('./transfer.js');
        var initSession = require('./initsession.js');
        var socketFactory = require('../socket/socketfactory.js');
        var leaveMessageStr = global.apiConfig.leaveMsg;
        var language = global.language.lan;
        var queueing = false;
        var manager,
            tempManager;

        /**
         * �˹�����  ת�˹�ʧ�ܵ�����£���Ҫ��ʾ������������
         **/
        var initRobotGuide = function() {
            if (global.apiConfig.guideFlag && global.apiInit.ustatus != 1 && global.apiConfig.type != 2) { //��Ϊ�����˵�ʱ�����ж���������
                $.ajax({
                    type: "post",
                    url: '/chat/user/robotGuide.action',
                    dataType: "json",
                    data: {
                        uid: global.apiInit.uid,
                        robotFlag: global.urlParams.robotFlag || ""
                    },
                    success: function(ret) {
                        var date = ret.data.ts ? new Date(ret.data.ts) : new Date();
                        date = new Date(date.getTime() + 10 * 10000);
                        var dateStr = DateUtil.formatDate(date, true);
                        var msg = ret.data.answer || '';
                        // msg = msg + '<a href="https://www.baidu.com">�ٶ�</a>';
                        if (msg.indexOf('<a') >= 0) {
                            msg = msg.replace(/<a/g, '<a target="_blank"');
                        }
                        var dataList = [];
                        dataList.push({
                            'type': "robot",
                            'answerType': "welcome-sugguestions",
                            "date": dateStr,
                            'content': [{
                                'senderName': global.apiConfig.robotName,
                                'senderType': 3, //3��ӭ��֧����������
                                'msg': msg,
                                'stripe': "",
                                /*ret.data.stripe*/
                                'list': ret.data.suggestions,
                                'ts': dateStr
                            }]
                        });
                        listener.trigger("core.initsession", dataList);
                    }
                });
            }
        };

        var initHumanSession = function(value, ret, word) {
            var success = !!word;
            var face = (!!word) ? ret.aface : global.apiConfig.robotLogo;
            var name = (!!word) ? ret.aname : global.apiConfig.robotName;
            var word = word || global.urlParams.robotHelloWord;
            var curStatus = global.apiInit.ustatus == -2 ? 1 : 0;
            //-2Ϊ�Ŷ���
            if (!value) {
                value = [];
            }
            var now = new Date();
            var obj = {
                "date": DateUtil.formatDate(now),
                "content": [{
                    // 'senderType' : (!!word) ? 2 : 1,
                    'senderType': curStatus ? 1 : (!!word) ? 2 : 1,
                    't': +now,
                    'msg': word,
                    'ts': DateUtil.formatDate(now, true),
                    'senderFace': face,
                    'senderName': name
                }]
            };
            modeState.setCurrentState("human");
            value.push(obj);
            setTimeout(function() {
                listener.trigger("core.initsession", value);
            }, 0);
        };

        var initRobotSession = function(value, promise) {
            if (!value) {
                value = [];
            }
            var now = new Date();
            var obj = {
                "date": DateUtil.formatDate(now),
                "content": [{
                    'senderType': 1,
                    't': +now,
                    'msg': global.urlParams.robotHelloWord,
                    'ts': DateUtil.formatDate(now, true),
                    'senderFace': global.apiConfig.robotLogo,
                    'senderName': global.apiConfig.robotName
                }]
            };
            if(global.apiInit.ustatus!=-1)
                value.push(obj);
            if (manager) {
                manager.destroy();
            }
            manager = new Robot(global);
            modeState.setCurrentState("robot");
            setTimeout(function() {
                listener.trigger("core.initsession", value);
            }, 0);
        };

        var transferFail = function(init, promise) {
            if (!init)
                return;
            var value = [];
            var now = new Date();
            var obj = {
                "date": DateUtil.formatDate(now),
                "content": [{
                    'senderType': 1,
                    't': +now,
                    'msg': global.urlParams.robotHelloWord,
                    'ts': DateUtil.formatDate(now, true),
                    'senderFace': global.apiConfig.robotLogo,
                    'senderName': global.apiConfig.robotName
                }]
            };
            modeState.setCurrentState("robot");
            if (manager) {
                manager.destroy();
            }
            manager = new Robot(global);
            initSession(global, promise, false).then(function(value) {
                value.push(obj);
                listener.trigger("core.initsession", value);
            });

        };

        var queueWait = function(ret, init, value) {
            var str = language['L10004'].replace("{0}", ret.count);
            queueing = true;
            if (init) {
                initRobotGuide();
                initHumanSession(value, ret, null);
                setTimeout(function() {
                    //msgflag,0������1�ر�
                    if (!global.urlParams.msgflag) {
                        ret.content = str + " " + leaveMessageStr;
                    } else {
                        ret.content = str;
                    }
                    if (ret.status == 7) {
                        ret.content = ret.msg;
                    };
                    listener.trigger("core.system", {
                        'type': 'system',
                        'status': 'queue',
                        'data': ret
                    });
                }, 1);
            } else {
                //msgflag,0������1�ر�
                if (!global.urlParams.msgflag) {
                    ret.content = str + " " + leaveMessageStr;
                } else {
                    ret.content = str;
                }
                if (ret.status == 7) {
                    ret.content = ret.msg;
                };
                listener.trigger("core.system", {
                    'type': 'system',
                    'status': 'queue',
                    'data': ret
                });
            }
            if (manager) {
                manager.destroy();
            }
            if (!tempManager && ret.status != 7) {
                tempManager = socketFactory(ret, global);
                tempManager.start();
            }
            manager = new Robot(global);
            modeState.setCurrentState("robot");
            if (ret.status != 7) {
                listener.trigger("core.sessionclose", -3);
            }
        };

        var onReceive = function(data) {
            var list = data.list || [];
            for (var i = 0,
                     len = list.length; i < len; i++) {
                var item = list[i];
                var ret = item;
                if (item.type === 200) {
                    if (manager && tempManager) {
                        manager.destroy();
                        manager = tempManager;
                        tempManager = null;
                    }
                    modeState.setCurrentState('human');
                    listener.trigger("core.system", {
                        'type': 'system',
                        'status': "transfer",
                        'data': {
                            'content': language['L10002'].replace("{0}", ret.aname)
                        }
                    });
                    if (ret.serviceInfo.adminHelloWord) {
                        global.urlParams.adminHelloWord = ret.serviceInfo.adminHelloWord;
                    }
                    ret.content = global.urlParams.adminHelloWord;
                    listener.trigger("core.system", {
                        'type': 'human',
                        'data': ret
                    });

                    listener.trigger("core.buttonchange", {
                        'type': 'transfer',
                        'action': 'hide'
                    });
                    break;
                }
            }
        };

        var serverOffline = function(ret, init, value) {
            listener.trigger("core.buttonchange", {
                'type': 'transfer',
                'action': 'show'
            });
            if (init) {
                initRobotGuide();
                initRobotSession(value, ret, null);
                setTimeout(function() {
                    //ret.content = global.apiConfig.adminNonelineTitle + leaveMessageStr;
                    //msgflag,0������1�ر�
                    if (!global.urlParams.msgflag) {
                        ret.content = global.urlParams.adminNonelineTitle + " " + leaveMessageStr;
                    } else {
                        ret.content = global.urlParams.adminNonelineTitle;
                    }
                    listener.trigger("core.system", {
                        'type': 'system',
                        'status': 'offline',
                        'data': ret
                    });
                }, 1);
            } else {
                if (manager) {
                    manager.destroy();
                }
                manager = new Robot(global);
                modeState.setCurrentState("robot");
                //msgflag,0������1�ر�
                if (!global.urlParams.msgflag) {
                    ret.content = global.urlParams.adminNonelineTitle + leaveMessageStr;
                } else {
                    ret.content = global.urlParams.adminNonelineTitle;
                }
                listener.trigger("core.system", {
                    'type': 'system',
                    'status': 'offline',
                    'data': ret
                });
            }
        };

        var blackListCallback = function(ret, init) {
            //ret.content = language['L10001'] + ' ' + leaveMessageStr;
            //msgflag,0������1�ر�
            if (!global.urlParams.msgflag) {
                ret.content = language['L10001'] + ' ' + leaveMessageStr;
            } else {
                ret.content = language['L10001'];
            }
            manager = new Robot(global);
            modeState.setCurrentState("robot");
            listener.trigger("core.system", {
                'type': 'system',
                'status': 'blacklist',
                'data': ret
            });
            if (init) {
                initRobotSession();
            }
        };

        var transferSuccess = function(groupId, promise, init) {
            var init = !!init;
            initSession(global, promise, true).then(function(value, promise) {
                var way;
                if (tempManager) {
                    way = tempManager.type == 'websocket' ? 8 : 1;
                } else {
                    way = 1;
                }
                //�ж��Ƿ������������ת�˹�
                var urlParams = global.urlParams;
                var url = '/chat/user/chatconnect.action';
                var reqParams = {
                    'sysNum': global.sysNum,
                    'uid': global.apiInit.uid,
                    'chooseAdminId': global.urlParams.aid || '',
                    'tranFlag': global.urlParams.tranFlag,
                    'way': way,
                    'current': queueing,
                    'groupId': groupId || ''
                };
                if (urlParams.autoManual && urlParams.aid) {
                    url = '/chat/user/invite.action';
                    reqParams.aid = urlParams.aid;
                }
                $ajax({
                    'url': url,
                    'type': 'post',
                    'dataType': 'json',
                    'data': reqParams,
                    'success': function(ret) {
                        global.urlParams.leaveMsgGroupId = groupId;
                        if (ret.status == -1) {
                            listener.trigger("core.sessionclose", 7);
                            return;
                        }
                        //[0:�Ŷӣ�2���޿ͷ����ߣ�3��������������˳�ʱ���ߣ�1���ɹ�]
                        if (ret.status == 2) {
                            //���޿ͷ�����
                            serverOffline(ret, init, value);
                        } else if (ret.status == 0 || ret.status == 7) {
                            //�Ŷ�
                            queueWait(ret, init, value);
                        } else if (ret.status == 1) {
                            if (window.parent && window.postMessage && global.urlParams.from == 'iframe') {
                                window.parent.postMessage(JSON.stringify({
                                    'name': 'manual',
                                    'status': 'success'
                                }), "*");
                            }
                            queueing = false;
                            if (ret.adminHelloWord) {
                                global.urlParams.adminHelloWord = ret.adminHelloWord;
                            };
                            if (init) {
                                initHumanSession(value, ret, global.urlParams.adminHelloWord);
                                listener.trigger("core.transfersuccess", {
                                    'data': ret
                                });
                            } else {
                                listener.trigger("core.system", {
                                    'type': 'system',
                                    'status': "transfer",
                                    'data': {
                                        'content': language['L10002'].replace("{0}", ret.aname)
                                    }
                                });
                                listener.trigger("core.transfersuccess", {
                                    'data': ret
                                });
                                ret.content = global.urlParams.adminHelloWord;
                                listener.trigger("core.system", {
                                    'type': 'human',
                                    'status': "transfer",
                                    'data': ret
                                });
                            }
                            if (manager) {
                                manager.destroy();
                            }
                            manager = socketFactory(ret, global);
                            manager.start();
                            modeState.setCurrentState("human");
                            listener.trigger("core.buttonchange", {
                                'type': 'transfer',
                                'action': 'hide'
                            });
                        } else if (ret.status == 3) {
                            listener.trigger("core.sessionclose", 7);
                            blackListCallback(ret, init);
                        } else if (ret.status == 6) {
                            delete global.urlParams.aid;
                            listener.trigger("core.grouplist");
                        }
                    },
                    'fail': function() {}
                });
            });

        };

        var transferConnect = function(value, promise, init) {
            var init = !!init;
            var promise = new Promise();
            transfer(global, promise, queueing).then(function(groupId) {
                transferSuccess(groupId, null, init);
            }, function() {
                transferFail(init, promise);
            });
            return promise;

        };

        var getWelcome = function(value, promise) {
            var promise = promise || new Promise();
            if (!value) {
                value = [];
            }
            var now = new Date();
            var obj = {
                "date": DateUtil.formatDate(now),
                "content": [{
                    'senderType': 2,
                    't': +now,
                    'msg': global.urlParams.adminHelloWord,
                    'ts': DateUtil.formatDate(now, true)
                }]
            };
            setTimeout(function() {
                promise.resolve(value);
            }, 0);
            return promise;
        };

        var parseDOM = function() {};

        var bindListener = function() {
            listener.on("sendArea.artificial", transferConnect);
            listener.on("core.onreceive", onReceive);
        };

        var initPlugins = function() {
            var status = global.apiInit.ustatus;
            //queueing = (status == -2);
            if (status == 0 || status == 1 || status == -2) {
                transferConnect(null, null, true);
            } else if (status == -1) {
                initSession(global).then(initRobotSession);
            }
        };

        var init = function() {
            parseDOM();
            bindListener();
            initPlugins();
        };

        init();

        this.getWelcome = function() {};

    };

    module.exports = HumanFirst;
},{"../socket/robot.js":21,"../socket/rolling.js":22,"../socket/socketfactory.js":23,"../socket/websocket.js":24,"../util/date.js":25,"../util/listener.js":29,"../util/monitAjax.js":30,"../util/promise.js":31,"./currentState.js":9,"./initsession.js":12,"./transfer.js":19}],11:[function(require,module,exports){
    /**
     * @author Treagzhao
     */
    function HumanOnly(global) {
        var listener = require("../util/listener.js");
        var Promise = require('../util/promise.js');
        var DateUtil = require('../util/date.js');
        var $ajax = require("../util/monitAjax.js")(global);
        var Robot = require('../socket/robot.js');
        var WebSocket = require('../socket/websocket.js');
        var setCurrentState = require('./currentState.js');
        var Rolling = require('../socket/rolling.js');
        var modeState = require('./currentState.js');
        var transfer = require('./transfer.js');
        var initSession = require('./initsession.js');
        var socketFactory = require('../socket/socketfactory.js');
        var leaveMessageStr = global.apiConfig.leaveMsg;
        var language = global.language.lan;
        var manager = null;
        var queueing = false;

        var initHumanSession = function(value, ret, word) {
            var success = !!word;
            var face = (!!word) ? ret.aface : global.apiConfig.robotLogo;
            var name = (!!word) ? ret.aname : global.apiConfig.robotName;
            var word = word || global.urlParams.robotHelloWord;
            var curStatus = global.apiInit.ustatus == -2 ? 1 : 0;
            //-2Ϊ�Ŷ���
            if (!value) {
                value = [];
            }
            var now = new Date();
            var obj = {
                "date": DateUtil.formatDate(now),
                "content": [{
                    // 'senderType' : (!!word) ? 2 : 1,
                    'senderType': curStatus ? 1 : (!!word) ? 2 : 1,
                    't': +now,
                    'msg': word,
                    'ts': DateUtil.formatDate(now, true),
                    'senderFace': face,
                    'senderName': name
                }]
            };
            value.push(obj);
            setTimeout(function() {
                listener.trigger("core.initsession", value);
            }, 0);
        };

        var transferConnect = function(value, promise, init) {
            var init = !!init;
            var promise = new Promise();
            transfer(global, promise, queueing).then(function(groupId) {
                transferSuccess(groupId, null, init);
            }, transferFail);
            return promise;

        };

        var onReceive = function(data) {
            var list = data.list || [];
            for (var i = 0,
                     len = list.length; i < len; i++) {
                var item = list[i];
                var ret = item;
                if (item.type === 200) {
                    setCurrentState.setCurrentState('human');
                    listener.trigger("core.system", {
                        'type': 'system',
                        'status': "transfer",
                        'data': {
                            'content': language['L10002'].replace("{0}", ret.aname)
                        }
                    });
                    //ret.content = global.urlParams.adminHelloWord;
                    if (ret.serviceInfo.adminHelloWord) {
                        global.urlParams.adminHelloWord = ret.serviceInfo.adminHelloWord;
                    };
                    ret.content = global.urlParams.adminHelloWord;
                    listener.trigger("core.system", {
                        'type': 'human',
                        'data': ret
                    });
                    listener.trigger("core.buttonchange", {
                        'type': 'transfer',
                        'action': 'hide'
                    });
                    break;
                }
            }
        };
        var transferFail = function() {
            if (false) {
                var value = [];
                var now = new Date();
                var obj = {
                    "date": DateUtil.formatDate(now),
                    "content": [{
                        'senderType': 1,
                        't': +now,
                        'msg': global.urlParams.robotHelloWord,
                        'ts': DateUtil.formatDate(now, true),
                        'senderFace': global.apiConfig.robotLogo,
                        'senderName': global.apiConfig.robotName
                    }]
                };
                value.push(obj);
                manager = new Robot(global);
                modeState.setCurrentState("robot");
            }
            setTimeout(function() {
                listener.trigger("core.sessionclose", -1);
            }, 0);
        };

        var queueWait = function(ret, init, value) {
            var str = language['L10004'].replace("{0}", ret.count);
            queueing = true;
            if (manager) {
                manager.destroy();
            }
            manager = socketFactory(ret, global);
            manager.start();
            if (init) {
                // initHumanSession(value,ret,null);
                listener.trigger("core.initsession", value);
                setTimeout(function() {
                    //msgflag,0������1�ر�
                    if (!global.urlParams.msgflag) {
                        ret.content = str + " " + leaveMessageStr;
                    } else {
                        ret.content = str;
                    }
                    ret.aname = language['L10026'];
                    listener.trigger("core.system", {
                        'type': 'system',
                        'status': 'queue',
                        'data': ret
                    });
                    listener.trigger("core.sessionclose", -2);
                }, 1);
            } else {
                //msgflag,0������1�ر�
                if (!global.urlParams.msgflag) {
                    ret.content = str + " " + leaveMessageStr;
                } else {
                    ret.content = str;
                }
                ret.aname = '�Ŷ���';
                listener.trigger("core.system", {
                    'type': 'system',
                    'status': 'queue',
                    'data': ret
                });
                listener.trigger("core.sessionclose", -2);
            }
        };
        var serverOffline = function(ret, init, value) {
            if (manager) {
                manager.destroy();
            }
            if (!global.urlParams.msgflag) {
                ret.content = global.urlParams.adminNonelineTitle + ' ' + leaveMessageStr;
            } else {
                ret.content = global.urlParams.adminNonelineTitle;
            }
            //ret.content = global.urlParams.adminNonelineTitle + ' ' + leaveMessageStr;
            listener.trigger("core.buttonchange", {
                'type': 'transfer',
                'action': 'hide',
                'data': ret
            });
            if (init) {
                setTimeout(function() {
                    listener.trigger("core.sessionclose", -1);
                }, 1);
            } else {
                listener.trigger("core.sessionclose", -1);
            }
        };

        var blackListCallback = function(ret, init) {

            //msgflag,0������1�ر�
            if (!global.urlParams.msgflag) {
                ret.content = global.urlParams.adminNonelineTitle + ' ' + leaveMessageStr;
            } else {
                ret.content = global.urlParams.adminNonelineTitle;
            }
            ret.aname = language['L10025'];
            listener.trigger("core.system", {
                'type': 'system',
                'status': 'blacklist',
                'data': ret,
                'moduleType': "humanOnly"
            });
            listener.trigger("core.sessionclose", -1);
        };
        var transferSuccess = function(groupId, promise, init) {
            var init = !!init;
            initSession(global, promise).then(function(value, promise) {
                //�ж��Ƿ������������ת�˹�
                var urlParams = global.urlParams;
                var url = '/chat/user/chatconnect.action';
                var reqParams = {
                    'sysNum': global.sysNum,
                    'chooseAdminId': global.urlParams.aid || '',
                    'tranFlag': global.urlParams.tranFlag,
                    'uid': global.apiInit.uid,
                    'way': 1,
                    'current': queueing,
                    'groupId': groupId || ''
                };
                if (urlParams.autoManual && urlParams.aid) {
                    url = '/chat/user/invite.action';
                    reqParams.aid = urlParams.aid;
                }
                $ajax({
                    'url': url,
                    'type': 'post',
                    'dataType': 'json',
                    'data': reqParams,
                    'success': function(ret) {
                        global.urlParams.leaveMsgGroupId = groupId;
                        if (ret.status == -1) {
                            listener.trigger("core.sessionclose", 7);
                            return;
                        }
                        //[0:�Ŷӣ�2���޿ͷ����ߣ�3��������������˳�ʱ���ߣ�1���ɹ�]
                        if (ret.status == 2) {
                            //���޿ͷ�����
                            serverOffline(ret, init, value);
                        } else if (ret.status == 0) {
                            //�Ŷ�
                            // console.log(ret,0);
                            queueWait(ret, init, value);
                        } else if (ret.status == 1) {
                            if (window.parent && window.postMessage && global.urlParams.from == 'iframe') {
                                window.parent.postMessage(JSON.stringify({
                                    'name': 'manual',
                                    'status': 'success'
                                }), "*");
                            }
                            if (ret.adminHelloWord) {
                                global.urlParams.adminHelloWord = ret.adminHelloWord;
                            };
                            if (init) {
                                initHumanSession(value, ret, global.urlParams.adminHelloWord);
                                listener.trigger("core.transfersuccess", {
                                    'data': ret
                                });
                            } else {
                                listener.trigger("core.system", {
                                    'type': 'system',
                                    'status': "transfer",
                                    'data': {
                                        'content': language['L10002'].replace("{0}", ret.aname)
                                    }
                                });
                                listener.trigger("core.transfersuccess", {
                                    'data': ret
                                });
                                ret.content = global.urlParams.adminHelloWord;
                                listener.trigger("core.system", {
                                    'type': 'human',
                                    'status': "transfer",
                                    'data': ret
                                });
                            }
                            if (manager) {
                                manager.destroy();
                            }
                            manager = socketFactory(ret, global);
                            modeState.setCurrentState("human");
                            manager.start();
                            listener.trigger("core.buttonchange", {
                                'type': 'transfer',
                                'action': 'hide'
                            });
                        } else if (ret.status == 3) {
                            blackListCallback(ret, init);
                        } else if (ret.status == 6) {
                            delete global.urlParams.aid;
                            listener.trigger("core.grouplist");
                        } else if (ret.status == 7) {
                            ret.content = ret.msg;
                            listener.trigger("core.system", {
                                "type": "system",
                                "status": "queue",
                                "data": ret
                            });
                        }
                    },
                    'fail': function() {}
                });
            });

        };

        var parseDOM = function() {
            listener.on("sendArea.artificial", transferConnect);
        };

        var bindListener = function() {
            listener.on("core.onreceive", onReceive);
        };

        var initPlugins = function() {
            var status = global.apiInit.ustatus;
            //queueing = (status == -2);
            if (status == 0 || status == 1 || status == -2) {
                transferConnect(null, null, true);
            }
        };

        var init = function() {
            parseDOM();
            bindListener();
            initPlugins();
        };

        init();
    };

    module.exports = HumanOnly;
},{"../socket/robot.js":21,"../socket/rolling.js":22,"../socket/socketfactory.js":23,"../socket/websocket.js":24,"../util/date.js":25,"../util/listener.js":29,"../util/monitAjax.js":30,"../util/promise.js":31,"./currentState.js":9,"./initsession.js":12,"./transfer.js":19}],12:[function(require,module,exports){
//�Ự�ж�
    var Promise = require('../util/promise.js');
    var dateUtil = require("../util/date.js");
    var global, ignoreSuggetion;
    var offlineMessageCache = require("./offlineMessage.js")
    var $ajax;
    var initSessions = function(global, promise) {
        var promise = promise || new Promise();
        //��ȡ�Ự��¼
        if (global.apiInit.ustatus == 0) {
            setTimeout(function() {
                promise.resolve([]);
            }, 0);
        } else {
            $.ajax({
                type: "post",
                url: '/chat/user/getChatDetailByCid.action',
                dataType: "json",
                data: {
                    cid: global.apiInit.cid,
                    uid: global.apiInit.uid
                },
                success: function(data) {
                    console.log(data);
                    promise.resolve(data);
                }
            });
        }

        return promise;
    };


    var initOfflineMessage = function(dataList, promise) {
        var promise = promise || new Promise();
        $.ajax({
            'url': '/chat/msgOffline/queryOfflineMsg.action',
            'dataType': 'json',
            'type': 'GET',
            'data': {
                'uid': global.apiInit.uid
            },
            'success': function(ret) {
                var firstChild;
                if (ret.length > 0) {
                    for (var i = 0; i < ret.length; i++) {
                        var list = ret[i].content || [];
                        for (var j = 0; j < list.length; j++) {
                            var item = list[j];
                            if (j == 0) {
                                firstChild = item;
                            }
                            offlineMessageCache[item.msgId] = true;
                            item.msgType = "offline";
                            if (item.senderType === null) {
                                //������Ϣ�����ͷ����͵���Ϣ����
                                item.senderType = 2;

                            }
                            if (!item.msg) {
                                item.msg = "";
                            }
                        }
                    }
                    var date = firstChild.t ? new Date(firstChild.t) : new Date();
                    date = new Date(date.getTime() + 10 * 10000);
                    var dateStr = dateUtil.formatDate(date, true);
                    dataList.push({
                        'type': "offline-seperator",
                        "date": "",
                        'content': [{
                            'senderType': -1,
                            'msg': '',
                            'ts': firstChild ? firstChild.ts : dateStr,
                            't': firstChild ? firstChild.t : +new Date()
                        }]
                    });
                }
                var list = dataList.concat(ret);
                promise.resolve(list);
            }
        });
        return promise;
    };

//��ȡ��������
    var initSugguestions = function(dataList, promise) {
        var promise = promise || new Promise();
        if (ignoreSuggetion) {
            setTimeout(function() {
                promise.resolve(dataList);
            }, 0);
            return;
        }
        var msg = [];
        var moduleType;
        if (global.urlParams.moduleType !== undefined) {
            moduleType = global.urlParams.moduleType;
        }
        if (moduleType === undefined) {
            moduleType = global.apiConfig.type;
        }
        //���Ự������ ����������������  ������&�˹���һ�� denzel
        if (global.apiConfig.guideFlag && global.apiInit.ustatus != 1 && global.apiInit.ustatus != -1 && moduleType != 2) {
            $.ajax({
                type: "post",
                url: '/chat/user/robotGuide.action',
                dataType: "json",
                data: {
                    uid: global.apiInit.uid,
                    robotFlag: global.urlParams.robotFlag || ""
                },
                success: function(ret) {
                    var date = ret.data.ts ? new Date(ret.data.ts) : new Date();
                    date = new Date(date.getTime() + 10 * 10000);
                    var dateStr = dateUtil.formatDate(date, true);
                    var msg = ret.data.answer || '';
                    // msg = msg + '<a href="https://www.baidu.com">�ٶ�</a>';
                    if (msg.indexOf('<a') >= 0) {
                        msg = msg.replace(/<a/g, '<a target="_blank"');
                    }
                    dataList.push({
                        'type': "robot",
                        'answerType': "welcome-sugguestions",
                        "date": dateStr,
                        'content': [{
                            'senderName': global.apiConfig.robotName,
                            'senderType': 3, //3��ӭ��֧����������
                            'msg': msg,
                            'stripe': "",
                            /*ret.data.stripe*/
                            'list': ret.data.suggestions,
                            'ts': dateStr
                        }]
                    });
                    promise.resolve(dataList);
                }
            });
        } else {
            promise.resolve(dataList);
        }
        return promise;
    }


    module.exports = function(g, promise, ignore) {
        global = g;
        $ajax = require("../util/monitAjax.js")(global);
        ignoreSuggetion = ignore;
        return initSessions(global).then(initOfflineMessage).then(initSugguestions);
    };
},{"../util/date.js":25,"../util/monitAjax.js":30,"../util/promise.js":31,"./offlineMessage.js":14}],13:[function(require,module,exports){
    /**
     * @author Treagzhao
     */
    var manager = null;
    var errorlogFun = require("../util/errorlog.js");
    var QUFENQI_COMPANYID = 'a2a01f79faed48489058af7eabaafc1c';

    function ModeEntranceFactroy(global) {
        var ROBOT_FIRST = 3,
            HUMAN_FIRST = 4,
            ROBOT_ONLY = 1,
            HUMAN_ONLY = 2;
        var type,
            params,
            moduleType;
        var humanFirst = require('./humanfirst.js');
        var robotFirst = require('./robotfirst.js');
        var robotOnly = require('./robotonly.js');
        var humanOnly = require('./humanonly.js');
        var Comm = require('../comm.js');
        params = Comm.getQueryParam();
        //ulr��������

        if (params.moduleType >= 1 && params.moduleType <= 4) {
            moduleType = params.moduleType;
        } else {
            moduleType = global.apiConfig.type;
        }
        if (!!manager) {
            return manager;
        }
        //���Ȥ���ڵ������ļ��
        if ((moduleType == HUMAN_FIRST || moduleType == HUMAN_ONLY) && global.apiInit.pid === QUFENQI_COMPANYID) {
            errorlogFun.specialError('qufenqi_human_first', 'mode', {
                'url': location.href,
                'moduleType': moduleType,
                'uid': global.apiInit.uid
            }, global);
        }
        switch (moduleType) {
            case ROBOT_FIRST:
                manager = new robotFirst(global);
                break;
            case HUMAN_FIRST:
                manager = new humanFirst(global);
                break;
            case ROBOT_ONLY:
                manager = new robotOnly(global);
                break;
            case HUMAN_ONLY:
                manager = new humanOnly(global);
                break;
        }
        return manager;
    };

    module.exports = ModeEntranceFactroy;
},{"../comm.js":1,"../util/errorlog.js":26,"./humanfirst.js":10,"./humanonly.js":11,"./robotfirst.js":16,"./robotonly.js":17}],14:[function(require,module,exports){
    module.exports = {};

},{}],15:[function(require,module,exports){
    var offlineCache = require("./offlineMessage.js");

    function Filter(arr) {
        var count = 0;
        for (var el in offlineCache) {
            if (!offlineCache.hasOwnProperty(el)) {
                continue;
            }
            count++;
        }
        if (count == 0)
            return;
        for (var i = 0; i < arr.length; i++) {
            var list = [];
            for (var j = 0; j < arr[i].content.length; j++) {
                var item = arr[i].content[j];
                if (!offlineCache[item.msgId]) {
                    list.push(item);
                } else {
                    delete offlineCache[item.msgId];
                }
            }
            arr[i].content = list;
        }

    };


    module.exports = Filter;

},{"./offlineMessage.js":14}],16:[function(require,module,exports){
    /**
     * @author Treagzhao
     */
    var RobotFirst = function(global) {
        var listener = require("../util/listener.js");
        var Promise = require('../util/promise.js');
        var DateUtil = require('../util/date.js');
        var Robot = require('../socket/robot.js');
        var setCurrentState = require('./currentState.js');
        var WebSocket = require('../socket/websocket.js');
        var Rolling = require('../socket/rolling.js');
        var transfer = require('./transfer.js');
        var initSession = require('./initsession.js');
        var $ajax = require("../util/monitAjax.js")(global);
        var socketFactory = require('../socket/socketfactory.js');
        var leaveMessageStr = global.apiConfig.leaveMsg;
        var _self = this;
        var manager,
            tempManager;
        var language = global.language.lan;
        var queueing = false;
        var outerPromise = new Promise();
        var count = 0;
        var parseDOM = function() {
            $transferBtn = $(".temp_test");
        };

        var getWelcome = function(value, promise) {
            var promise = promise || new Promise();
            initSession(global, promise).then(function(value, promise) {
                if (!value) {
                    value = [];
                }
                var now = new Date();
                var obj = {
                    "date": DateUtil.formatDate(now),
                    "content": [{
                        'senderType': 1,
                        't': +now,
                        'msg': global.urlParams.robotHelloWord,
                        'ts': DateUtil.formatDate(now, true),
                        'senderFace': global.apiConfig.robotLogo,
                        'senderName': global.apiConfig.robotName
                    }]
                };

                value.push(obj);
                setTimeout(function() {
                    listener.trigger("core.initsession", value);
                }, 0);
                return promise;
            });
            return promise;
        };
        var initHumanSession = function(word, ret) {
            var face = (!!word) ? ret.aface : global.apiConfig.robotLogo;
            var name = (!!word) ? ret.aname : global.apiConfig.robotName;
            var word = word || global.urlParams.robotHelloWord;
            var curStatus = global.apiInit.ustatus == -2 ? 1 : 0;
            //-2Ϊ�Ŷ���
            initSession(global).then(function(value, promise) {
                if (!value) {
                    value = [];
                }
                var now = new Date();
                var obj = {
                    "date": DateUtil.formatDate(now),
                    "content": [{
                        // 'senderType' : (!!word) ? 2 : 1,
                        'senderType': curStatus ? 1 : (!!word) ? 2 : 1,
                        't': +now,
                        'msg': word,
                        'ts': DateUtil.formatDate(now, true),
                        'senderFace': face,
                        'senderName': name
                    }]
                };
                // value.push(obj);//�Ự�����в��������˻�ӭ�� denzel
                setTimeout(function() {
                    listener.trigger("core.initsession", value);
                }, 0);
                return promise;
            });

        };
        /**
         * �ͷ�������
         */
        var serverOffline = function(ret, init) {
            if (init) {
                initHumanSession(null, ret);
                setTimeout(function() {
                    //msgflag,0������1�ر�
                    if (!global.urlParams.msgflag) {
                        ret.content = global.urlParams.adminNonelineTitle + leaveMessageStr;
                    } else {
                        ret.content = global.urlParams.adminNonelineTitle;
                    }
                    //ret.content = global.urlParams.adminNonelineTitle + leaveMessageStr;
                    listener.trigger("core.system", {
                        'type': 'system',
                        'status': 'offline',
                        'data': ret
                    });
                }, 1);
            } else {
                //msgflag,0������1�ر�
                if (!global.urlParams.msgflag) {
                    ret.content = global.urlParams.adminNonelineTitle + leaveMessageStr;
                } else {
                    ret.content = global.urlParams.adminNonelineTitle;
                }
                //ret.content = global.urlParams.adminNonelineTitle + leaveMessageStr;
                listener.trigger("core.system", {
                    'type': 'system',
                    'status': 'offline',
                    'data': ret
                });
            }
            setCurrentState.setCurrentState('robot');
        };

        var queueWait = function(ret, init) {
            var str = language['L10004'].replace("{0}", ret.count);
            queueing = true;
            if (!tempManager) {
                tempManager = socketFactory(ret, global);
                tempManager.start();
            }

            if (manager) {
                manager.destroy();
            }
            manager = new Robot(global);
            if (init) {
                initHumanSession(null, ret);
                //console.log(global);

                setTimeout(function() {
                    //msgflag,0������1�ر�
                    if (!global.urlParams.msgflag) {
                        ret.content = str + " " + leaveMessageStr;
                    } else {
                        ret.content = str;
                    }

                    listener.trigger("core.system", {
                        'type': 'system',
                        'status': "queue",
                        'data': ret
                    });
                }, 1);
            } else {
                //msgflag,0������1�ر�
                if (!global.urlParams.msgflag) {
                    ret.content = str + " " + leaveMessageStr;
                } else {
                    ret.content = str;
                }
                listener.trigger("core.system", {
                    'type': 'system',
                    'status': "queue",
                    'data': ret
                });
            }
            setCurrentState.setCurrentState("robot");
        };

        var transferHumanSucess = function(ret, init) {
            if (manager) {
                manager.destroy();
            }
            if (window.parent && window.postMessage && global.urlParams.from == 'iframe') {
                window.parent.postMessage(JSON.stringify({
                    'name': 'manual',
                    'status': 'success'
                }), "*");
            }
            queueing = false;
            if (window.parent && window.postMessage) {
                window.parent.postMessage(JSON.stringify({
                    'type': 'manual',
                    'status': 'success'
                }), "*");
            }
            manager = socketFactory(ret, global);
            manager.start();
            setCurrentState.setCurrentState('human');
            if (ret.adminHelloWord) {
                global.urlParams.adminHelloWord = ret.adminHelloWord;
            };
            if (init) {
                initHumanSession(global.urlParams.adminHelloWord, ret);
                listener.trigger("core.transfersuccess", {
                    'data': ret
                });
            } else {
                listener.trigger("core.system", {
                    'type': 'system',
                    'status': "transfer",
                    'data': {
                        'content': language['L10002'].replace("{0}", ret.aname)
                    }
                });
                listener.trigger("core.transfersuccess", {
                    'data': ret
                });
                ret.content = global.urlParams.adminHelloWord;
                listener.trigger("core.system", {
                    'type': 'human',
                    'data': ret
                });
            }

            listener.trigger("core.buttonchange", {
                'type': 'transfer',
                'action': 'hide'
            });
        };

        var blackListCallback = function(ret, init) {
            //ret.content = language['L10001'] + ' ' + leaveMessageStr;
            //msgflag,0������1�ر�
            if (!global.urlParams.msgflag) {
                ret.content = language['L10001'] + ' ' + leaveMessageStr;
            } else {
                ret.content = language['L10001'];
            }
            listener.trigger("core.system", {
                'type': 'system',
                'status': 'blacklist',
                'data': ret
            });
            if (init) {
                initRobotSession();
            }
        };
        /**
         *
         * @param {Object} init ��ͨ���¼���������������Զ�����
         */
        var transferBtnClickHandler = function(evt, init) {
            var init = !!init;
            transfer(global, null, queueing).then(function(groupId, promise) {
                var way;
                if (tempManager) {
                    way = tempManager.type == 'websocket' ? 8 : 1;
                } else {
                    way = 1;
                }
                //�ж��Ƿ������������ת�˹�
                var urlParams = global.urlParams;
                var url = '/chat/user/chatconnect.action';
                var reqParams = {
                    'sysNum': global.sysNum,
                    'uid': global.apiInit.uid,
                    'chooseAdminId': global.urlParams.aid || '',
                    'tranFlag': global.urlParams.tranFlag,
                    'way': way,
                    'current': queueing,
                    'groupId': groupId || ''
                };
                if (urlParams.autoManual && urlParams.aid) {
                    url = '/chat/user/invite.action';
                    reqParams.aid = urlParams.aid;
                }
                $ajax({
                    'url': url,
                    'type': 'post',
                    'dataType': 'json',
                    'data': reqParams,
                    'success': function(ret) {
                        if (ret.status == -1) {
                            listener.trigger("core.sessionclose", 7);
                            return;
                        }
                        count++;
                        if (count > 6) {
                            return;
                        }
                        global.urlParams.leaveMsgGroupId = groupId;
                        //[0:�Ŷӣ�2���޿ͷ����ߣ�3��������������˳�ʱ���ߣ�1���ɹ�]
                        if (ret.status == 2) {
                            serverOffline(ret, init);
                            //���޿ͷ�����
                        } else if (ret.status == 0) {
                            //�Ŷ�
                            queueWait(ret, init);
                        } else if (ret.status == 1) {
                            transferHumanSucess(ret, init);
                        } else if (ret.status == 3) {
                            //�����˳�ʱ����
                            listener.trigger("core.sessionclose", 7);
                            blackListCallback(ret, init);
                        } else if (ret.status == 6) {
                            delete global.urlParams.aid;
                            listener.trigger("core.grouplist");
                        } else if (ret.status == 7) {
                            ret.content = ret.msg;
                            listener.trigger("core.system", {
                                "type": "system",
                                "status": "queue",
                                "data": ret
                            });
                        }
                    },
                    'fail': function() {}
                });

            }, function() {

            });

        };

        var initRobotSession = function(value, promise) {
            if (!value) {
                value = [];
            }
            var now = new Date();
            var obj = {
                "date": DateUtil.formatDate(now),
                "content": [{
                    'senderType': 1,
                    't': +now,
                    'msg': global.urlParams.robotHelloWord,
                    'ts': DateUtil.formatDate(now, true),
                    'senderFace': global.apiConfig.robotLogo,
                    'senderName': global.apiConfig.robotName
                }]
            };
            // value.push(obj);//�Ự�����в��������˻�ӭ�� denzel
            setTimeout(function() {
                listener.trigger("core.initsession", value);
            }, 0);
            manager = new Robot(global);
            setCurrentState.setCurrentState('robot');
        };
        var onReceive = function(data) {
            var list = data.list || [];
            for (var i = 0,
                     len = list.length; i < len; i++) {
                var item = list[i];
                var ret = item;
                if (item.type === 200) {
                    if (manager && tempManager) {
                        manager.destroy();
                        manager = tempManager;
                        tempManager = null;
                    }

                    setCurrentState.setCurrentState('human');
                    listener.trigger("core.system", {
                        'type': 'system',
                        'status': "transfer",
                        'data': {
                            'content': language['L10002'].replace("{0}", ret.aname)
                        }
                    });
                    if (ret.serviceInfo.adminHelloWord) {
                        global.urlParams.adminHelloWord = ret.serviceInfo.adminHelloWord;
                    }
                    ret.content = global.urlParams.adminHelloWord;
                    listener.trigger("core.system", {
                        'type': 'human',
                        'data': ret
                    });
                    listener.trigger("core.buttonchange", {
                        'type': 'transfer',
                        'action': 'hide'
                    });
                    break;
                }
            }
        };
        var bindListener = function() {
            listener.on("sendArea.artificial", transferBtnClickHandler);
            listener.on("core.onreceive", onReceive);
        };

        var initPlugins = function() {
            listener.trigger("core.buttonchange", {
                'type': 'transfer',
                'action': 'show'
            });
            var status = global.apiInit.ustatus;
            //���ȷ��ͻ����˻�ӭ��
            //queueing == status == -2;
            // 0 û�лỰ���� 1 ת�˹��ɹ� -2 ��ʾ�����Ŷ� -1 �Ự�ѽ���
            // console.log(status);
            if (status == 0) {
                manager = new Robot(global);
                getWelcome();
                setCurrentState.setCurrentState('robot');
            } else {
                if (status == 1 || status == -2) {
                    transferBtnClickHandler(null, true);
                } else if (status == -1) {
                    initSession(global).then(initRobotSession);
                }
            }

        };

        var init = function() {
            parseDOM();
            bindListener();
            initPlugins();
        };

        init();
    };

    module.exports = RobotFirst;
},{"../socket/robot.js":21,"../socket/rolling.js":22,"../socket/socketfactory.js":23,"../socket/websocket.js":24,"../util/date.js":25,"../util/listener.js":29,"../util/monitAjax.js":30,"../util/promise.js":31,"./currentState.js":9,"./initsession.js":12,"./transfer.js":19}],17:[function(require,module,exports){
    /**
     * @author Treagzhao
     */
    var RobotFirst = function(global) {
        var listener = require("../util/listener.js");
        var Promise = require('../util/promise.js');
        var DateUtil = require('../util/date.js');
        var Robot = require('../socket/robot.js');
        var modeState = require('./currentState.js');
        var WebSocket = require('../socket/websocket.js');
        var Rolling = require('../socket/rolling.js');
        var transfer = require('./transfer.js');
        var initSession = require('./initsession.js');
        var leaveMessageStr = global.apiConfig.leaveMsg;
        var socketFactory = require('../socket/socketfactory.js');
        var $ajax = require("../util/monitAjax.js")(global);
        var language = global.language.lan;
        var _self = this;
        var manager, tempManager;
        var queueing = false;
        var serverOffline = function(ret, init, value) {
            if (manager) {
                manager.destroy();
            }
            ret.content = language['L10027'] + ' ' + leaveMessageStr;
            listener.trigger("core.buttonchange", {
                'type': 'transfer',
                'action': 'hide',
                'data': ret
            });
            if (init) {
                setTimeout(function() {
                    listener.trigger("core.sessionclose", -1);
                }, 1);
            } else {
                listener.trigger("core.sessionclose", -1);
            }
        };

        var initHumanSession = function(value, ret, word) {
            var success = !!word;
            var face = (!!word) ? ret.aface : global.apiConfig.robotLogo;
            var name = (!!word) ? ret.aname : global.apiConfig.robotName;
            var word = word || global.urlParams.robotHelloWord;
            var curStatus = global.apiInit.ustatus == -2 ? 1 : 0;
            //-2Ϊ�Ŷ���
            if (!value) {
                value = [];
            }
            var now = new Date();
            var obj = {
                "date": DateUtil.formatDate(now),
                "content": [{
                    // 'senderType' : (!!word) ? 2 : 1,
                    'senderType': curStatus ? 1 : (!!word) ? 2 : 1,
                    't': +now,
                    'msg': word,
                    'ts': DateUtil.formatDate(now, true),
                    'senderFace': face,
                    'senderName': name
                }]
            };
            value.push(obj);
            setTimeout(function() {
                listener.trigger("core.initsession", value);
            }, 0);
        };
        var blackListCallback = function(ret, init) {
            //msgflag,0������1�ر�
            if (!global.urlParams.msgflag) {
                ret.content = language['L10001'] + ' ' + leaveMessageStr;
            } else {
                ret.content = language['L10001']
            }
            ret.aname = language['L10025'];
            listener.trigger("core.system", {
                'type': 'system',
                'status': 'blacklist',
                'data': ret
            });
            listener.trigger("core.sessionclose", -1);
        };
        var queueWait = function(ret, init, value) {
            var str = language['L10004'].replace("{0}", ret.count);
            queueing = true;
            if (manager) {
                manager.destroy();
            }
            manager = socketFactory(ret, global);
            manager.start();
            if (init) {
                // initHumanSession(value,ret,null);
                setTimeout(function() {
                    //msgflag,0������1�ر�
                    if (!global.urlParams.msgflag) {
                        ret.content = str + " " + leaveMessageStr;
                    } else {
                        ret.content = str;
                    }
                    ret.aname = language['L10026'];
                    listener.trigger("core.system", {
                        'type': 'system',
                        'status': 'queue',
                        'data': ret
                    });
                    listener.trigger("core.sessionclose", -2);
                }, 1);
            } else {
                //msgflag,0������1�ر�
                if (!global.urlParams.msgflag) {
                    ret.content = str + " " + leaveMessageStr;
                } else {
                    ret.content = str;
                }
                ret.aname = language['L10026'];
                listener.trigger("core.system", {
                    'type': 'system',
                    'status': 'queue',
                    'data': ret
                });
                listener.trigger("core.sessionclose", -2);
            }
        };

        var getWelcome = function(value, promise) {
            var promise = promise || new Promise();
            initSession(global, promise).then(function(value, promise) {
                if (!value) {
                    value = [];
                }
                var now = new Date();
                var obj = {
                    "date": DateUtil.formatDate(now),
                    "content": [{
                        'senderType': 1,
                        't': +now,
                        'msg': global.urlParams.robotHelloWord,
                        'ts': DateUtil.formatDate(now, true),
                        'senderFace': global.apiConfig.robotLogo,
                        'senderName': global.apiConfig.robotName
                    }]
                };
                value.push(obj);
                setTimeout(function() {
                    listener.trigger("core.initsession", value);
                }, 0);
                return promise;
            });
            return promise;
        };

        var transferFail = function() {
            if (false) {
                var value = [];
                var now = new Date();
                var obj = {
                    "date": DateUtil.formatDate(now),
                    "content": [{
                        'senderType': 1,
                        't': +now,
                        'msg': global.urlParams.robotHelloWord,
                        'ts': DateUtil.formatDate(now, true),
                        'senderFace': global.apiConfig.robotLogo,
                        'senderName': global.apiConfig.robotName
                    }]
                };
                value.push(obj);
                manager = new Robot(global);
                modeState.setCurrentState("robot");
            }
            setTimeout(function() {
                listener.trigger("core.sessionclose", -1);
            }, 0);
        };
        var transferSuccess = function(groupId, promise, init) {
            var init = !!init;
            initSession(global, promise).then(function(value, promise) {
                var way;
                if (tempManager) {
                    way = tempManager.type == 'websocket' ? 8 : 1;
                } else {
                    way = 1;
                }
                //�ж��Ƿ������������ת�˹�
                var urlParams = global.urlParams;
                var url = '/chat/user/chatconnect.action';
                var reqParams = {
                    'sysNum': global.sysNum,
                    'uid': global.apiInit.uid,
                    'chooseAdminId': global.urlParams.aid || '',
                    'tranFlag': global.urlParams.tranFlag,
                    'way': way,
                    'current': queueing,
                    'groupId': groupId || ''
                };
                if (urlParams.autoManual && urlParams.aid) {
                    url = '/chat/user/invite.action';
                    reqParams.aid = urlParams.aid;
                }
                $ajax({
                    'url': url,
                    'type': 'post',
                    'dataType': 'json',
                    'data': reqParams,
                    'success': function(ret) {
                        if (ret.status == -1) {
                            listener.trigger("core.sessionclose", 7);
                            return;
                        }
                        //[0:�Ŷӣ�2���޿ͷ����ߣ�3��������������˳�ʱ���ߣ�1���ɹ�]
                        if (ret.status == 2) {
                            //���޿ͷ�����
                            serverOffline(ret, init, value);

                        } else if (ret.status == 0) {
                            //�Ŷ�
                            // console.log(ret,0);
                            global.urlParams.groupId = groupId;
                            queueWait(ret, init, value);
                        } else if (ret.status == 1) {
                            if (window.parent && window.postMessage && global.urlParams.from == 'iframe') {
                                window.parent.postMessage(JSON.stringify({
                                    'name': 'manual',
                                    'status': 'success'
                                }), "*");
                            }
                            if (init) {
                                initHumanSession(value, ret, global.urlParams.adminHelloWord);
                                listener.trigger("core.transfersuccess", {
                                    'data': ret
                                });
                            } else {
                                listener.trigger("core.system", {
                                    'type': 'system',
                                    'status': "transfer",
                                    'data': {
                                        'content': language['L10002'].replace("{0}", ret.aname)
                                    }
                                });
                                listener.trigger("core.transfersuccess", {
                                    'data': ret
                                });
                                ret.content = global.urlParams.adminHelloWord;
                                listener.trigger("core.system", {
                                    'type': 'human',
                                    'status': "transfer",
                                    'data': ret
                                });
                            }
                            if (manager) {
                                manager.destroy();
                            }
                            manager = socketFactory(ret, global);
                            modeState.setCurrentState("human");
                            manager.start();
                            if (window.parent && window.postMessage) {
                                window.parent.postMessage(JSON.stringify({
                                    'type': 'manual',
                                    'status': 'success'
                                }), "*");
                            }
                            listener.trigger("core.buttonchange", {
                                'type': 'transfer',
                                'action': 'hide'
                            });
                        } else if (ret.status == 3) {
                            listener.trigger("core.sessionclose", 7);
                            blackListCallback(ret, init);
                        } else if (ret.status == 6) {
                            delete global.urlParams.aid;
                            listener.trigger("core.grouplist");
                        }
                    },
                    'fail': function() {}
                });
            });

        };

        var transferConnect = function(value, promise, init) {
            var init = !!init;
            var promise = new Promise();
            transfer(global, promise, queueing).then(function() {
                transferSuccess(null, null, init);
            }, transferFail);
            return promise;

        };

        var initRobotSession = function(value, promise) {
            if (!value) {
                value = [];
            }
            var now = new Date();
            var obj = {
                "date": DateUtil.formatDate(now),
                "content": [{
                    'senderType': 1,
                    't': +now,
                    'msg': global.urlParams.robotHelloWord,
                    'ts': DateUtil.formatDate(now, true),
                    'senderFace': global.apiConfig.robotLogo,
                    'senderName': global.apiConfig.robotName
                }]
            };
            // value.push(obj);
            setTimeout(function() {
                listener.trigger("core.initsession", value);
            }, 0);
        };

        var parseDOM = function() {};

        var bindListener = function() {};

        var initPlugins = function() {
            var status = global.apiInit.ustatus;
            //���ȷ��ͻ����˻�ӭ��
            if (status == 0) {
                setTimeout(function() {
                    listener.trigger("core.buttonchange", {
                        'type': 'transfer',
                        'action': 'hide'
                    });
                }, 5);
                manager = new Robot(global);
                modeState.setCurrentState("robot");
                getWelcome();
            } else if (status == -1) {
                setTimeout(function() {
                    listener.trigger("core.buttonchange", {
                        'type': 'transfer',
                        'action': 'hide'
                    });
                }, 5);
                manager = new Robot(global);
                modeState.setCurrentState("robot");
                initSession(global).then(initRobotSession);
            } else {
                transferConnect(null, null, true);
            }
        };

        var init = function() {
            parseDOM();
            bindListener();
            initPlugins();
        };

        init();

    };

    module.exports = RobotFirst;
},{"../socket/robot.js":21,"../socket/rolling.js":22,"../socket/socketfactory.js":23,"../socket/websocket.js":24,"../util/date.js":25,"../util/listener.js":29,"../util/monitAjax.js":30,"../util/promise.js":31,"./currentState.js":9,"./initsession.js":12,"./transfer.js":19}],18:[function(require,module,exports){
    /**
     * @author Treagzhao
     */
    var that = {};
    var groupTemplate = '<div class="shadow-layer">'+
        '<div class="group-outer">'+
        '<div class="group-title">'+
        '{{= it.languageText.T0010}}'+
        '</div>'+
        '<div class="group-main">'+
        '<ul class="clearfix">'+
        '{{  for(var i=0;i<it.list.length;i++){ }}'+
        '{{ var item = it.list[i];}}'+
        '<li class="js-item" data-id="{{=item.groupId}}">'+
        '{{=item.recGroupName}}'+
        '</li>'+
        '{{  } }}'+
        '</ul>'+
        '</div>'+
        '<div class="group-footer js-cancel-btn">'+
        '{{=it.languageText.T0000}}'+
        '</div>'+
        '</div>'+
        '</div>'+
        '';
    var groupTemplatePC = '<div class="group-layer js-group-layer"></div>'+
        '<div class="group-outer js-group-outer">'+
        '<p class="group-title">'+
        '{{= it.languageText.T0010}}'+
        '<span class="close_button js-cancel-btn js-group-cancel"></span>'+
        '</p>'+
        '<div class="group-main">'+
        '<ul class="clearfix">'+
        '{{  for(var i=0;i<it.list.length;i++){ }}'+
        '{{ var item = it.list[i];}}'+
        '<li class="js-item" data-id="{{=item.groupId}}">'+
        '{{=item.recGroupName}}'+
        '</li>'+
        '{{  } }}'+
        '</ul>'+
        '</div>'+
        '<div class="group-footer">'+
        '<p class="group-commit js-group-commit">{{=it.languageText.T0038}}</p>'+
        '</div>'+
        '</div>'+
        '';
    that.groupTemplate =groupTemplate;
    that.groupTemplatePC =groupTemplatePC;
    module.exports = that;

},{}],19:[function(require,module,exports){
    /**
     * @author Treagzhao
     */
    function transfer(global, promise, queueing) {
        var Promise = require('../util/promise.js');
        var promise = promise || new Promise();
        var template = require('./template.js');
        var language = global.language.lan;
        var languageText = global.language.text;
        var layer;
        var isMobile = window.navigator.userAgent.indexOf("Mobile") >= 0;
        var $ajax = require("../util/monitAjax.js")(global);
        var h5ChatShowGroups = function(ret) {
            var _html = doT.template(template.groupTemplate)({
                'list': ret,
                'languageText': languageText
            });
            var layer = $(_html);
            $(".js-wrapBox").append(layer);
            layer.delegate(".js-item", 'click', function(e) {
                var elm = e.currentTarget;
                var groupId = $(elm).attr("data-id");
                promise.resolve(groupId);
                layer.remove();
            });
            layer.find(".js-cancel-btn").on("click", function() {
                promise.reject();
                layer.remove();
            });
            //������ɫ
            $('.js-item').css('background-color', global.apiConfig.color);
            $('.js-cancel-btn').css('color', global.apiConfig.color);
        };
        var pcChatShowGroups = function(ret) {
            var color = global.apiConfig.color;
            var _html = doT.template(template.groupTemplatePC)({
                'list': ret,
                'languageText': languageText
            });
            var layer = $(_html);
            $(".js-mainBox").append(layer);
            $(".js-group-outer").animate({ right: '0' });
            var $outer = $(".js-group-outer");
            $outer.click(function() {

            })
            $outer.delegate(".js-item", 'click', function(e) {
                var elm = e.currentTarget;
                var groupId = $(elm).attr("data-id");
                $(elm).css({
                    'border-color': color,
                    'color': color
                }).siblings().css({
                    'border-color': '',
                    'color': ''
                })
                $(".js-group-commit").attr("data-id", groupId).css({ "background": global.apiConfig.color, "color": "#fff" });
                e.stopPropagation();
            });
            //���˹�ģʽ�µ�ȡ�������Ự
            layer.delegate(".js-cancel-btn", 'click', function(e) {
                promise.reject();
                $(".js-group-outer").animate({ right: '-390px' }, function() {
                    layer.remove();
                });
            });
            layer.on('click', function(e) {

                //promise.reject();
                //layer.remove();
            });
            //��껬���¼�������
            /*layer.delegate(".js-item",'hover', function(e) {
             $(this).css({"border":"1px solid "+global.apiConfig.color,"color":global.apiConfig.color})
             .siblings().css({"border":"1px solid #e0e9e8","color":"#555556"});
             });*/
            layer.delegate(".js-group-commit", 'click', function(e) {
                var elm = e.currentTarget;
                e.stopPropagation();
                var groupId = $(elm).attr("data-id") || "";
                if (groupId) {
                    promise.resolve(groupId);
                    layer.remove();
                }
            });
            $(".js-cancel-btn").on("click", function() {
                $(".js-group-outer").animate({ right: '-390px' }, function() {
                    layer.remove();
                });
            });
            $(".js-group-layer").on("click", function() {
                $(".js-group-outer").animate({ right: '-390px' }, function() {
                    promise.reject();
                    layer.remove();
                });
            });
            /*  $(".js-mainBox").delegate(".js-item", "click", function(){
             $(this).css({"border":"1px solid"+color,"color":color}).siblings().css({"border":"1px solid #e0e9e8","color":"#555556"})
             })*/

        };

        var init = function() {
            var groupId = global.urlParams.groupId || '';
            var urlParams = global.urlParams;

            if (urlParams.aid && typeof urlParams.tranFlag == 'number') {
                setTimeout(function() {
                    promise.resolve(groupId);
                }, 0);
            } else if (urlParams.autoManual && urlParams.aid) {
                //�������������ģ�����Ҫѡ�����
                setTimeout(function() {
                    promise.resolve(groupId);
                }, 0);
            } else if (global.apiInit.ustatus !== 0 && global.apiInit.ustatus !== -1) {
                //���ڻỰ����
                setTimeout(function() {
                    promise.resolve(groupId);
                }, 0);
            } else if (queueing) {
                //�����Ŷ�
                setTimeout(function() {
                    promise.resolve(groupId);
                }, 0);
            } else if (global.apiConfig.groupflag === 0) {
                setTimeout(function() {
                    promise.resolve(groupId);
                }, 0);
            } else if (global.urlParams.groupId && global.urlParams.groupId.length) {
                //������������groupId
                setTimeout(function() {
                    promise.resolve(groupId);
                }, 0);
            } else {
                $ajax({
                    'url': '/chat/user/getGroupList.action',
                    'dataType': 'json',
                    'type': 'get',
                    'data': {
                        'companyId': global.apiInit.pid,
                        'source': global.userInfo.source
                    },
                    'success': function(ret) {
                        if (ret.length == 1) {
                            var item = ret[0];
                            promise.resolve(item.groupId);
                        }else if(ret.length == 0){
                            promise.resolve(groupId);
                        } else {
                            if (global.pageType === "pc") {
                                pcChatShowGroups(ret);
                            } else {
                                h5ChatShowGroups(ret);
                            }

                        }
                    },
                    'fail': function() {}
                });
            }
        };

        init();

        return promise;
    }

    module.exports = transfer;

},{"../util/monitAjax.js":30,"../util/promise.js":31,"./template.js":18}],20:[function(require,module,exports){
    /**
     * @author Treagzhao
     */
    var listener = require('../util/listener.js');
    var currentStatusFun = require("../mode/currentState.js");
    var socketFactory = require("./socketfactory.js");

    function HearBeat(global) {
        var timer;
        var DURATION = 20 * 1000;
        var timer;
        var $ajax = require("../util/monitAjax.js")(global);
        listener.on("core.sessionclose", function(data) {
            if (data !== -2 && data !== -3) {
                clearInterval(timer);
            }
        });
        var start = function() {
            $ajax({
                'url': '/chat/user/msgt.action',
                'type': 'post',
                'dataType': 'json',
                'data': {
                    'uid': global.apiInit.uid,
                    'pid': global.apiInit.pid
                },
                'success': function(ret) {
                    if (ret && ret.ustatus == 0 && currentStatusFun.getCurrentState() == 'human') {
                        listener.trigger("core.sessionclose", 4);
                    }
                    var isReady = socketFactory.isReady();
                    if (isReady) {
                        var socketType = socketFactory().getType() === 'rolling' ? 1 : 8;
                        if (socketType !== ret.way) {
                            listener.trigger("core.sessionclose", 4);
                        }
                    }
                },
                'error': function(ret) {
                    var img = new Image();
                    img.src = "images/static/errorlog.png?t=" + (+new Date()) + "&response=" + encodeURIComponent(ret.response) + "&status=" + ret.status + "&statusText=" + encodeURIComponent(ret.statusText) + "&timeout=" + ret.timeout + "&from=heartbeat_user";
                }
            });
        };
        setTimeout(function() {
            start();
            timer = setInterval(start, DURATION);
        }, DURATION);

    }

    module.exports = HearBeat;
},{"../mode/currentState.js":9,"../util/listener.js":29,"../util/monitAjax.js":30,"./socketfactory.js":23}],21:[function(require,module,exports){
    /**
     * @author Treagzhao
     */
    function Robot(global) {
        var _self = this;
        var listener = require('../util/listener.js');
        var socketType = 'robot';
        var question = false;
        var $ajax = require("../util/monitAjax.js")(global);
        var errorlogFun = require("../util/errorlog.js");
        var DIRECT_SEND = 1,
            SUGGESTION_SEND = 2;
        // var firstMsgTime=0;
        var parseDOM = function() {};

        var createToken = function(data) {
            return data.uid + "" + data.date;
        };

        var onSuggestionSend = function(args) {

        };

        var onsend = function(args) {
            var data = args[0];
            if (data.currentStatus !== 'robot') {
                return;
            }
            var token = createToken(data);
            var content = data.answer.replace(/(^\s+|\s+$)/g, '');
            if (!/^\d+$/.test(content)) {
                question = false;
            }
            if (data.requestType == 'question') {
                question = true;
            }
            // if(!firstMsgTime){
            //      firstMsgTime=+new Date();
            //      console.log("��һ����Ϣtime:"+firstMsgTime);
            //      listener.trigger("core.firstMsgTime", firstMsgTime);
            // }
            if (!data.answer) {
                //��¼�쳣���
                errorlogFun.specialError("question_blank", 'common_robot', data, global);
            }
            $ajax({
                'url': '/chat/user/robotsend.action',
                'data': 'type',
                'data': {
                    'requestText': JSON.stringify(data.requestText) || data.answer,
                    'question':(typeof data.multiDiaQuestion=='object'?JSON.stringify(data.multiDiaQuestion):data.multiDiaQuestion)||data.answer,
                    'sysNum': global.sysNum,
                    'uid': global.apiInit.uid,
                    'cid': global.apiInit.cid,
                    'source': global.userInfo.source,
                    'questionFlag': data.questionFlag===2? data.questionFlag:(question ? 1 : 0),
                    'lanFlag': global.urlParams.lanFlag || 0,
                    'robotFlag': global.urlParams.robotFlag || ''
                },
                'type': 'post',
                'success': function(ret) {
                    //var item = JSON.parse(ret);
                    var item =typeof ret ==='object'? ret : JSON.parse(ret);
                    if (item.answerType == 4) {
                        question = true;
                    }
                    listener.trigger("core.onreceive", {
                        'list': [item],
                        'type': socketType
                    });
                    listener.trigger("core.msgresult", {
                        'msgId': data.dateuid,
                        'result': 'success'
                    });
                    //�������Զ������Ự
                    if (item.ustatus === 0) {
                        listener.trigger("core.sessionclose", 8);
                    }
                },
                'error': function(ret) {
                    listener.trigger("core.msgresult", {
                        'msgId': data.dateuid,
                        'result': 'fail'
                    });
                }
            });
            question = false;
        };

        var destroy = function() {
            listener.off("sendArea.send", onsend);
        };

        var bindListener = function() {
            listener.on("sendArea.send", onsend);
            listener.on("sendArea.sendSugguestions", onsend);
            listener.on("multiConv.send",onsend);//���ֻỰ
        };
        var init = function() {
            parseDOM();
            bindListener();
        };

        this.destroy = destroy;

        init();
    };

    module.exports = Robot;
},{"../util/errorlog.js":26,"../util/listener.js":29,"../util/monitAjax.js":30}],22:[function(require,module,exports){
    /**
     * @author Treagzhao
     */
    var HearBeat = require("./heartbeat.js");

    function Rolling(puid, pu, global) {
        this.puid = puid;
        var listener = require('../util/listener.js');
        var $ajax = require("../util/monitAjax.js")(global);
        var errorlogFun = require("../util/errorlog.js");
        var socketType = 'human';
        var timer;
        var ROLE_USER = 0;
        var messageCache = {};
        var language = global.language.lan;
        var _self = this;
        var onSend = function(args, retry) {
            var retry = retry || 0;
            var data = args[0];
            if (data.currentStatus !== 'human') {
                return;
            }
            if (!data.date) {
                data.ts = +new Date();
            } else {
                data.ts = data.date;
            }
            $ajax({
                'url': '/chat/user/chatsend.action',
                'data': {
                    'puid': puid,
                    'cid': data.cid,
                    'uid': data.uid,
                    'content': data.answer
                },
                'dataType': 'json',
                'type': "POST",
                'success': function(ret) {
                    listener.trigger("core.msgresult", {
                        'msgId': data.dateuid,
                        'result': 'success'
                    });
                },
                'error': function(ret) {
                    if (retry >= 3) {
                        listener.trigger("core.msgresult", {
                            'msgId': data.dateuid,
                            'result': 'fail'
                        });
                    } else {
                        setTimeout(function() {
                            onSend([data], retry + 1);
                        }, 1000);
                    }
                }
            });
        };

        var destroy = function() {
            clearInterval(timer);
        };

        var messageConfirm = function(list) {
            var arr = [];
            for (var i = 0,
                     len = list.length; i < len; i++) {
                var item = list[i];
                var obj = {
                    'type': 300,
                    'utype': ROLE_USER,
                    'cid': item.cid,
                    'uid': item.uid,
                    'msgId': item.msgId
                };
                arr.push(obj);
            }
            if (arr.length <= 0 || !JSON.stringify)
                return;
            $ajax({
                'url': '/chat/user/msg/ack.action',
                'dataType': 'json',
                'data': {
                    'content': JSON.stringify(arr),
                    'tnk': +new Date()
                },
                'type': 'POST'
            });
        };

        var getMessage = function() {
            $ajax({
                'url': '/chat/user/msg.action',
                'dataType': 'json',
                'data': {
                    'puid': puid,
                    'uid': global.apiInit.uid,
                    "token": +new Date()

                },
                'type': "get",
                success: function(ret) {
                    if (ret && ret.length) {
                        try {
                            var arr = [];
                            var messageArr = [];
                            for (var i = 0; i < ret.length; i++) {
                                var item = JSON.parse(ret[i]);

                                if (!item.msgId) {
                                    item.msgId = (+new Date()) + Math.random().toString(36).substr(2) + item.type;
                                }
                                if (messageCache[item.msgId]) {
                                    continue;
                                }
                                messageCache[item.msgId] = true;

                                arr.push(item);
                                if (item.type === 202) {
                                    messageArr.push(item);
                                }
                                if (item.type === 204) {
                                    var str = language['L10028'].replace("{0}", item.aname);
                                    listener.trigger("core.sessionclose", item.status);
                                    if (item.status == 2 || item.status == 4) {
                                        listener.trigger("core.system", {
                                            'type': 'system',
                                            'status': 'kickout',
                                            'data': {
                                                // 'content': "����ͷ�" + item.aname + "�ĻỰ�Ѿ��ر�"
                                                'content': str
                                            }
                                        });
                                    }
                                }
                            }
                            if (window.parent && global.urlParams.from === 'iframe' && messageArr.length > 0 && window.postMessage) {
                                window.parent.postMessage(JSON.stringify({
                                    'name': "zhichiReceive",
                                    'data': messageArr
                                }), "*");
                            }
                            messageConfirm(arr);
                            listener.trigger("core.onreceive", {
                                'type': socketType,
                                'list': arr
                            });
                        } catch (e) {
                            // console.log(e);
                            errorlogFun.runtimeError(e, 'onreceive.rolling', {
                                'type': socketType,
                                'list': arr
                            }, global);
                        }
                    }
                },
                error: function(ret, err) {
                    var img = new Image();
                    img.src = "images/static/errorlog.png?t=" + (+new Date()) + "&e=" + encodeURIComponent(err) + "&reponse=" + ret.responseText + "&uid=" + global.apiInit.uid;
                }
            });
            //timer = setTimeout(getMessage, 1500);
        };

        var bindListener = function() {
            listener.on("sendArea.send", onSend);
        };


        var initPlugins = function() {
            //getMessage();
            setInterval(getMessage, 1500);
            HearBeat(global);
        };
        var init = function() {
            bindListener();
            initPlugins();
        };
        init();
        this.getType = function() {
            return _self.type;
        }
        this.type = "rolling";
        this.destroy = destroy;
        this.start = getMessage;
    }

    module.exports = Rolling;
},{"../util/errorlog.js":26,"../util/listener.js":29,"../util/monitAjax.js":30,"./heartbeat.js":20}],23:[function(require,module,exports){
    /**
     * @author Treagzhao
     */
    var manager = null;
    var TIME_LIMIE = 5 * 1000 * 60;
    var isReady = false;
    var socketFactory = function(ret, global) {
        if (!!manager) {
            return manager;
        }
        var socketError = +new Date();
        if (window.localStorage) {
            socketError = +window.localStorage.getItem("websocketerror");
        }
        var websocketOk = true;
        if (socketError) {
            websocketOk = (+new Date() - socketError) > TIME_LIMIE;
        }
        var WebSocket = require('../socket/websocket.js');
        var Rolling = require('../socket/rolling.js');
        var urlList = ret['wslink.bak'];
        urlList.push(ret['wslink.default']);
        var url = ret['wslink.default'];
        if (window.WebSocket && websocketOk && (url.indexOf("ws:") >= 0 || url.indexOf("wss:") >= 0)) {
            manager = new WebSocket(ret.puid, urlList, url, global);
        } else {
            manager = new Rolling(ret.puid, ret['wslink.default'], global);
        }
        isReady = true;
        return manager;
    };
    socketFactory.isReady = function() {
        return isReady;
    }
    module.exports = socketFactory;
},{"../socket/rolling.js":22,"../socket/websocket.js":24}],24:[function(require,module,exports){
    /**
     * @author Treagzhao
     */
    var HearBeat = require("./heartbeat.js");

    function ZcWebSocket(puid, urlList, url, global) {
        this.puid = puid;
        var index = Math.floor(Math.random() * urlList.length);
        var socketType = 'human';
        var messageCache = {};
        var listener = require('../util/listener.js');
        var errorLogFun = require("../util/errorlog.js");
        var dateUtil = require('../util/date.js');
        var websocket;
        var CLOSE_DURATION = 1000 * 15;
        var SOCKET_TYPE_WEBSOCKET = 8;
        var timer, closeTimer;
        var language = global.language.lan;
        var _self = this;
        this.channelId = Math.random().toString(32).substr(2);
        //��������
        var kickout = false;
        var connRetryTime = 0,
            sendCount = 0,
            receiveCount = 0;
        var connStartTime = new Date();
        var TIMEOUT_DURATION = 5 * 1000;
        var ROLE_USER = 0;

        var retryList = {};

        var retry = function() {
            var now = +new Date();
            for (var el in retryList) {
                var item = retryList[el];
                if (now - item.sendTime >= TIMEOUT_DURATION) {
                    delete retryList[el];
                    listener.trigger("core.msgresult", {
                        'msgId': item.dateuid,
                        'result': 'fail'
                    });
                }
            }
        };

        var onSend = function(data) {
            var item = data;
            if (Object.prototype.toString.call(data).indexOf("Array") >= 0) {
                item = data[0];
            }
            if (item.currentStatus !== 'human') {
                return;
            }
            var d = !!item.date ? new Date(item.date) : new Date();
            item.t = +d;
            item.ts = dateUtil.formatDate(d, true);
            item.type = 103;
            item.msgId = item['dateuid'];
            item.sendTime = item.date;
            item.channelId = _self.channelId;
            item.content = item.answer;
            item.uname = global.userInfo.uname;
            var $div = $("<div></div>");
            $div.text(item.uname);
            item.uname = $div.html();
            item.face = global.userInfo.face;
            retryList[item.msgId] = item;
            sendCount++;
            websocket.send(JSON.stringify(item));
        };

        var ackConfirmMessageHandler = function(data) {
            listener.trigger("core.msgresult", {
                'msgId': data.msgId,
                'result': 'success'
            });
            delete retryList[data.msgId];
        };

        var commonMessageHandler = function(data) {
            listener.trigger("core.onreceive", {
                'type': socketType,
                'list': [data]
            });
        };
        var systemMessageHandler = function(data) {
            var str = language['L10028'].replace("{0}", data.aname);
            if (data.type == 204) {
                listener.trigger("core.sessionclose", data.status);
                // 2��4��6�������������ߣ�����Ҫ��������
                kickout = (data.status % 2 == 0);
                websocket.close();
                if (data.status == 2 || data.status == 4) {
                    listener.trigger("core.system", {
                        'type': 'system',
                        'status': 'kickout',
                        'data': {
                            'content': str
                        }
                    });
                }
            }
            listener.trigger("core.onreceive", {
                'type': socketType,
                'list': [data]
            });
        };

        var messageConfirm = function(data) {
            if (data.type == 301) {
                return;
            }
            var obj = {
                'type': 300,
                'msgId': data.msgId,
                'utype': ROLE_USER,
                'data': [data],
                'channelId': _self.channelId
            };
            try {
                websocket.send(JSON.stringify(obj));
            } catch (e) {

            }
        };



        var onMessage = function(evt) {
            if (evt.data === 'pong') {
                clearTimeout(closeTimer);
                closeTimer = setTimeout(function() {
                    websocket.close();
                }, CLOSE_DURATION);
                return;
            }
            receiveCount++;
            var data = JSON.parse(evt.data);
            if (messageCache[data.msgId + "_" + data.type]) {
                return;
            }
            var arr = [];
            if (data.type === 202) {
                arr.push(data);
            }
            if (window.top && global.urlParams.from === 'iframe' && arr.length > 0) {
                window.top.postMessage(JSON.stringify({
                    'name': "zhichiReceive",
                    'data': arr
                }), "*");
            }
            messageConfirm(data);
            if (!data.msgId) {
                data.msgId = +new Date() + Math.random().toString(36).substr(2) + data.type;
            }
            messageCache[data.msgId + "_" + data.type] = data;
            try {
                if (data.type == 301) {
                    ackConfirmMessageHandler(data);
                } else if (data.type == 202) {
                    commonMessageHandler(data);
                } else {
                    systemMessageHandler(data);
                }
            } catch (e) {
                errorLogFun.runtimeError(e, 'receive.websocket', data, global);
            }
        };

        var reConnect = function() {
            if (connRetryTime++ >= 3) {
                var str = language['L10003'].replace("{0}", '');
                listener.trigger("core.system", {
                    'type': 'system',
                    'status': 'kickout',
                    'data': {
                        // 'content': "������������ж�"
                        'content': str
                    }
                });
                listener.trigger("core.sessionclose", -4);
                return;
            }
            setTimeout(function() {
                var index = Math.floor(Math.random() * urlList.length);
                websocket = new WebSocket(url);
                websocket.onerror = onError;
                websocket.onopen = onOpen;
                websocket.onclose = onClose;
                websocket.onmessage = onMessage;
            }, 5000);
        };
        var onClosed = function(e) {
            // errorLogFun.specialError("websocket.close", 'websocket', {
            //     'wasClean': e.wasClean,
            //     'code': e.code,
            //     'reason': e.reason
            // }, global);
            if (window.localStorage && !kickout) {
                try {
                    window.localStorage.setItem("websocketerror", +new Date());
                } catch (e) {
                    errorLogFun.runtimeError(e, 'localStorage error', data, global);
                }
            }
            if (!kickout) {
                reConnect();
            }
        };

        var onOpen = function() {
            timer = setInterval(function() {
                websocket.send("ping");
            }, 5 * 1000);
            if (window.localStorage) {
                window.localStorage.removeItem("websocketerror")
            }
            var start = {
                "t": ROLE_USER,
                "u": global.apiInit.uid,
                'puid': puid,
                's': global.sysNum,
                'ts': +new Date()
            };
            var count = 0;
            for (var el in retryList) {
                count++;
            }
            connRetryTime = 0;
            websocket.send(JSON.stringify(start));
            for (var el in retryList) {
                var msg = retryList[el];
                websocket.send(JSON.stringify(msg));
            }
            setInterval(retry, 1000);
        };

        var onClose = function(e) {
            onClosed(e);
            clearTimeout(timer);
        };

        var onError = function(e) {
            // errorLogFun.specialError("websocket.close", 'websocket', {
            //     'wasClean': e.wasClean,
            //     'code': e.code,
            //     'reason': e.reason
            // }, global);
        };

        var bindListener = function() {
            websocket.onerror = onError;
            websocket.onopen = onOpen;
            websocket.onclose = onClose;
            websocket.onmessage = onMessage;
            listener.on("sendArea.send", onSend);
        };

        var init = function() {
            bindListener();
        };

        var destroy = function() {
            if (websocket) {
                websocket.close()
                clearTimeout(timer);
            }
        };

        var start = function() {
            websocket = new WebSocket(url);
            init();
            HearBeat(global);
        };



        var stop = function() {};
        this.getType = function() {
            return _self.type;
        }
        this.type = "websocket";
        this.destroy = destroy;
        this.start = start;
        this.stop = stop;
    };

    module.exports = ZcWebSocket;

},{"../util/date.js":25,"../util/errorlog.js":26,"../util/listener.js":29,"./heartbeat.js":20}],25:[function(require,module,exports){
    /**
     * @author Treagzhao
     */
    var dateUtil = {};

    var formatNum = function(num) {
        return (num >= 10) ? num + "" : "0" + num;
    };

    var formatTime = function(date) {
        var f = formatNum;
        var hour = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();
        var arr = [f(hour),f(minutes),f(seconds)];
        return arr.join(":");
    };

    var formatDate = function(date,showTime) {
        var f = formatNum;
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var arr = [f(year),f(month),f(day)];
        var hour = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();
        var arr2 = [f(hour),f(minutes),f(seconds)];
        return arr.join("-") + ( !showTime ? "" : " " + formatTime(date));
    };
    dateUtil.formatTime = formatTime;
    dateUtil.formatDate = formatDate;
    module.exports = dateUtil;

},{}],26:[function(require,module,exports){
    var that = {};
    var globalConfig = require("../config/config.json");
    var detect = require("../lib/detect.js");
    var encode = encodeURIComponent;
    var clientType = !!/Mobile/.test(window.navigator.userAgent) ? 'wap' : 'pc';
    var ua;

    var runtimeError = function(e, from, data, global) {
        var img = new Image();
        var queryString = "error=" + encode(e.toString());
        queryString += "&stack=" + encode(e.stack);
        queryString += "&from=" + from;
        queryString += "&os=" + ua.os.family;
        queryString += "&osVersion=" + ua.os.version;
        queryString += "&browser=" + ua.browser.family;
        queryString += "&browserVersion=" + ua.browser.version;
        queryString += "&type=" + clientType;
        queryString += "&uid=" + global.apiInit.uid;
        queryString += "&data=" + encode(JSON.stringify(data));
        queryString += "&pid=" + global.apiInit.pid;
        img.src = "//" + globalConfig.errorlogPath + "runtime?" + queryString;
    };


    var specialError = function(type, from_type, params, global) {
        var img = new Image();
        var queryStringArr = [];
        $.ajax({
            'url': '//' + globalConfig.errorlogPath + "special",
            'type': 'post',
            'dataType': 'json',
            'data': {
                'errorType': type,
                'from_type': from_type,
                'data': encode(JSON.stringify(params)),
                'pid': global.apiInit.pid,
                'type': clientType
            }
        });
    };


    var overTimeError = function(ret, url, data, time, reqType, global) {
        var img = new Image();
        var queryStringArr = [];
        queryStringArr.push("url=" + encode(url));
        queryStringArr.push("data=" + encode(JSON.stringify(data)));
        queryStringArr.push("pid=" + global.apiInit.pid);
        queryStringArr.push("duration=" + encode(time));
        queryStringArr.push("uid=" + encode(global.apiInit.uid));
        queryStringArr.push("type=" + clientType);
        queryStringArr.push("reqType=" + reqType);
        var queryString = queryStringArr.join("&");
        img.src = "//" + globalConfig.errorlogPath + "overtime?" + queryString;
    };

    var networkError = function(ret, url, data, reqType, global) {
        var img = new Image();
        var queryStringArr = [];
        queryStringArr.push("status=" + ret.status);
        queryStringArr.push("statusText=" + ret.statusText);
        queryStringArr.push("url=" + encode(url));
        queryStringArr.push("data=" + encode(JSON.stringify(data)));
        queryStringArr.push("pid=" + global.apiInit.pid);
        queryStringArr.push("responseText=" + encode(ret.responseText));
        queryStringArr.push("type=" + clientType);
        queryStringArr.push("uid=" + encode(global.apiInit.uid));
        queryStringArr.push("reqType=" + reqType);
        var queryString = queryStringArr.join("&");
        img.src = "//" + globalConfig.errorlogPath + "network?" + queryString;
    };
    (function() {
        var userAgent = window.navigator.userAgent;
        ua = detect.parse(userAgent);

    })();
    that.networkError = networkError;
    that.runtimeError = runtimeError;
    that.overTimeError = overTimeError;
    that.specialError = specialError;
    that.init = function() {};
    that.getFlag = function() {
        return false;
    }
    module.exports = that;

},{"../config/config.json":2,"../lib/detect.js":5}],27:[function(require,module,exports){
    function format(obj, depth) {
        var depth = depth || 0;
        var TAB = 4;
        if (typeof obj !== 'object') {
            throw 'not a json';
        }
        var type = Object.prototype.toString.call(obj);
        var str = '';
        if (/Array/.test(type)) {
            str = '[';
            var arr = [];
            for (var i = 0; i < obj.length; i++) {
                var item = obj[i];

                if (typeof item === 'object') {
                    try {
                        arr.push(format(item, depth));
                    } catch (e) {
                        continue;
                    }
                } else {
                    arr.push(item.toString());
                }
            }
            return str + arr.join(", ") + "]";
        } else if (/Object/.test(type)) {
            var tab = '',
                curTab = '';
            var arr = [],
                s;

            str = "{";
            var index = 0;
            for (var el in obj) {
                if (!obj.hasOwnProperty(el)) {
                    continue;
                }
                if (typeof obj[el] === 'number') {
                    s = "";
                    if (index > 0) {
                        s += ",";
                    }
                    s += "\"" + el + '":' + obj[el];
                    arr.push(s);
                } else if (typeof obj[el] === 'boolean') {
                    s = '';
                    if (index > 0) {
                        s += ",";
                    }
                    s += "\"" + el + '":' + obj[el];
                    // console.log('s', s);
                    arr.push(s);
                } else if (typeof obj[el] === 'string') {
                    s = '';
                    if (index > 0) {
                        s += ",";
                    }
                    s += "\"" + el + "\":\"" + obj[el] + "\"";
                    arr.push(s);
                } else if (typeof obj[el] === 'object') {
                    s = '';
                    try {
                        if (index > 0) {
                            s += ",";
                        }
                        s += "\"" + el + "\":" + format(obj[el], depth + 1);
                        arr.push(s);
                    } catch (e) {
                        continue;
                    }
                }
                index++;
            }
            str += arr.join("" + tab) + "" + curTab + "}";
            return (str);
        } else {
            throw 'not a json';
        }
    };

    module.exports = format;

},{}],28:[function(require,module,exports){
    var formatJSON = require("./formatJSON.js");

    function init() {

        var parse = function(str) {
            var obj;
            try {
                obj = eval("(" + str + ")");
            } catch (e) {}
            return obj;
        };


        var stringify = function(obj) {
            if(obj){
                var str = formatJSON(obj, 0);
                return str;
            }else{
                return '';
            }
        };
        if (!window.JSON) {
            window.JSON = {
                'parse': parse,
                'stringify': stringify
            };
        }
    };

    module.exports = init;

},{"./formatJSON.js":27}],29:[function(require,module,exports){
    /**
     * @author Treagzhao
     */
    var that = {};
    var cache = {};
    var trigger = function(channel,data) {
        if(cache[channel]) {
            for(var i = 0,
                    len = cache[channel].length;i < len;i++) {
                var listener = cache[channel][i];
                listener(data);
            }
        }
    };

    var on = function(channel,fn) {
        if(!cache[channel]) {
            cache[channel] = [];
        }
        var exists = false;
        var list = cache[channel];
        for(var i = 0,
                len = list.length;i < len;i++) {
            if(list[i] == fn) {
                exists = true;
                break;
            }
        }
        if(!exists) {
            cache[channel].push(fn);
        }
    };

    var off = function(channel,fn) {
        if(fn && typeof fn === 'function') {
            var list = cache[channel];
            if(list && list.length) {
                for(var len = list.length,
                        i = len - 1;i >= 0;i--) {
                    var listener = list[i];
                    if(listener == fn) {
                        list.splice(i,1);
                        break;
                    }
                }
            }
        } else {
            delete cache[channel];
        }
    };

    that.on = on;
    that.off = off;
    that.trigger = trigger;

    module.exports = that;

},{}],30:[function(require,module,exports){
    module.exports = function(global) {
        if (!global) {
            throw 'global is not defined';
        }
        return function(opts) {
            var TIMEOUT_DURATION = 5000;
            var errorLogFun = require("./errorlog.js");
            var that = {};

            var spec = $.extend({
                'url': '',
                'data': {}
            }, opts);
            var startDate = new Date();

            if (spec.success) {
                that.successCallback = spec.success;
                delete spec.success;
            }
            if (spec.fail) {
                that.failCallback = spec.fail;
                delete spec.fail;
            }
            if (spec.error) {
                that.failCallback = spec.error;
                delete spec.error;
            }
            var url = spec.url;
            var params = spec.data;
            spec.success = function(ret) {
                var endTime = new Date();
                var duration = (new Date() - startDate);
                if (duration >= TIMEOUT_DURATION) {
                    errorLogFun.overTimeError(ret, url, params, duration, spec.type, global);
                }
                that.successCallback && that.successCallback(ret);
            };
            spec.error = function(ret) {
                errorLogFun.networkError(ret, url, params, spec.type, global);
                that.failCallback && that.failCallback(ret);
            };
            $.ajax(spec);
            that.success = function(cbk) {
                that.successCallback = cbk;
                return that;
            }

            that.fail = function(cbk) {
                that.failCallback = cbk;
                return that;
            }
            return that;
        };
    }

},{"./errorlog.js":26}],31:[function(require,module,exports){
    function Promise() {
        var list = [];
        var _self = this;
        this.resolve = function(value) {
            var item = list.shift();
            item && item.success && typeof item.success === 'function' && item.success(value, _self);
        };
        this.reject = function(value) {
            var item = list.shift();
            item && item.fail && typeof item.fail === 'function' && item.fail(value, _self);
        };
        this.then = function(successCbk, failCbk) {
            list.push({
                'success': successCbk,
                'fail': failCbk
            });
            return _self;
        }
    };

    Promise.when = function(cbk) {
        return cbk();
    }


    module.exports = Promise;

},{}],32:[function(require,module,exports){
    var Core = function(window) {
        var promise = require('../../../common/initConfig.js')("wap");
        var ManagerFactory = require('../../../common/mode/mode.js');
        var manager;
        // require('../../../common/util/baiduLog.js')();
        require("../../../common/util/initJSON.js")();
        var heartBeat = require('../../../common/socket/heartbeat.js');
        var $evtDom;
        var global;
        var listener = require('../../../common/util/listener.js');

        var parseDOM = function() {};

        var bindListener = function() {
            listener.on("system.send", function(data) {});
        };

        var initPlugins = function() {
            manager = ManagerFactory(global);
            // initWap = initWap(global);
        };

        //FIXME ͨ��initConfig��ʼ���������H5��������
        var init = function() {
            parseDOM();
            bindListener();
            initPlugins();
        };
        promise.then(function(data) {
            $(".white-layer").remove();
            $(document.body).trigger("core.onload", [{
                data: data
            }]);
            global = data;
            listener.trigger('core.onload', [global]);
            init();
        });
    };
    module.exports = Core;

},{"../../../common/initConfig.js":3,"../../../common/mode/mode.js":13,"../../../common/socket/heartbeat.js":20,"../../../common/util/initJSON.js":28,"../../../common/util/listener.js":29}],
    33:[function(require,module,exports){
    (function(node) {
        var core = require('./core/core.js')(window, "wap");
        var listMsg = require('./listMsg/main.js');
        var sendArea = require('./sendArea/index.js');
        require('./fun/closesession.js');
        var parseDOM = function() {

        };

        var initPlugins = function() {
            listMsg();
            //�Ự�б�
            sendArea(window);
        };
        var bindListener = function() {
            $(window).on("resize", function(e) {});
        };

        var init = function() {
            parseDOM();
            initPlugins();
            //$(document.body).append('<iframe style="display:none;" src="https://apptry.evertb.com/zc.html"></iframe>');
        };
        init();
    })(document.body);
},
        {"./core/core.js":32,"./fun/closesession.js":34,"./listMsg/main.js":38,"./sendArea/index.js":57}],34:[function(require,module,exports){
    /*(function() {
     var listener = require('../../../common/util/listener.js');
     var endSessionHandler=function(status){
     var status = ret;
     switch(status) {
     case -1:
     //alert('���˹�ģʽ��ת�˹�ʧ��');
     break;
     case 1://�ͷ��Լ�������
     case 2://�ͷ�����T��
     case 3://�ͷ�����������
     case 4://��ʱ�䲻˵��
     case 6://���´��ڴ�
     $chatArea.removeClass("hideChatArea").addClass("showChatArea");
     $keepSession.hide();
     $endSession.show();
     autoSizePhone();
     sessionEnd=true;
     break;
     }
     };
     var bindListener = function() {
     listener.on("core.sessionclose",endSessionHandler);
     };

     var init = function() {
     bindListener();
     };

     init();
     })();
     */
},{}],35:[function(require,module,exports){
// @author denzelj  170109

    var EvaluateRobot = function(global, node) {
        var $node = node;
        var cid = global.apiInit.cid,
            uid = global.apiInit.uid;

        var api = {
            'iEvaluate': '/chat/user/rbAnswerComment.action' //����������
        };
        var language = global.language.lan,
            languageText = global.language.text;

        //�����¼�
        var onTapEvaluate = function(e) {
            var $evt = $(e.target);
            var $parent = $evt.parents('.js-msgOuter');
            var type = $evt.attr('data-id')
            if (type == 1 || type == -1) {
                var docId = $parent.attr('data-docid'),
                    docName = $parent.attr('data-docname'),
                    robotFlag = $parent.attr('data-robotflag'),
                    msgId = $parent.attr('data-msgid');
                var data = {
                    uid: uid,
                    cid: cid,
                    docId: docId,
                    docName: docName,
                    status: type,
                    robotFlag: robotFlag,
                    msgId: msgId
                };
                $.ajax({
                    type: "post",
                    url: api.iEvaluate,
                    dataType: "json",
                    data: data,
                    success: function(ret) {
                        $evt.parents('.js-evaluate-wrap').find('.js-tap-evaluate').addClass('hide').siblings('.js-evaluated-outer').addClass('show');
                        //ustatus-�û�״̬  -1 �������  1 ���˹�  0 δ�����Ự
                        // status-��Ӧ״̬(1-�ɹ���0-ʧ��)
                        if (ret && ret.status) {
                            switch (ret.status) {
                                case 1: //���۳ɹ�
                                    if (type == 1)
                                        $evt.siblings('.js-evaluated-outer').text(languageText['T0070']);
                                    else if (type == -1)
                                        $evt.siblings('.js-evaluated-outer').text(languageText['T0071']);
                                    break;
                                case 2: //������
                                    $evt.siblings('.js-evaluated-outer').text(languageText['T0074']);
                                    break;
                                case -1: //����ʧ��
                                    $evt.siblings('.js-evaluated-outer').text(languageText['T0073']);
                                    break;
                            }
                        } else {
                            $evt.siblings('.js-evaluated-outer').text(languageText['T0072']);
                        }
                    }
                });
            }
        };
        var bindListener = function() {
            $node.delegate('.js-tap-evaluate', 'touchend', onTapEvaluate);
        }
        var init = function() {
            bindListener();
        };

        init();
    }

    module.exports = EvaluateRobot;

},{}],36:[function(require,module,exports){
//denzel 20170227
    var mutex = true;
    var Goods = function(global, myScroll) {

        var UpdateChatMsgHandler = require('./updateChatMsg.js'),
            msgTemplate = require('./template.js'),
            listener = require("../../../common/util/listener.js");

        var language = global.language.lan,
            languageText = global.language.text;

        var cid = global.apiInit.cid,
            uid = global.apiInit.uid;

        var cacheGoodsInfo; //�洢�û���Ʒ��Ϣ

        updateChatMsgHandler = UpdateChatMsgHandler(global, myScroll);
        // 1 ����  tite_info
        // 2 ҳ���ַ  url_inof
        // 3 ժҪ abstract_info
        // 4 ��ǩ label_info
        // 5 ����ͼ thumbnail_info
        var updateChatMsgHandler; //������Ϣ����
        var urlParams = {
            title_info: decodeURIComponent(global.urlParams.title_info || ''),
            url_info: decodeURIComponent(global.urlParams.url_info || ''),
            abstract_info: decodeURIComponent(global.urlParams.abstract_info || ''),
            label_info: decodeURIComponent(global.urlParams.label_info ? global.urlParams.label_info : ''),
            thumbnail_info: decodeURIComponent(global.urlParams.thumbnail_info || '')
            //https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1488261383650&di=2380758f1022811e34b360b5ffd393f4&imgtype=0&src=http%3A%2F%2Fwww.dabaoku.com%2Fsucaidatu%2Fdongwu%2Fchongwujingling%2F953838.JPG
        };

        var forMatText = {
            'title_info': languageText['T0099'],
            'abstract_info': languageText['T0100'],
            'label_info': languageText['T0101'],
            'url_info': languageText['T0102']
        };

        //dom
        var $node,
            $goodsWrap,
            $goodsDetail,
            $goodsTitle,
            $goodsAbstract,
            $goodsSend,
            $goodsThum,
            $goodsLabel;
        /** 1 ����+��ַ+ժҪ+��ǩ+����ͼ
         *  2 ����+��ַ+ժҪ+��ǩ
         *  3 ����+��ַ+����ͼ+ժҪ
         *  4 ����+��ַ+����ͼ+��ǩ
         *  5 ����+��ַ+����ͼ
         *  6 ����+��ַ+ժҪ
         *  7 ����+��ַ+��ǩ
         *  8 ����+��ַ
         **/
        var status = 0; //״ֵ̬  0 ������ʾ
        if (urlParams.title_info && urlParams.url_info) {
            if (urlParams.abstract_info && urlParams.label_info && urlParams.thumbnail_info) {
                status = 1;
            } else if (urlParams.abstract_info && urlParams.label_info) {
                status = 2;
            } else if (urlParams.thumbnail_info && urlParams.abstract_info) {
                status = 3;
            } else if (urlParams.thumbnail_info && urlParams.label_info) {
                status = 4;
            } else if (urlParams.thumbnail_info) {
                status = 5;
            } else if (urlParams.abstract_info) {
                status = 6;
            } else if (urlParams.label_info) {
                status = 7;
            } else {
                status = 8;
            }
        } else {
            status = 0;
        }

        var stringFormat = function(str, args) {
            var index = 0,
                reg = /{\d+}/g;
            return str.replace(reg, function(e) {
                var res = args[index++];
                return res;
            });
        };
        //�ж�չ����ʽ
        var goodsSwitchServ = function() {
            // status = 5;
            switch (status) {
                case 1:
                    break;
                case 2:
                    $goodsThum.remove();
                    $goodsDetail.addClass('width');
                    $goodsTitle.addClass('margin-left');
                    $goodsAbstract.addClass('margin-left');
                    $goodsLabel.addClass('margin-left');
                    break;
                case 3:
                    $goodsLabel.remove();
                    break;
                case 4:
                    $goodsAbstract.remove();
                    break;
                case 5:
                    $goodsLabel.remove();
                    $goodsAbstract.remove();
                    break;
                case 6:
                    $goodsThum.remove();
                    $goodsLabel.remove();
                    $goodsDetail.addClass('width');
                    break;
                case 7:
                    $goodsThum.remove();
                    $goodsAbstract.remove();
                    $goodsDetail.addClass('width');
                    break;
                case 8:
                    $goodsThum.remove();
                    $goodsAbstract.remove();
                    $goodsLabel.remove();
                    $goodsDetail.addClass('width');
                    break;
                default:
                    return;
            }
            $goodsWrap.addClass('show');
        };

        var forMatMsg = function(args) {
            args = args || [];
            var str = '[{0}]{0}',
                retStr = [],
                retText = [];

            for (var i = 0; i < args.length; i++) {
                retStr.push(str);
                retText.push(forMatText[args[i]], urlParams[args[i]]);
            }
            retStr = retStr.join('<br />');
            return stringFormat(retStr, retText);
        };
        //��ȡ�����Ʒ��Ϣ�����Ϣ��
        var getAnswerServ = function() {
            var ret = '';
            switch (status) {
                case 1:
                case 2:
                    ret = forMatMsg(['title_info', 'abstract_info', 'label_info', 'url_info']);
                    break;
                case 3:
                case 6:
                    ret = forMatMsg(['title_info', 'abstract_info', 'url_info']);
                    break;
                case 4:
                case 7:
                    ret = forMatMsg(['title_info', 'label_info', 'url_info']);
                    break;
                case 5:
                case 8:
                    ret = forMatMsg(['title_info', 'url_info']);
                    break;
            }
            return ret;
        };

        //������Ʒ��Ϣ
        var onGoodsSendHandler = function(e) {
            if (e && $(e.target).hasClass('js-goods-send')) {
                var tStr = +new Date();
                var date = uid + tStr;
                setTimeout(function() {
                    var res = getAnswerServ();
                    listener.trigger('sendArea.send', [{
                        'answer': res || '',
                        'uid': uid,
                        'cid': cid,
                        'dateuid': date,
                        'date': tStr,
                        'token': "",
                        'sendAgain': false,
                        'currentStatus': 'human'
                    }]);
                }, 200);
            }
        };
        var parseDom = function() {
            var data = {
                'title': urlParams.title_info,
                'url': urlParams.url_info,
                'abstract': urlParams.abstract_info,
                'label': urlParams.label_info,
                'thum': urlParams.thumbnail_info
            };
            var ret = doT.template(msgTemplate.goods1Html);
            var html = ret(data);
            updateChatMsgHandler.appendGoods(html);
            $node = $('.js-chatPanelList');
            $goodsWrap = $node.find('.js-goods-wrap');
            $goodsDetail = $node.find('.js-goods-detail');
            $goodsTitle = $node.find('.js-goods-title');
            $goodsLabel = $node.find('.js-goods-label');
            $goodsSend = $node.find('.js-goods-send');
            $goodsThum = $node.find('.js-goods-thum');
            $goodsAbstract = $node.find('.js-goods-abstract');

            //������ɫ
            $goodsLabel.css('color', global.apiConfig.color);
            $goodsSend.css('background-color', global.apiConfig.color);
        };
        var bindListener = function() {
            $node.delegate($goodsSend, 'touchend', onGoodsSendHandler);
        };
        var initPlugsin = function() {
            goodsSwitchServ();
        };
        var init = function() {
            parseDom();
            bindListener();
            initPlugsin();
        };
        if (mutex) {
            mutex = false;
            init();
        }
    };
    module.exports = Goods;

},{"../../../common/util/listener.js":29,"./template.js":50,"./updateChatMsg.js":54}],37:[function(require,module,exports){
    var LoadHistoryHandler = function(global, myScroll) {

        var That = {};

        //ȱʡͼƬ��
        var imgHanlder = {
            userLogo: '//img.sobot.com/console/common/face/user.png'
        };
        //dom Ԫ��
        var chatPanelList,
            scrollChatList;

        var language = global.language.lan,
            languageText = global.language.text;

        var Comm = require('../../../common/comm.js');
        var msgTemplate = require('./template.js');
        var QQFace = require('../util/qqFace.js')();
        var TimeLineHandler = require('./timeLineHandler.js');
        var multiTemplate = require('./multiTemplate.js');
        var multiConvItem = require('./multiConvItem')(global, myScroll);

        var localData = {}; //�洢������ʱ������

        var timeLineHandler;

        var noteFlag = true;

        var initOfflineMessageBubble = function(count) {
            if (count < 10)
                return;
            var spanHtml = doT.template(msgTemplate.offlineMessageTipBubble)({
                'count': count,
                'msgTxt': languageText['T0058']
            });
            var $span = $(spanHtml);
            if (global.urlParams.back == 1 && global.urlParams.from !== 'iframe') {
                $span.css("top", 50);
            }
            $(".js-wrapper").append($span);
            $span.on('click', function() {
                $span.remove();
                $(".js-textarea").blur();
                if ($(".seperator-line").length > 0) {
                    setTimeout(function() {
                        var top = $(".seperator-line").offset().top - $(".js-chatMsgList").offset().top;
                        myScroll.scrollTo(-top);
                    }, 1000);
                }
            });
        };
        //չʾ��ʷ��¼ type �����жϼ��ص�һҳ����
        //isFirstData �Ƿ��Ǹս���ҳ��
        var loadHistory = function(data, isFirstData, cbk, goodsFlag) {
            var comf,
                sysHtml = '',
                dataLen = data.length,
                item = '',
                itemLan = 0,
                itemChild = '',
                msgHtml = '',
                userLogo = '',
                customLogo = '',
                oldTime = '', //��һ��ʱ��
                tempHtml = '',
                imgStatus = '', //��Ϣ�Ƿ�ΪͼƬ
                reg = /target="_self"/g;
            var htmlTags = ['<a', '<img', '<audio', '<frame', '<video'];
            var offlineMessageCount = 0;
            if (data && data.length > 0) {
                for (var i = 0; i < dataLen; i++) {
                    item = data[i].content;
                    itemLan = item.length;
                    for (var j = 0; j < itemLan; j++) {
                        itemChild = item[j];
                        imgStatus = '';
                        var index = -1;
                        var res;
                        var htmlMutex = false;
                        if (itemChild.msgType != 9 && itemChild.msgType != 10) {
                            itemChild.msg = itemChild.msg + '';
                            index = itemChild.msg.indexOf('uploadedFile');
                            htmlTags.forEach(function(item) {
                                if (itemChild.msg.indexOf(item) >= 0) {
                                    htmlMutex = true;
                                }
                            });
                        }
                        if (itemChild.msgType == 'offline') {
                            offlineMessageCount++;
                        }
                        if (index >= 0) {
                            //ͼƬ���ļ� �ϴ�
                            if (itemChild.msg.indexOf('<img') >= 0) {
                                res = itemChild.msg;
                            } else {
                                res = $('<div></div>').html(itemChild.msg).text();
                            }
                        } else if (htmlMutex) {
                            //���ı�
                            res = itemChild.msg;
                            if (itemChild.msg.indexOf('audio') >= 0) {
                                //��������
                                res = '<div class="audio">' + itemChild.msg + '</div>';
                            }
                        } else {
                            if (itemChild.msgType != 9 && itemChild.msgType != 10)
                                res = Comm.getNewUrlRegex(itemChild.msg);
                        }
                        //�жϼ����Ƿ���ͼƬ
                        if (res.indexOf('webchat_img_upload') >= 0) {
                            imgStatus = "imgStatus";
                        }
                        if (itemChild.senderType == -1) {
                            //������Ϣ�ָ���
                            itemChild.msgTxt = languageText['T0059'];
                            msgHtml = doT.template(msgTemplate.seperatorTemplate)(itemChild);
                        } else if (itemChild.senderType === 0) {
                            //-------�ͻ�---------
                            if (itemChild.msgType === 10) {
                                //���ֻỰ
                                var multiData;
                                if (typeof itemChild.msg === 'object') {
                                    multiData = (itemChild.msg.interfaceRetList || itemChild.msg.inputContentList) || [];
                                    res = multiData[0].title || '';
                                } else {
                                    res = itemChild.msg;
                                }
                            }
                            var _img;
                            if (global.userInfo.face) {
                                _img = global.userInfo.face;
                            } else {
                                //senderFace �����п�����"null"�ַ��� �ȽϹ���
                                _img = itemChild.senderFace && itemChild.senderFace != 'null' ? itemChild.senderFace : imgHanlder.userLogo;
                            }
                            comf = $.extend({
                                'userLogo': _img,
                                'userMsg': QQFace.analysisRight(res),
                                'date': itemChild.t,
                                'imgStatus': imgStatus,
                                'msgLoading': global.MSGSTATUSCLASS.MSG_SERVED //��ʷ��¼ ��Ƿ��ͳɹ�
                            });
                            msgHtml = doT.template(msgTemplate.rightMsg)(comf);
                        } else if (itemChild.senderType == 3) { //��ӭ��֧����������
                            comf = $.extend({
                                'customLogo': itemChild.senderFace && itemChild.senderFace != 'null' ? itemChild.senderFace : global.apiConfig.robotLogo,
                                'customName': itemChild.senderName,
                                'list': itemChild.list,
                                'isHistory': false,
                                'stripe': itemChild.stripe,
                                'answer': itemChild.msg
                            });
                            localData.sugguestionHTML = doT.template(msgTemplate.listSugguestionsMsg)(comf);
                        } else {
                            //----������ �ͷ�------
                            if (itemChild.msgType === 9) {
                                var tempFlag = false;
                                var multiData = itemChild.msg;
                                var temp = multiTemplate['temp' + (multiData.template + 1)];
                                var htmlFn = '',
                                    htmlStr = '';
                                if (multiData.interfaceRetList) {
                                    //�ӿ�
                                    htmlFn = doT.template(temp);
                                    htmlStr = htmlFn(multiData);
                                    tempFlag = false;
                                    switch (multiData.retCode) {
                                        case '000000':
                                            switch (multiData.template) {
                                                case 0:
                                                case 2:
                                                    tempFlag = true;
                                                    multiData.answer = multiData.remindQuestion || multiData.answerStrip;
                                                    break;
                                                case 1:
                                                case 3:
                                                case 4:
                                                    tempFlag = false;
                                                    multiData.answer =htmlStr;
                                                    break;
                                            }

                                            break;
                                        case '000001':
                                            multiData.answer = multiData.retErrorMsg;
                                            htmlStr = multiData.remindQuestion;
                                            tempFlag = false;
                                            break;
                                        case '000002':
                                            multiData.answer = multiData.remindQuestion;
                                            htmlStr = multiData.remindQuestion;
                                            tempFlag = false;
                                            break;
                                    }
                                    msgHtml = multiConvItem.htmlFormat(multiData, htmlStr, tempFlag, true);
                                } else if (multiData.inputContentList) {
                                    //��д
                                    htmlFn = doT.template(multiTemplate.temp2_manual);
                                    htmlStr = htmlFn(multiData);
                                    multiData.answer = htmlStr;
                                    msgHtml = multiConvItem.htmlFormat(multiData, htmlStr, false, true);
                                } else {
                                    multiData.answer = multiData.remindQuestion || multiData.answerStrip || multiData.retErrorMsg;
                                    msgHtml = multiConvItem.htmlFormat(multiData, multiData.answer, false, true);
                                }
                            } else {
                                comf = $.extend({
                                    'customLogo': itemChild.senderFace && itemChild.senderFace != 'null' ? itemChild.senderFace : global.apiConfig.robotLogo,
                                    'customName': itemChild.senderName,
                                    'customMsg': QQFace.analysis(res, global),
                                    'imgStatus': imgStatus,
                                    'date': itemChild.t
                                });
                                msgHtml = doT.template(msgTemplate.leftMsg)(comf);
                            }
                        }
                        if (itemChild.senderType != 3) { //�����ﲻ��Ҫ��ʱ���ߺ�׷��html
                            msgHtml = timeLineHandler.getTimeLine(data, itemChild.ts, oldTime) + msgHtml;
                            oldTime = itemChild.ts;
                            tempHtml = (tempHtml + msgHtml).replace(reg, 'target="_blank"');
                        }
                    }
                }
                initOfflineMessageBubble(offlineMessageCount);
                updateChatList(tempHtml, isFirstData, goodsFlag);
                multiConvItem.resizeWidth($('.js-chatMsgList'));//������
            } else {
                //û�и�����Ϣ
                if (isFirstData) {
                    updateChatList('', true, false);
                }
                global.flags.moreHistroy = false;
            }
            cbk && cbk();
        };
        var sugMutex = true;
        //����������Ϣ�б�
        var updateChatList = function(tmpHtml, isFirstData, goodsFlag) {
            var _chatPanelList = chatPanelList,
                _chatPanelChildren = _chatPanelList.children();
            if (_chatPanelChildren && _chatPanelChildren.length && !goodsFlag) {
                chatPanelList.children().first().before(tmpHtml);
            } else {
                chatPanelList.append(tmpHtml);
            }
            //ˢ��
            //�״ν�����ؼ�¼
            if (isFirstData & global.apiInit.ustatus!=-1) {
                if (global.apiConfig.announceMsgFlag) {
                    var _msg = global.apiConfig.announceMsg || '�ڴ����¹���';
                    var note = $('.chatMsgList').find('.js-notice');
                    if (note.length <= 0) {
                        if (global.apiConfig.announceTopFlag) {
                            //�ö�
                            var notice = $('.js-notice'),
                                noticeMsg = $('.js-notice-msg'),
                                btn = $('.js-status-btn'),
                                dropdown = $('.js-pullDown'),
                                dropwdownTitle = $('.js-pullDownLabel');
                            notice.css('display', 'block');
                            dropdown.css('height', 100);
                            dropwdownTitle.css('margin-top', 60);
                            if (global.urlParams.back) {
                                //back=1
                                $('.js-notice').css('top', 50);
                            }
                            noticeMsg.html(_msg);
                            if (global.apiConfig.announceClickUrl && global.apiConfig.announceClickFlag) {
                                noticeMsg.attr("href", global.apiConfig.announceClickUrl);
                            }
                            notice.find('img').hide();
                            notice.on('click', function(e) {
                                var el = $(e.currentTarget),
                                    h = 60;
                                if (noticeMsg.hasClass('expand')) {
                                    noticeMsg.removeClass('expand')
                                    btn.addClass('collpase');
                                    notice.find('img').show();
                                    notice.addClass('scroll');
                                    h = 'auto';
                                    btn.text('����');
                                } else {
                                    noticeMsg.addClass('expand');
                                    btn.removeClass('collpase');
                                    notice.find('img').hide();
                                    notice.removeClass('scroll');
                                    h = 60;
                                    btn.text('չ��');
                                }
                                el.css('height', h);
                            });
                        } else {
                            //Ƕ����������
                            _msg = _msg.replace(/<a/g, '<a target="_blank"');
                            comf = $.extend({
                                'msg': _msg
                            });
                            var _h = doT.template(msgTemplate.noteTemp)(comf);
                            if ($('.js-chatPanelList .msgwrap')[0])
                                $('.js-chatPanelList .msgwrap').eq($('.msgwrap').length - 1).before(_h);
                            else
                                $('.js-chatPanelList').before(_h);
                            var styles = window.getComputedStyle($('.js-note-msg')[0], null);
                            var lineHeight = parseInt(styles.lineHeight, 10);
                            var height = parseInt(styles.height, 10);
                            var lineCount = Math.round(height / lineHeight);
                            if (lineCount > 5) {
                                //��ʾչ����ť
                                $('.js-note-msg').addClass('mui-ellipsis-5');
                                $('.js-flips').addClass('show');
                                $('.js-notice').addClass('padding-bottom');
                            } else {
                                $('.js-flips').removeClass('show');
                            }
                        }
                    }
                }

                //if (chatPanelList.children().length <= 3 && localData.sugguestionHTML && global.apiConfig.announceMsgFlag) {
                //ֻ�л�ӭ�� ���ʱ����
                // var tmsg = timeLineHandler.getTimeLine(null, new Date(), false, true);
                // chatPanelList.append(tmsg);
                //}
                var _last = $('.js-chatPanelList > :last-child');
                _last.after(localData.sugguestionHTML || '');
                if (sugMutex) {
                    if (!_last.hasClass('sysData')) {
                        var tmsg = timeLineHandler.getTimeLine(null, new Date(), false, true);
                        chatPanelList.append(tmsg);
                    }
                    $('.js-chatPanelList  > div:last-child').after(localData.sugguestionHTML || ''); //������
                }
                sugMutex = false;
                myScroll.myRefresh();
            } else {
                // return;
                setTimeout(function() {
                    var _y = -($(scrollChatList).height() - global.scrollerInitHeight);
                    if (isFirstScroll) {
                        isFirstScroll = false;
                        defaultHeight = global.scrollerInitHeight;
                    }
                    currentHeight = -($(scrollChatList).height() - defaultHeight);
                    myScroll.scroll.scrollTo(0, _y - 50);
                    myScroll.scroll.maxScrollY = currentHeight - 50;
                    global.scrollerInitHeight = $(scrollChatList).height();
                    myScroll.myRefresh();
                }, 1500);
            }
        };

        var currentHeight, //��ǰ�߶�
            defaultHeight, //Ĭ�ϸ߶�
            isFirstScroll = true;

        That.loadHistory = loadHistory;

        var parseDom = function() {
            chatPanelList = $('.js-chatPanelList');
            scrollChatList = $('.js-scroller');
        };
        var initPlugins = function() {
            timeLineHandler = TimeLineHandler(global, myScroll);
        };
        var init = function() {
            parseDom();
            initPlugins();
        };
        init();
        return That;
    };
    module.exports = LoadHistoryHandler;
},{"../../../common/comm.js":1,"../util/qqFace.js":66,"./multiConvItem":42,"./multiTemplate.js":43,"./template.js":50,"./timeLineHandler.js":52}],38:[function(require,module,exports){
    /*
     * @author denzel
     */
    var ListMsgHandler = function() {
        var global,
            scrollHanlder;

        var language, languageText;
        var Comm = require('../../../common/comm.js');
        var fnEvent = require('../../../common/util/listener.js');
        var msgTemplate = require('./template.js');
        var ManagerFactory = require('../../../common/mode/mode.js');
        var Promise = require('../../../common/util/promise.js');
        var theme = require('./theme.js');
        var Scroll = require('./scroll.js');
        var QQFace = require('../util/qqFace.js')();
        var MessageHandler = require('./msghandler.js');
        var manualHandler = require('./manualHandler.js');
        var TimeLineHandler = require('./timeLineHandler.js');
        var unReadHandler = require('./unReadHandler.js');
        var LoadHistoryHandler = require('./loadHistoryHandler.js');
        var UpdateChatMsgHandler = require('./updateChatMsg.js');
        var NoticeHandler = require('./noticeHandler.js');
        var PushGoodsInfo = require('./pushGoodsInfo.js');

        var evaluateRobot = require('./evaluateRobot.js');

        var systemHandler, //ϵͳģ��
            timeLineHandler,
            loadHistoryHandler,
            updateChatMsgHandler,
            noticeHandler, //��Ϣͨ��
            messageHandler, //��Ϣģ��
            pushGoodsInfo; //����Ӫ������

        //��Ϣ״̬-��
        var MSGSTATUSCLASS = {
            MSG_LOADING: 'msg-loading', //���ڷ���
            MSG_LSSUED: 'msg-lssued', //�ѷ���
            MSG_SERVED: 'msg-served', //���ʹ�
            MSG_FAIL: 'msg-fail', //����ʧ��
            MSG_CLOSE: 'msg-close', //�رշ���  ͼƬ����
            MSG_SENDAGAIN: 'msg-sendAgain' //�ط�ͼƬ
        };

        // queue:�û��ų���  offline:�ͷ�������  blacklist:������
        var sysMsgList = ['queue', 'offline', 'blacklist', 'evaluated', 'firstEvaluate']; //����ϵͳ��ʾ�����״̬��

        //DomԪ��
        var topTitleBar, //������
            userChatBox, //�û��������ݱ���ɫ
            chatMsgList, //���촰��
            wrapScroll, //��������
            scrollChatList, //��������
            pullDown, //����ˢ��
            chatPanelList, //�����б�
            progress, //������
            shadowLayer, //�ϴ�ͼƬ�ɰ�
            wrapBox; //ҳ��
        //api�ӿ�
        // var api = {
        //     url_keepDetail: '/chat/user/getChatDetailByCid.action',
        //     url_detail: '/chat/user/chatdetail.action'
        // };
        //ȱʡͼƬ��
        var imgHanlder = {
            userLogo: '//img.sobot.com/console/common/face/user.png'
        };
        //��ʼ�� scroll���
        var initScroll = function() {
            scrollHanlder.scroll.on("scroll", function() {
                var scroll = this;
                var y = scroll.y,
                    maxY = scroll.maxScrollY - y;

                if ($(".seperator-line").length <= 0) return;
                var top = $(".seperator-line").offset().top - $(".js-chatMsgList").offset().top;
                var limitTop = 10;
                if (global.urlParams.back == 1 && global.urlParams.from !== 'iframe') {
                    limitTop = 35;
                }
                if (Math.abs(y) <= top - limitTop) {
                    $(".offline-message-bubble").remove();
                }
            });
            scrollHanlder.scroll.on('slideDown', onPullDown);
            global.flags.moreHistroy = true;
        };

        //����ˢ��
        var onPullDown = function() {
            scrollHanlder.pullDown(function(data) {
                $(".seperator-line").remove();
                if (data.length > 0) {
                    loadHistoryHandler.loadHistory(data, 0);
                    setTimeout(function() {
                        $(pullDown).removeClass('loading');
                        $(pullDown).text(languageText['T0002']);
                    }, 800);
                    global.flags.moreHistroy = true;
                } else {
                    //û����ʷ��¼
                    global.flags.moreHistroy = false;
                }
            });
        };

        //����titleֵ
        var settingTitle = function(ret) {
            //titleFlag  1 ��ҵ���� ��Ĭ�ϣ�  2 �̶��İ�  3 �ͷ��ǳ� ���˹��������ˣ�
            var _jsTitleFlag = global.urlParams.titleFlag || 1,
                _jsTitle = global.urlParams.customTitle || ret.senderName;
            var _title;
            switch (_jsTitleFlag) {
                case 1:
                    _title = global.apiConfig.companyName;
                    break;
                case 2:
                    _title = _jsTitle;
                    break;
                case 3:
                    _title = ret.senderName;
                    break;
                default:
                    _title = global.apiConfig.companyName;
                    break;
            }
            $('.js-title').text(_title);
            // document.title = languageText['T0012'] + global.apiConfig.companyName;   //����ǰ׺ "��ѯ�ͷ�-"
            document.title = _title;
        }
        var timer;
        //�ӻ�ӭ��
        var getHello = function(data) {
            //�ж����ܻ����˻����˹��ͷ� 1 robot 2 human
            //����Ӫ�����������ͻ�push�ض�URL����Ӫ����Ʒ��Ϣ
            var status = global.apiInit.ustatus,
                robotFlag = false;
            data.forEach(function(item) {
                if (item.content[0].senderType === 1) {
                    robotFlag = true;
                }
            });
            if (global.urlParams.rput == '1') {
                // if (status === 0 && global.urlParams.rput == '1') {
                pushGoodsInfo.loaded(function(flag) { //�Ƿ������������Ʒ��Ϣ  1 ��ʾ�����
                    helloFn(data, flag);
                });
            } else {
                helloFn(data, 0);
            }
        };
        var helloFn = function(data, flag) {
            if (data && data.length) {
                var _data = data[data.length - 1].content[0];
                global.currentState = _data.senderType;
                settingTitle(_data);
                //FIXME ��ȡ���һ���ͷ�������Ϣ ������ OR  �˹��ͷ�
                global.apiConfig.customInfo = {
                    type: "human",
                    data: {
                        aface: _data.senderFace,
                        aname: _data.senderName,
                        content: "",
                        status: 1
                    }
                };
            }
            loadHistoryHandler.loadHistory(data, 1, function() {
                global.scrollerInitHeight = scrollChatList.height();
            }, flag);
        }
        //����ҳ�浼���� IFrame
        var initHaderBar = function($node) {
            if (global.urlParams.from && global.urlParams.from === 'iframe') {
                $node.find('.js-back').addClass('is-pc');
                $node.find('.js-title').addClass('is-pc');
                $node.find('.js-collapse').addClass('show');
                $node.find('.js-header-back').css({ 'height': '44px' });
                $node.find('.js-wrapper').css({ 'top': '44px' });
            }
        };
        //�۵����촰��
        var onCollapseWindow = function() {
            if (window.parent !== window)
                window.parent.postMessage(JSON.stringify({
                    name: 'chat_collapseWindow',
                    data: ''
                }), '*');
        };
        /********************************************************************************/
        /*************************************��������**********************************/
        /********************************************************************************/
        //core�������
        var onCoreOnload = function(data) {
            global = data[0];
            global.keywordManager = [];
            global.keyword = sysMsgList;
            global.MSGSTATUSCLASS = MSGSTATUSCLASS; //������Ϣ��״̬��
            global.msgSendACK = global.msgSendACK || [];
            language = global.language.lan;
            languageText = global.language.text;
            initConfig(); //���ò���
        };
        //��ʼ��h5ҳ��������Ϣ
        var initConfig = function() {
            theme(global, wrapBox); //��������
            scrollHanlder = Scroll(global, wrapBox); //��ʼ��scroll
            global.scrollerInitHeight = scrollChatList.height(); //��ȡ����scroll��ʼ���߶�
            initScroll(); //��ʼ��&����scroll
            messageHandler = MessageHandler(global, scrollHanlder);
            timeLineHandler = TimeLineHandler(global); //ʱ����ʾ���
            loadHistoryHandler = LoadHistoryHandler(global, scrollHanlder);
            updateChatMsgHandler = UpdateChatMsgHandler(global, scrollHanlder);
            noticeHandler = NoticeHandler(global, scrollHanlder);
            pushGoodsInfo = PushGoodsInfo(global, scrollHanlder);
            unReadHandler(global, scrollHanlder); //δ����Ϣ
            manualHandler(global, scrollHanlder); //ת�˹����
            initHaderBar($('.js-wrapBox')); //���� iframe ��Ե��������д���
            evaluateRobot(global, wrapBox); //���ۻ�����
        };
        //��ʼ��Dom
        var parseDOM = function() {
            topTitleBar = $('.js-header-back');
            userChatBox = $('.js-userMsgOuter');
            chatMsgList = $('.js-chatMsgList');
            wrapScroll = $('.js-wrapper');
            pullDown = $('.js-pullDownLabel');
            chatPanelList = $('.js-chatPanelList');
            wrapBox = $('.js-wrapBox');
            scrollChatList = $('.js-scroller');
        };
        var bindListener = function() {
            fnEvent.on('core.onload', onCoreOnload);
            fnEvent.on('core.initsession', getHello); //�����˻�ӭ�� ����ʷ��Ⱦ�ӿ�
            $('.js-header-back .js-collapse').on('click', onCollapseWindow);
            document.addEventListener('touchmove', function(e) {
                // console.log(e.path);
                //������۲��ܻ�������
                var evaFlag = 1;
                for (var i = 0; i < e.path.length; i++) {
                    // console.log($(e.path[i]));
                    // console.log($(".js-layer"));
                    if ($(e.path[i])[0] == $(".js-layer")[0]) {
                        evaFlag = 0;
                    }
                };
                if (evaFlag) {
                    e.preventDefault();
                }
            }, false); //android7.0 ����������ٵ�����
        };
        var init = function() {
            parseDOM();
            bindListener();
        };
        init();
    };
    module.exports = ListMsgHandler;

},{"../../../common/comm.js":1,"../../../common/mode/mode.js":13,"../../../common/util/listener.js":29,"../../../common/util/promise.js":31,"../util/qqFace.js":66,"./evaluateRobot.js":35,"./loadHistoryHandler.js":37,"./manualHandler.js":39,"./msghandler.js":40,"./noticeHandler.js":44,"./pushGoodsInfo.js":46,"./scroll.js":47,"./template.js":50,"./theme.js":51,"./timeLineHandler.js":52,"./unReadHandler.js":53,"./updateChatMsg.js":54}],39:[function(require,module,exports){
    var ManualHandler = function(global, myScroll) {
        var fnEvent = require('../../../common/util/listener.js');
        var msgTemplate = require('./template.js');
        var QQFace = require('../util/qqFace.js')();
        var Comm = require('../../../common/comm.js');
        var UpdateChatMsgHandler = require('./updateChatMsg.js');
        var SysMsgChannelHandler = require('./sysMsgChannelHandler.js');
        var goodsHandler = require('./goodsShow.js');

        var updateChatMsgHandler, //������Ϣ����

            sysMsgChannelHandler;

        var language = global.language.lan,
            languageText = global.language.text;

        var defFace = '//img.sobot.com/console/common/face/admin.png';

        var settingTitle = function(ret) {
            var til;
            if (global.apiConfig.type == 2) { //���˹�  L10026 �Ŷ���   L10025 ���޿ͷ�����
                switch (ret.status) {
                    case 'kickout':
                        til = language['L10025'];
                        break;
                    case 'offline':
                        til = language['L10025'];
                        break;
                    case 'queue':
                        til = language['L10026'];
                        break;
                    default:
                        til = language['L10025'];
                        break;
                }
            } else {
                til = global.apiConfig.robotName;
            }

            var name = ret.data.aname || til; //�ͷ��ǳ�
            //titleFlag  1 ��ҵ���� ��Ĭ�ϣ�  2 �̶��İ�  3 �ͷ��ǳ� ���˹��������ˣ�
            var _jsTitleFlag = global.urlParams.titleFlag || 1,
                _jsTitle = global.urlParams.customTitle || name;
            var _title;
            switch (_jsTitleFlag) {
                case 1:
                    _title = global.apiConfig.companyName;
                    break;
                case 2:
                    _title = _jsTitle;
                    break;
                case 3:
                    _title = name;
                    break;
                default:
                    _title = global.apiConfig.companyName;
                    break;
            }
            $('.js-title').text(_title);
            document.title = _title;
            // $('.js-manual-remove').remove();
            $('.js-left-msg').removeClass('show-manual-service');
        }

        //ת�˹�

        var onManualServ = function(data) {
            if (data.type != 'system') {
                var face = data.data.aface || defFace;
                if (data.data) {
                    global.apiConfig.customInfo = {
                        type: "human",
                        data: {
                            aface: face,
                            aname: data.data.aname,
                            content: "",
                            status: 1
                        }
                    };
                }
            } else if (data.type === 'system' && global.apiConfig.type === 2 && global.urlParams.msgflag === 0) {
                //msgflag 0 ����   1�ر�
                if (data.status === 'blacklist') {
                    //����
                    $(".js-leaveMsgBtn").trigger("click");
                }
                if (data.status === 'queue') {
                    $(document.body).trigger('listMsg-queue');
                }
            }
            // else if (data.type === 'system' && data.status === 'blacklist' && global.apiConfig.type === 2 && global.urlParams.msgflag == 0) {
            //     //�����û� ���˹�  ��������
            //     $(".js-leaveMsgBtn").trigger("click"); //��ת������ҳ  ���˹�
            // } else if (data.type === 'system' && data.status === 'queue' && global.apiConfig.type === 2) {
            //     $(document.body).trigger('listMsg-queue');
            // }
            var til;
            switch (data.status) {
                case 'kickout':
                    til = language['L10025'];
                    break;
                case 'offline':
                    til = language['L10025'];
                    break;
                case 'queue':
                    til = language['L10026'];
                    break;
                case 'transfer':
                    $('.js-manual-remove').css('opacity', '0').removeClass('js-artificial'); //ת�˹��ɹ��� �Ƴ�ת�˹���ť
                    break;
                default:
                    til = global.apiConfig.type == 4 ? language['L10026'] : language['L10025'];
                    break;
            }
            var name = data.data.aname || til;
            $('.js-title').text(name);
            document.title = languageText['T0012'] + global.apiConfig.companyName;
            setTimeout(function() { sysMsgChannelHandler.onJoinHTML(data); }, 300);
            settingTitle(data);
            if (data.type && data.type === 'human')
                goodsHandler(global, myScroll); //������ҳ���û�չʾ��Ʒ����
        };
        // goodsHandler(global, myScroll,$('.js-goods-wrap')); //������ҳ���û�չʾ��Ʒ����
        //���˹� �ͷ�������
        var onButtonChange = function(data) {
            if (data && data.data) {
                //FIXME 1�����˹� �ͷ������� �������Թ��� ֱ����ת����ҳ 2�����ų��������ǰҳ�ų� 3�����������1ʱ�ȵ������� ����1 || 2
                if (data.data.status == 2 && !global.apiConfig.groupflag && !global.apiConfig.msgflag) {
                    $(".js-endSession .js-leaveMsgBtn").trigger("click");
                    //window.location.href = global.apiConfig.leaveMsgUrl;//��ת������ҳ
                }
                $('.js-title').text(language['L10025']);
                document.title = languageText['T0012'] + global.apiConfig.companyName;
                var data = { type: 'system', status: 'hunmanonly', data: { content: data.data.content, status: 0 } };
                sysMsgChannelHandler.onJoinHTML(data);
            }
            if (data && data.type == 'transfer' && data.action == 'hide') {
                goodsHandler(global, myScroll); //������ҳ���û�չʾ��Ʒ����
            }
        };
        var bindListener = function() {
            fnEvent.on('core.system', onManualServ); //ת�˹��¼�
            fnEvent.on('core.buttonchange', onButtonChange); //���˹� �ҿͷ�������
        };
        var initPlugins = function() {
            updateChatMsgHandler = UpdateChatMsgHandler(global, myScroll);
            sysMsgChannelHandler = SysMsgChannelHandler(global, myScroll);
        };
        var init = function() {
            bindListener();
            initPlugins();
        };
        init();
    };
    module.exports = ManualHandler;

},{"../../../common/comm.js":1,"../../../common/util/listener.js":29,"../util/qqFace.js":66,"./goodsShow.js":36,"./sysMsgChannelHandler.js":49,"./template.js":50,"./updateChatMsg.js":54}],40:[function(require,module,exports){
    /*
     * @author denzel
     */
//msgBind չʾ��Ϣ���б�
    var SysmsgHandler = function(global, myScroll) {

        var local = {}, //���ط���������
            imgHandler = {}; //����ͼƬ����������
        var msgTemplate = require('./template.js');
        var QQFace = require('../util/qqFace.js')();
        var Comm = require('../../../common/comm.js');
        var fnEvent = require('../../../common/util/listener.js');
        var SendMsgChannelHandler = require('./sendMsgChannelHandler.js');
        var SysMsgChannelHander = require('./sysMsgChannelHandler.js');
        var UpdateChatMsgHandler = require('./updateChatMsg.js');
        var pushEvaHandler = require('./pushEvaHandler.js');
        var MultiConv = require('./multiConv.js');    //���ֻỰ
        //������ - ����
        var sendMsgChannelHandler,
            updateChatMsgHandler,
            sysMsgChannelHandler,
            multiConvHandler;

        //DomԪ��
        var chatPanelList, //�����б�
            topTitleBar, //������
            wrapScroll, //��������
            chatMsgList; //���������б�

        var evaluateFlag = false; //�Ƿ���ʾ���ۻ����˰�ť


        //�������
        var isUploadImg = true, //�Ƿ�Ϊ�ϴ�ͼƬ����
            scrollTimer, //ʵʱ��λ���յ���Ϣ����׶�
            autoTimer, //�����߶��ӳٴ��� ����뵯�����̳�ͻ
            sendTime = 0, //������Ϣ��ʱʱ�� Ĭ��Ϊ0
            isOnlySideOutTimeFlag = 0, //0 �ͷ�  1 �û� 2 ������  3 ���ر�
            uploadImgHandler = {}; //�ϴ�ͼƬtoken �ж��Ƿ��ͻ��ϴ��ɹ�
        wurl = "";
        //��ʱ��ʾ
        var overtimer, //��ʱ��ʾʱ������
            overtimeTask = {
                overtimeDaley: 0, //��ʱ��ʾʱ��
                lastMsgType: 0 //���һ����˭���͵�  0 ��ʾ�ͷ�  1 ��ʾ�û�
            };

        var sugguestionsTimer; //�������ʱ������
        var language = global.language.lan,
            languageText = global.language.text;
        var sys = {};
        sys.config = {};
        // sys.config.msgSendACK = []; //��װ������Ϣ������ ��������Ϣȷ��ƥ��
        sys.config.uploadImgToken = ''; //������ǰ�ϴ�ͼƬΨһ��ʶ
        // sys.config.currentState = ''; //��ǰ�������״̬  1 ���ܻ�����  2�˹��ͷ�

        //��Ϣ״̬-��
        var MSGSTATUSCLASS = {
            MSG_LOADING: 'msg-loading', //���ڷ���
            MSG_LSSUED: 'msg-lssued', //�ѷ���
            MSG_SERVED: 'msg-served', //���ʹ�
            MSG_FAIL: 'msg-fail', //����ʧ��
            MSG_CLOSE: 'msg-close', //�رշ���  ͼƬ����
            MSG_SENDAGAIN: 'msg-sendAgain' //�ط�ͼƬ
        };
        //ϵͳ��ʾ
        var sysPromptLan = {
            L0001: language['L10028'],
            L0002: language['L10029'],
            L0003: language['L10030'],
            L0004: language['L10031']
        };
        var adminMsg = global.urlParams.adminTipWord; //�ͷ���ʾ��
        var adminDaley = global.apiConfig.adminTipTime * 1000 * 60; //�ͷ���ʱʱ��
        /**
         * ������յ�����Ϣ
         * @return {[type]} [description]
         */
        var reviceMsgHandler = function(data) {
            //FIXME �����˹�����̨��Ϣ
            var _type = data.type;
            var _list = data.list;
            for (var i = 0; i < _list.length; i++) {
                var _data = _list[i];
                //�ж����� robot human
                if (_type == 'robot') {
                    //�ж϶��ֻỰ  15 ���ֻỰ��ʼ  15_1 ������  15_2 ��������   15_3 �쳣����
                    // _data.answerType='15';
                    if (_data.answerType.indexOf('15') >= 0) {
                        multiConvHandler.fn(_data);
                    } else {
                        //FIXME ����������  answerType=4 �������
                        if ((_data.sugguestions || []).length > 0) {
                            //�������
                            local.sugguestionsSearch(_data, false);
                        } else {
                            sysMsgChannelHandler.onMsgFromCustom('robot', _data);
                        }
                    }
                } else {
                    //FIXME �ͷ�����
                    switch (_data.type) {
                        case -110:
                            local.unReadMessage(_data);
                            break;
                        case 202:
                            //�ͷ�������Ϣ
                            sysMsgChannelHandler.onMsgFromCustom('human', _data);
                            break;
                        case 204:
                            //�Ự����
                            local.sessionCloseHander(_data);
                            break;
                        case 205:
                            //�ͷ���������
                            sysMsgChannelHandler.onSysMsgShow(_data.content, _data.type);
                            break;
                        case 209:
                            //��������
                            pushEvaHandler(global, window, _data)
                            break;
                    }
                }
            }
        };

        /********************************************************************************/
        /****************************���ش�����Ϣ��*****************************************/
        /********************************************************************************/
        local = {
            wurlHandler: function(data) {
                wurl = data.wurl;
            },
            //������Ϣ
            onSendMsg: function(data) {
                if (data && data[0].answer.indexOf('&nbsp;') >= 0) {
                    var msg = data[0].answer;
                    msg = msg.replace(/&nbsp;/g, ' ');
                    msg = msg.replace(/\s+/g, ' ');
                    data[0].answer = msg;
                }
                //�����û���ʱ
                switch (isOnlySideOutTimeFlag) {
                    case 0: //�ͷ�����
                        overtimeTask.lastMsgType = 1; //���һ��Ϊ�û��ظ�
                        if (global.currentState == 2) {
                            local.msgOvertimeTask(); //ת�˹���ż�ʱ
                        }
                        break;
                    case 1: //�û�����
                        clearInterval(overtimer);
                        break;
                    case 2: //������
                        overtimeTask.lastMsgType = 1; //���һ��Ϊ�û��ظ�
                        overtimeTask.overtimeDaley = 0; //���ó�ʱ��ʾʱ��Ϊ0
                        if (global.currentState == 2) {
                            local.msgOvertimeTask(); //ת�˹���ż�ʱ
                        }
                        break;
                }
                if (data[0].sendAgain) {
                    //��Ϣ�ط�
                    var oDiv = $('#userMsg' + data[0].dateuid).parents('div.rightMsg');
                    chatPanelList.append(oDiv);
                } else {
                    //��ͼƬ
                    if (data[0]['token'] == '') {
                        // msgBind(0, data);
                        sendMsgChannelHandler.onSendMsg(data);
                    }
                }
            },
            //���ջظ�
            onReceive: function(data) {
                //�жϵ�ǰ����״̬
                if (data.type === 'robot') {
                    global.currentState = 1;
                    //�����������ж� 0
                    if (data.list[0].ustatus === 0) {
                        var _data = {
                            type: 'system',
                            status: 'robotoffline',
                            data: {
                                content: sysPromptLan.L0004,
                                status: 0
                            }
                        };
                        sysMsgChannelHandler.onJoinHTML(_data);
                        fnEvent.trigger('listMsg.robotAutoOffLine', 7); //�����»Ự��ť
                        return;
                    }
                } else if (data.type === 'human') {
                    switch (isOnlySideOutTimeFlag) {
                        case 0: //�ͷ�����
                            clearInterval(overtimer);
                            break;
                        case 1: //�û�����
                            overtimeTask.lastMsgType = 0; //���һ��Ϊ�ͷ��ظ�
                            global.currentState = 2;
                            local.msgOvertimeTask(); //��ʱ
                            break;
                        case 2: //������
                            overtimeTask.lastMsgType = 0; //���һ��Ϊ�ͷ��ظ�
                            overtimeTask.overtimeDaley = 0; //���ó�ʱ��ʾʱ��Ϊ0
                            global.currentState = 2;
                            local.msgOvertimeTask(); //��ʱ
                            break;
                    }
                    //�û� �ͷ���ʱ��ʾ��
                    if (data && data.list.length > 0) {
                        for (var i = 0, _list = data.list; i < _list.length; i++) {
                            var _data = _list[i];
                            if (_data.type == 204 && window.parent !== window) {
                                window.parent.postMessage(JSON.stringify({
                                    "name": "closeSession",
                                    "data": data,
                                    'status': data.status
                                }), "*");
                            }
                            //ת�ӳɹ�������ɹ��滻��ʱ��ʾ��
                            if (_data.type == 210 || _data.type == 200) {
                                if (_data.serviceInfo.serviceOutDoc) {
                                    adminMsg = _data.serviceInfo.serviceOutDoc; //�ͷ���ʾ��
                                }
                                if (_data.serviceInfo.serviceOutTime && _data.serviceInfo.serviceOutDoc) {
                                    adminDaley = _data.serviceInfo.serviceOutTime * 1000 * 60;
                                }
                            }
                            if (_data.type == 202 || _data.type == 210) { //202 �ͷ�������Ϣ   210 ת���û�
                                global.apiConfig.customInfo = {
                                    type: "human",
                                    data: {
                                        aface: _data.aface ? _data.aface : _data.face,
                                        aname: _data.aname ? _data.aname : _data.name,
                                        content: "",
                                        status: 1
                                    }
                                };
                            } else if (_data.type === 201) {
                                //�����û��Ŷ���Ϣ
                                var $queue = $('.queue');
                                var _a = $queue.find('a').attr('href');
                                $queue.find('span').html('�Ŷ��У����ڶ����еĵ�' + _data.count + '�� ������<a class="leave-msg-btn" href=' + _a + '>����<a>');
                            }
                        }
                    }
                }
                reviceMsgHandler(data);
                //������Ϣ ʵʱ��������ײ�  ��Ҫ���ڽ�����մ�ͼƬҳ�治�ܶ�λ����׶�
                clearInterval(scrollTimer);
                scrollTimer = setTimeout(function() {
                    fnEvent.trigger('listMsg.realScrollBottom');
                }, 500);

            },
            //��Ϣȷ�Ϸ���
            msgReceived: function(data) {
                // console.log('msgReceived');
                var sendType, //��������
                    answer; //��������
                var isMsgId = global.msgSendACK.indexOf(data.msgId);
                if (isMsgId >= 0) {
                    if (data.result == 'success') {
                        //�ж�ͼƬ�Ƿ��ϴ��ɹ�
                        if (uploadImgHandler[data.msgId]) {
                            // console.log('ͼƬ�ϴ��ɹ�');
                            clearInterval(uploadImgHandler[data.msgId]);
                            local.maskLayer($('#userMsg' + data.msgId), false);
                        }
                        global.msgSendACK.splice(isMsgId, 1); //��������ɾ��
                        $('#userMsg' + data.msgId).removeClass('error msg-loading msg-fail msg-close msg-sendAgain').addClass('msg-served');
                    } else {
                        //����ʧ�� ͼƬ  ���� �����ж�
                        if ($('#userMsg' + data.msgId).hasClass('msg')) {
                            //����
                            $('#userMsg' + data.msgId).removeClass('msg-loading').addClass('error msg-fail');
                        } else {
                            //ͼƬ
                            $('#userMsg' + data.msgId).removeClass('msg-close').addClass('error msg-fail');
                        }
                    }
                }
            },
            maskLayer: function(ele, showMaskLayer) {
                if (ele && showMaskLayer) {
                    ele.parents('div.rightMsg').find('.js-shadowLayer').removeClass('hide');
                    ele.parents('div.rightMsg').find('.js-progressLayer').removeClass('hide');
                } else {
                    ele.parents('div.rightMsg').find('.js-shadowLayer').addClass('hide');
                    ele.parents('div.rightMsg').find('.js-progressLayer').addClass('hide');
                }
            },
            //��Ϣ�ط�
            onMsgSendAgain: function() {
                // console.log('��Ϣ�ط�');
                var that = $(this);
                var sendType, //��������
                    answer, //��������
                    isImgUploadSuccess = true; //�Ƿ��ϴ��ɹ�
                var msgId = that.attr('id').substr(7, that.attr('id').length);
                //�жϵ�ǰ��Ϣ�Ƿ������ط����� error
                if (that.hasClass('error')) {
                    //��Ϣ�ط�
                    //�ط���ʾ�����һ��
                    var oDiv = that.parents('div.rightMsg');
                    chatPanelList.append(oDiv);
                    //�жϵ�ǰ��ͼƬ�ط�   �����ط�
                    if (that.hasClass('msg')) {
                        //����
                        sendType = 'msg';
                        that.removeClass('error msg-fail').addClass('msg-loading');
                        answer = that.prev().text().trim();
                    } else {
                        //����ʧ�ܹر��ɲ�  DENZEL
                        local.maskLayer(that, false);
                        // local.maskLayer(that, true);
                        //ͼƬ
                        sendType = 'img';
                        that.removeClass('error msg-fail').addClass('msg-close close'); //ͼƬ�ط����̿ɵ��ȡ��
                        //FIXME �ж�ͼƬ�Ƿ��ϴ��ɹ������ɹ���ֻ���ط�ͼƬ�������ɹ����������ϴ�һ��
                        var $p = that.prev().find('p');
                        if ($p.find('img').hasClass('uploadedFile')) {
                            isImgUploadSuccess = true;
                            answer = $p.html();
                        } else {
                            isImgUploadSuccess = false;
                            var base64 = $p.find('img').attr('src');
                            fnEvent.trigger('listMsg.imgUploadAgain', { 'base64': base64, 'token': msgId });
                        }
                    }
                    //�ط���Ϣ
                    if (isImgUploadSuccess) {
                        fnEvent.trigger('sendArea.send', [{
                            'answer': answer,
                            'uid': global.apiInit.uid,
                            'cid': global.apiInit.cid,
                            'dateuid': msgId,
                            'currentState': global.currentState == 1 ? 'robot' : 'human',
                            'date': +new Date(),
                            'token': msgId,
                            'sendAgain': true //�Ƿ��ط�
                        }]);
                    }
                } else if (that.hasClass('close')) {
                    //����رհ�ť ���·���
                    that.removeClass('close msg-close').addClass('msg-fail error');
                    fnEvent.trigger('leftMsg.closeUploadImg', msgId);
                    //����ʧ��ȥ���ɲ�
                    local.maskLayer(that, false);
                }
            },
            //�����������
            sugguestionsSearch: function(data, isHistory) {
                //��ʾ���ۻ����˰�ť  ͬ��||����
                if (data.answerType == '9' || data.answerType == '12') {
                    if (global.urlParams.evaluateFlag == 1 || global.urlParams.evaluateFlag == 0) {
                        evaluateFlag = !!global.urlParams.evaluateFlag;
                    } else {
                        evaluateFlag = !!(global.apiConfig.realuateFlag || 0);
                    }
                }
                var msgHtml = language['L10032'];
                if (data) {
                    var list = data.sugguestions;
                    var _answer = '';
                    if (data.answer) {
                        //��Ϊ��ʷ��¼�͵�ǰ�Ự������Ϣ�岻һ��
                        if (Object.prototype.toString.call(data.answer) == '[object Object]') {
                            _answer = data.answer.msg;
                        } else {
                            _answer = data.answer;
                        }
                    }
                    var isShowManualBtn = false;
                    // if (global.apiConfig.type != 1) {
                    isShowManualBtn = sysMsgChannelHandler.onManualBtnShow(data);
                    // }
                    // console.log(wurl);
                    var comf = $.extend({
                        customLogo: global.apiConfig.robotLogo,
                        customName: global.apiConfig.robotName,
                        list: list,
                        isHistory: isHistory,
                        stripe: data.stripe,
                        answer: _answer,
                        manualTitle: languageText['T0060'],
                        showArtificial: isShowManualBtn,
                        wurl: wurl,
                        evaluateFlag: evaluateFlag, //�Ƿ���ʾ���������۰�ť
                        docId: data.docId,
                        docName: data.question,
                        robotFlag: data.robotFlag,
                        msgId: data.msgId
                    });
                    evaluateFlag = false;
                    msgHtml = doT.template(msgTemplate.listSugguestionsMsg)(comf);
                }
                updateChatMsgHandler.updateChatMsg(msgHtml);
            },
            //��������𰸵���¼�
            onSugguestionsEvent: function() {
                var $this = $(this);
                var _txt = $this.text();
                var requestText = $this.attr('data-docid');
                if (_txt) {
                    //��ȡ�������
                    var _msg = _txt.substr(0, _txt.indexOf('.')).trim();
                    var _data = [{
                        'answer': _msg,
                        'uid': global.apiInit.uid,
                        'cid': global.apiInit.cid,
                        'currentStatus': global.currentState == 2 ? 'human' : 'robot',
                        'requestType': 'question',
                        'token': '',
                        'requestText': requestText ? requestText : '', //���������� Ҫ����docid
                        'dateuid': global.apiInit.uid + +new Date(),
                        'sendAgain': false //�Ƿ��ط�
                    }];
                    clearInterval(sugguestionsTimer);
                    sugguestionsTimer = setTimeout(function() {
                        try {
                            fnEvent.trigger('sendArea.sendSugguestions', _data);
                        } catch (e) {
                            console.log(e);
                        }
                        local.onSendMsg(_data);
                        // msgBind(0, _data); //������Ϣ
                    }, 500);
                }
            },
            //����δ����Ϣ
            unReadMessage: function(data) {
                var outerHTML = doT.template(msgTemplate.seperatorTemplate)({
                    't': '',
                    'msgTxt': languageText['T0059']
                });
                updateChatMsgHandler.updateChatMsg(outerHTML);
            },
            //�Ự�����ж�
            // 1���˹��ͷ����ߵ����û�����
            // 2�����ͷ��Ƴ�
            // 3��������ڵ�
            // 4����ʱ�䲻˵��
            // 6�����´��ڴ�
            sessionCloseHander: function(data) {
                clearInterval(overtimer); //ֹͣ��ʱ��ʾ����
                var msg = '';
                if (data) {
                    switch (data.status) {
                        case 1:
                            msg = Comm.format(sysPromptLan.L0001, [data.aname], true);
                            break;
                        case 2:
                            // msg = Comm.format(sysPromptLan.L0001,[data.aname],true);
                            break;
                        case 3:
                            msg = Comm.format(sysPromptLan.L0001, [data.aname], true);
                            break;
                        case 4:
                            // msg = Comm.format($(global.apiConfig.userOutWord).text(), [data.aname], false);
                            msg = Comm.format(global.apiConfig.userOutWord, [data.aname], false);
                            break;
                        case 6:
                            msg = Comm.format(sysPromptLan.L0003, [data.aname], false);
                            break;
                    }
                }
                var tp = +new Date();
                var comf = $.extend({
                    sysMsg: msg,
                    sysMsgSign: tp,
                    date: tp
                });
                var outerHTML = doT.template(msgTemplate.sysMsg)(comf);
                updateChatMsgHandler.updateChatMsg(outerHTML);
            },
            //FIXME ��ʱ��ʾ�����յ��Է�������ʾ��֮ǰ����ǰֻ��ʾһ�Σ�ֱ���û�����Ϊֹ
            msgOvertimeTask: function() {
                clearInterval(overtimer);
                //�ж����һ����Ϣ��Դ
                var userMsg = global.urlParams.userTipWord; //�û���ʾ��
                var userDaley = global.apiConfig.userTipTime * 1000 * 60; //�û���ʱʱ��


                overtimer = setInterval(function() {
                    var _msg, _daley;
                    if (overtimeTask.lastMsgType == 1) { //ȡ�෴��ֵ
                        //�ͷ�
                        _msg = adminMsg;
                        _daley = adminDaley;
                    } else if (overtimeTask.lastMsgType == 0) {
                        //�û�
                        _msg = userMsg;
                        _daley = userDaley;
                    }
                    // console.log(overtimeTask.overtimeDaley);
                    if (overtimeTask.overtimeDaley * 1000 >= _daley) {
                        clearInterval(overtimer);
                        overtimeTask.overtimeDaley = 0; //��ʱʱ������Ϊ0
                        global.apiConfig.customInfo.data.content = _msg; //��ʱ��ʾ��
                        sysMsgChannelHandler.onJoinHTML(global.apiConfig.customInfo);
                    }
                    overtimeTask.overtimeDaley += 1; //��ʱʱ��
                }, 1000);
            },
            receiveAdminTipWord: function(data) {
                if (data.data.serviceOutDoc) {
                    adminMsg = data.data.serviceOutDoc; //�ͷ���ʾ��
                }
                if (data.data.serviceOutTime && data.data.serviceOutDoc) {
                    adminDaley = data.data.serviceOutTime * 1000 * 60;
                }
            },
            //�������߶ȱ仯����
            onAutoSize: function(node) {
                clearInterval(autoTimer);
                autoTimer = setTimeout(function() {
                    var offsetTop = node.offset().top - $(topTitleBar).height();
                    scrollWrapHeight = offsetTop; //���Ӹ߶�
                    $(wrapScroll).height(offsetTop);
                    myScroll.myRefresh(); //ˢ��
                }, 300);
            },
            //�������봦��
            onBeingInput: function() {
                var _t = setInterval(function() {
                    $('.input205').remove();
                    // myScroll.myRefresh(); //ˢ��
                }, 5 * 1000); //ÿ��5�봦������������ʾ��Ϣ
            },
            //������ʷ��¼�ɰ�
            isLoadingHistoryMask: function() {
                var mask = '<div class="js-loadingHistoryMask loadingHistoryMask"><i></i></div>';
                $(document.body).append(mask);
                var $i = $('.js-loadingHistoryMask i');
                var $body = $(document.body);
                $i.offset({ top: ($body.height() - $i.height()) / 2, left: ($body.width() - $i.width()) / 2 });
            },
            onLoadingHistoryMask: function(e) {
                e.stopPropagation();
                e.preventDefault();
            },
            hideKeyboard: function(e) {

                $(".js-textarea").blur();
                if (window.localStorage) {
                    var _type = window.localStorage.getItem('inputStatus');
                    if (_type && _type == 'focus') {
                        setTimeout(function() { //uc iphone  ��֧��blur�¼�
                            var _input = $('<input class="js-cache-input" />');
                            $(document.body).append(_input);
                            _input.focus();
                            $(document.body).find('.js-cache-input').remove();
                        }, .2 * 1000);
                    }
                }
                //TODO  iframe�� �÷�����������ִ��
                if (global.urlParams.from != 'iframe') {
                    fnEvent.trigger('listMsg.hideKeyboard', scrollWrapHeight);
                }
            },
            onSendAreaSysMsg: function(data) {
                sysMsgChannelHandler.onJoinHTML(data);
            }
        };
        var hideTimer;

        /********************************************************************************/
        /****************************����ͼƬ������Ϣ��*************************************/
        /********************************************************************************/
        imgHandler = {
            //�ϴ�ͼƬ
            onUpLoadImg: function(data) {
                (function(timer) {
                    sendTime = 0;
                    uploadImgHandler[timer] = setInterval(function() {
                        if (sendTime >= 60) { //���ͳ���60���ж��ϴ�ʧ��
                            clearInterval(uploadImgHandler[timer]);
                            var $uid = $('#userMsg' + timer);
                            $uid.removeClass('close msg-close').addClass('error msg-fail');
                            //����ʧ��ȥ���ɲ�
                            local.maskLayer($uid, false);
                            fnEvent.trigger('leftMsg.closeUploadImg', timer);
                        }
                        sendTime += 1;
                    }, 1000);
                })(data[0]['token']);
                imgHandler.startUploadImg(data);
            },
            startUploadImg: function(data) {
                global.uploadImgToken = data[0]['token'];
                global.msgSendACK.push(global.uploadImgToken); //�ݴ淢����Ϣid
                comf = $.extend({
                    userLogo: userLogo,
                    uploadImg: data[0]['result'],
                    progress: 0,
                    //DENZEL
                    msgLoading: global.MSGSTATUSCLASS.MSG_LOADING,
                    // msgLoading: global.MSGSTATUSCLASS.MSG_CLOSE,
                    token: data[0]['token'],
                    date: data[0]['date']
                });
                msgHtml = doT.template(msgTemplate.rightImg)(comf);
                updateChatMsgHandler.updateChatMsg(msgHtml);
            },
            onUpLoadImgProgress: function(ret) {
                var data = ret.percentage;
                var token = ret.token;
                var $shadowLayer,
                    $progress,
                    $progressLayer;
                if (isUploadImg) {
                    $shadowLayer = $('#img' + token).find('.js-shadowLayer');
                    $progress = $('#progress' + token);
                    $progressLayer = $progress.parent('.js-progressLayer');
                }
                //�ɰ�߶���ٷֱȸı�
                $progress.text(data + '%');
                var floatData = data / 100; //��ȡС��
                if (floatData >= 1) {
                    //DENZEL
                    // $('#userMsg' + token).removeClass('error msg-loading msg-fail msg-close msg-sendAgain').addClass('msg-served');
                    isUploadImg = true; //�����ϴ�ͼƬ
                    //DENZEL
                    local.maskLayer($('#userMsg' + token), false);
                    // $progress.remove();
                    // $shadowLayer.remove();
                    myScroll.myRefresh(); //ˢ��
                }
            },
            //�ش�ͼƬ·����ַ
            onUploadImgUrl: function(data) {
                //FIXME ���ǻش��ϴ�ͼƬ·������Ҫ׷����Ϣ�������б� ֱ��ȥ�滻img����
                var token = data[0]['token'];
                var img = data[0]['answer'];
                var $div = $('#img' + token);
                var $img = $div.find('p img');
                //DENZEL
                $img.attr('src', img).addClass('uploadedFile');
                // $img.attr('src', img);
                global.uploadImgToken = ''; //�ÿ� һ���������
                local.maskLayer($('#userMsg' + token), false);
                //DNEZEL
                // $('#userMsg' + token).remove();
            },
            //ͼƬչʾ
            onShowImg: function() {
                var that = $(this);
                var comf = $.extend({
                    // msg:'https://www.3987.com/ps/uploadfile/2013/0327/20130327045318527.jpg'
                    msg: that.attr('src')
                });
                var tmpHtml = doT.template(msgTemplate.showMsgLayer)(comf);
                $(document.body).append(tmpHtml);

                $('.js-showMsgLayer').animate({ 'transform': 'scale(1)', 'opacity': '1' }, 300, function() {
                    var $layer = $('.js-showMsgLayer');
                    var $img = $('.js-showMsgLayer').find('img');
                    setTimeout(function() {
                        $img.css({ 'margin-top': ($layer.height() - $img.height()) / 2 + 'px', 'opacity': '1' });
                    }, 100);
                });
                $('.js-showMsgLayer').on('click', function() {
                    $(this).animate({ 'opacity': '0' }, 300, function() {
                        $(this).remove();
                    });
                });
            }
        };

        var userLogo = global.userInfo.face || '//img.sobot.com/console/common/face/user.png';

        var outTimeTask = function() {
            // global.apiConfig.adminOutFlag = 1;
            // global.apiConfig.userOutFlag = 1;
            if (global.apiConfig.adminOutFlag && global.apiConfig.userOutFlag) {
                isOnlySideOutTimeFlag = 2;
            } else if (!global.apiConfig.adminOutFlag && !global.apiConfig.userOutFlag) {
                isOnlySideOutTimeFlag = 3;
            } else if (global.apiConfig.userOutFlag) {
                isOnlySideOutTimeFlag = 1;
            } else if (global.apiConfig.adminOutFlag) {
                isLoadingHistoryMask = 0;
            }
            //�ж��Ƿ���Ҫ��ʱ��ʾ
            if (isOnlySideOutTimeFlag == 2 || isOnlySideOutTimeFlag == 1) {
                var _timer = setInterval(function() {
                    //�����˹���ʼ���㳬ʱʱ��
                    if (global.currentState == 2) {
                        overtimeTask.lastMsgType = 0; //Ĭ��Ϊ���һ��Ϊ�ͷ�����
                        local.msgOvertimeTask();
                        clearInterval(_timer);
                    }
                }, 1000);
            }
        }
        var parseDOM = function() {
            chatPanelList = $('.js-chatPanelList');
            topTitleBar = $('.js-header-back');
            wrapScroll = $('.js-wrapper');
            chatMsgList = $('.js-chatMsgList');
        };
        var bindListener = function() {
            fnEvent.on('sendArea.send', local.onSendMsg); //��������
            fnEvent.on('core.onreceive', local.onReceive); //���ջظ�
            fnEvent.on('core.msgresult', local.msgReceived); //��Ϣȷ���յ�֪ͨ
            //����ת�˹��ɹ������Ϣ
            fnEvent.on("core.transfersuccess", local.receiveAdminTipWord);
            fnEvent.on('sendArea.sendAreaSystemMsg', local.onSendAreaSysMsg); //����������ʾϵͳ��Ϣ

            fnEvent.on('sendArea.createUploadImg', imgHandler.onUpLoadImg); //����ͼƬ
            fnEvent.on('sendArea.uploadImgProcess', imgHandler.onUpLoadImgProgress); //�ϴ�������
            fnEvent.on('sendArea.uploadImgUrl', imgHandler.onUploadImgUrl); //�ش�ͼƬ·��

            // chatMsgList.on('click', local.hideKeyboard); //���ؼ���
            chatMsgList.on('touchstart', local.hideKeyboard); //�������ؼ���
            fnEvent.on('sendArea.autoSize', local.onAutoSize); //�����������ݿ��ӷ�Χ

            $(document.body).delegate('.js-loadingHistoryMask', 'touchmove', local.onLoadingHistoryMask);
            //��������ת����
            fnEvent.on("sendArea.wurlHandler", local.wurlHandler);
            //FIXME EVENT
            $('.js-chatPanelList').delegate('.js-answerBtn', 'click', local.onSugguestionsEvent); //��������𰸵���¼�
            $('.js-chatPanelList').delegate('.js-msgStatus', 'click', local.onMsgSendAgain); //��Ϣ�ط�
            $('.js-chatPanelList').delegate('.js-msgOuter img', 'click', imgHandler.onShowImg); //ͼƬչʾ
        };
        var initPlagsin = function() {
            sendMsgChannelHandler = SendMsgChannelHandler(global, myScroll);
            sysMsgChannelHandler = SysMsgChannelHander(global, myScroll);
            updateChatMsgHandler = UpdateChatMsgHandler(global, myScroll);
            multiConvHandler =  MultiConv(global,'.js-chatMsgList',myScroll);    //���ֻỰģ��
            local.onBeingInput(); //�������봦��
            local.isLoadingHistoryMask();
            outTimeTask(); //��ʱӦ��
        };
        var init = function() {
            parseDOM();
            bindListener();
            initPlagsin();
        };
        init();
    };
    module.exports = SysmsgHandler;
},{"../../../common/comm.js":1,"../../../common/util/listener.js":29,"../util/qqFace.js":66,"./multiConv.js":41,"./pushEvaHandler.js":45,"./sendMsgChannelHandler.js":48,"./sysMsgChannelHandler.js":49,"./template.js":50,"./updateChatMsg.js":54}],41:[function(require,module,exports){
//denzel 20171127
    var MultiConv = function(global, node, myScroll) {
        var node = $(node);
        var multiData = {};
        var That = {};
        var currentConvId; //��ǰ���ֻỰid

        var timer; //��ֹ�������

        var multiTemplate = require('./multiTemplate.js'),
            msgTemplate = require('./template.js'),
            listener = require('../../../common/util/listener.js'),
            sendMsgChannelHandler = require('./sendMsgChannelHandler.js')(global, myScroll),
            multiConvItem = require('./multiConvItem.js')(global, node, myScroll);
        var clickItem; //�ɵ������

        //������뵽���ֻỰ
        That.fn = function(data) {
            //��ȡ���ֻỰ����
            var htmlFn = '',
                htmlStr = '';
            multiData = data.multiDiaRespInfo;
            currentConvId = multiData.conversationId;
            //�ж���Դ�ǽӿڻ�ȡ������дѡ��
            if (multiData.inputContentList) {
                multiData.inputContentList = multiData.inputContentList.split(',').splice(0, 9).join(',');
                // ��дѡ��
                htmlFn = doT.template(multiTemplate.temp2_manual);
                htmlStr = htmlFn(multiData);
                multiData.answer = htmlStr;
                multiConvItem.htmlFormat(multiData, htmlStr, false);
            } else if (multiData.interfaceRetList) {
                //�ӿڻ�ȡ
                multiData.interfaceRetList = multiData.interfaceRetList.splice(0, 9);
                htmlFn = doT.template(multiTemplate['temp' + (multiData.template + 1)]);
                htmlStr = htmlFn(multiData);
                var tempFlag = (multiData.template == 0 || multiData.template == 2) ? true : false;
                //�ӿڻ�ȡ 15 ������ֻỰ  151 ���ֻỰ������  152 ���ֻỰ��������   153  ���ֻỰ�쳣�˳�
                switch (data.answerType) {
                    case '15':
                    case '151':
                        multiData.answer = tempFlag ? multiData.remindQuestion : htmlStr;
                        break;
                    case '152':
                        multiData.answer = tempFlag ? multiData.answerStrip : htmlStr;
                        currentConvId = ''; //�Ự��������յ�ǰ����wfytid
                        break;
                    case '153':
                        multiData.answer = multiData.retErrorMsg;
                        tempFlag = false;
                        currentConvId = ''; //�Ự��������յ�ǰ����wfytid
                        break;
                }
                multiConvItem.htmlFormat(multiData, htmlStr, tempFlag);
            } else {
                //���볬�������Ͳ�����
                switch (multiData.retCode) {
                    case '000000':
                        multiData.answer = multiData.remindQuestion;
                        multiConvItem.htmlFormat(multiData, multiData.remindQuestion, false);
                        break;
                    case '000001':
                        multiData.answer = multiData.retErrorMsg;
                        currentConvId = ''; //�Ự��������յ�ǰ����wfytid
                        multiConvItem.htmlFormat(multiData, multiData.retErrorMsg, false);
                        break;
                    case '000002':
                        multiData.answer = multiData.retErrorMsg;
                        // currentConvId = '';
                        multiConvItem.htmlFormat(multiData, multiData.retErrorMsg, false);
                        break;
                    default:
                        multiData.answer = multiData.retErrorMsg;
                        currentConvId = '';
                        multiConvItem.htmlFormat(multiData, multiData.retErrorMsg, false);
                        break;
                }
            }
        };



        //�ֶ���д
        var manualClickFn = function(el) {
            var template = 1;
            var questionFlag = 2; //���ֻỰ
            var requestText = {};
            // requestText[multiData.outPutParamList] = el.text();
            requestText[el.attr('data-output')] = el.text();
            requestText.level = Number(el.attr('data-level'));
            requestText.conversationId = multiData.conversationId;
            var ret = [{
                questionFlag: 2,
                requestText: requestText,
                answer: el.text(),
                currentStatus: 'robot',
                dateuid: global.apiInit.uid + +new Date(),
                uid: global.apiInit.uid,
                cid: global.apiInit.cid,
                sendAgain: false
            }];
            return ret;
        };
        //�ӿڻ�ȡ
        var autoClickFn = function(el) {
            var template = el.attr('data-temp');
            // var itemData = multiData.interfaceRetList[el.index()];
            var itemData = JSON.parse(el.attr('data-content'));
            var question = {
                "interfaceRetList": [itemData],
                "template": Number(template)
            };
            var title = '';
            if (Number(template) === 1) {
                try {
                    title = question.interfaceRetList[0].title;
                } catch (e) {
                    console.log('params title error...');
                }
            }
            // var outPutParamListStr = multiData.outPutParamList;
            var outPutParamListStr = el.attr('data-param');
            var outPutParamListArr = [];
            var outData = {};
            (outPutParamListStr.split('#') || []).forEach(function(item) {
                outData[item] = itemData[item];
            });
            outData['level'] = Number(el.attr('data-level'));
            outData['conversationId'] = multiData.conversationId;
            //requestText ==requestText  question==answer
            var ret = [{
                answer: Number(template) == 1 ? title : JSON.stringify(question),
                requestText: outData,
                questionFlag: 2,
                currentStatus: 'robot', //�ش�������
                dateuid: global.apiInit.uid + +new Date(),
                uid: global.apiInit.uid,
                cid: global.apiInit.cid,
                sendAgain: false
            }];
            return ret;
        };
        //�������ѡ��
        var clickItemFn = function(evn) {
            clearTimeout(timer);
            timer = setTimeout(function() {
                var that = $(evn.currentTarget);
                var ret; //���ս��
                var flag = false;
                //�ж��Ƿ��ǵ�ǰ���ֻỰ
                var oId = that.attr('data-id')
                if (oId === currentConvId) {
                    if (that.attr('data-type') === 'manual') {
                        //�ֶ���д
                        ret = manualClickFn(that);
                    } else {
                        ret = autoClickFn(that);
                    }
                    try {
                        var _data = ret[0];
                        if (_data.answer.indexOf('{') >= 0) {
                            flag = true;
                            _data.text = JSON.parse(_data.answer).interfaceRetList[0].title;
                        }
                    } catch (e) {

                    }
                    listener.trigger('multiConv.send', ret);
                    sendMsgChannelHandler.onSendMsg(ret, flag); //true��ʾҳ����Ⱦʱ��ʾtext ����ʾanswer
                } else {
                    node.find('li[data-id="' + oId + '"]').css('background-color', '#f8f8f8');
                }
            }, 1000 * .5); //0.5���ڲ��ɶ��ε��
        };
        var bindListener = function() {
            multiConvItem.resizeWidth();
        };
        var initPlugins = function() {};
        var parseDom = function() {
            node.delegate('.js-multi-item', 'click', clickItemFn);
        };
        var init = function() {
            parseDom();
            bindListener();
            initPlugins();
        };
        init();
        return That;
    };

    module.exports = MultiConv;
},{"../../../common/util/listener.js":29,"./multiConvItem.js":42,"./multiTemplate.js":43,"./sendMsgChannelHandler.js":48,"./template.js":50}],42:[function(require,module,exports){
    var MultiConvItem = function(global, node, myScroll) {
        var that = {};
        var QQFace = require('../util/qqFace.js')(),
            sysMsgChannelHander = require('./sysMsgChannelHandler.js')(global, myScroll),
            updateChatMsgHandler = require('./updateChatMsg.js')(global, myScroll),
            msgTemplate = require('./template.js'),
            listener = require('../../../common/util/listener.js'),
            Comm = require('../../../common/comm.js');
        var language = global.language.lan,
            languageText = global.language.text;
        //��������ת
        var wurl = "",
            wurlOpenStyle = false;
        var wurlHandler = function(data) {
            wurl = data.wurl;
            wurlOpenStyle = data.wurlOpenStyle;
        };
        //���ֻỰ�����˷�������
        that.htmlFormat = function(multiData, htmlStr, tempFlag, isHistoryFlag) {
            var htmlTags = ['<a', '<img', '<frame', '<audio', '<video', '<iframe', '<IFRAME', '<EMBED', '<embed'],
                htmlMutex = false,
                evaluateFlag = false,
                showArtificial = false;
            var logo, name, msg;
            msg = QQFace.analysis(multiData.answer || ''); //���˱���;
            var ret = sysMsgChannelHander.onManualBtnShow(multiData) || [];
            showArtificial = ret[0] || false;
            evaluateFlag = ret[1] || false;
            logo = global.apiConfig.robotLogo;
            name = global.apiConfig.robotName;
            var index = msg.indexOf('webchat_img_upload');
            var res,
                imgStatus;
            //�ж��Ƿ��Ǹ��ı�
            if (index >= 0) {
                imgStatus = 'imgStatus';
                res = msg;
            }
            htmlTags.forEach(function(item) {
                if (msg.indexOf(item) >= 0) {
                    htmlMutex = true;
                }
            });
            if (htmlMutex) {
                res = msg;
            } else {
                res = Comm.getNewUrlRegex(msg);
            }
            var comf = {
                customLogo: logo,
                customName: name,
                customMsg: res,
                manualTitle: languageText['T0060'],
                imgStatus: imgStatus,
                date: +new Date(),
                showArtificial: showArtificial,
                wurl: wurl,
                wurlOpenStyle: wurlOpenStyle,
                evaluateFlag: evaluateFlag, //�Ƿ���ʾ���������۰�ť
                docId: multiData.docId,
                docName: multiData.question,
                robotFlag: multiData.robotFlag,
                msgId: multiData.msgId
            }
            var tempFn = doT.template(msgTemplate.leftMsg);
            var tempHtml = tempFn(comf) + (tempFlag ? htmlStr : '');
            if (isHistoryFlag) {
                return tempHtml;
            }
            updateChatMsgHandler.updateChatMsg(tempHtml);
            that.resizeWidth();
        };
        //�������ģ������ݿ��
        that.resizeWidth = function(el) {
            //ģ��һ����
            node = el || node;
            var width = node.width();
            var p1_1w = width - 100,
                p1_2w = width - 100,
                p1_3w = width - 190;
            var el = node.find('.temp1 .content');
            el.find('.title').css('max-width', p1_1w);
            el.find('.sub-title').css('max-width', p1_2w);
            el.find('.describe').css('max-width', p1_3w);
            //ģ����
            var el3 = node.find('.temp3 .content');
            p3_2w = width - 100;
            p3_title = width - 150;
            el3.find('.multi-msg').css('max-width', p3_2w);
            el3.find('.multi-title').css('max-width', p3_title);
        };
        var bindListener = function() {
            listener.on("sendArea.wurlHandler", wurlHandler);
        };
        var init = function() {
            bindListener();
        }
        init();
        return that;
    };
    module.exports = MultiConvItem;
},{"../../../common/comm.js":1,"../../../common/util/listener.js":29,"../util/qqFace.js":66,"./sysMsgChannelHandler.js":49,"./template.js":50,"./updateChatMsg.js":54}],43:[function(require,module,exports){
    var template = {};

    template.temp1_old = '<ul class="template-conv template-conv-item temp1">'+
        ' <li class="item">'+
        '<img src="https://img.sobot.com/console/common/face/robot.png">'+
        '<div class="content">'+
        '<p>���ν��III</p>'+
        '<p>������˹Ƥ������������</p>'+
        '<p>���֣�8.5</p>'+
        '</div>'+
        '</li>'+
        '</ul>';

    template.temp1 =  '{{if(it.retCode==="000000"){ }}' +
        '<ul class="template-conv temp1">'+
        '{{for(var i=0;i<it.interfaceRetList.length;i++){ }}'+
        '{{var data = it.interfaceRetList[i];}}'+
        '<li class="item js-multi-item" data-param="{{=it.outPutParamList}}" data-content=\'{{=JSON.stringify(data)}}\' data-level="{{=it.level}}" data-id="{{=it.conversationId}}" data-temp="{{=it.template}}">'+
        '<a href="{{=it.endFlag?(data.anchor||("javascript:void(0);")):"javascript:void(0);"}}" target="_blank">'+
        '{{if(data.thumbnail){ }}'+
        '<img class="temp1-img" src="{{=data.thumbnail}}">'+
        '{{ }else{ }}'+
        '<span class="temp1-img" style="display: inline-block;"></span>'+
        '{{ } }}'+
        '</a>'+
        '<div class="content">'+
        '<a href="{{=it.endFlag?(data.anchor||("javascript:void(0);")):"javascript:void(0);"}}" target="_blank"><span class="title m_item">{{=data.title||""}}</span></a>'+
        '<span class="sub-title m_item">{{=data.summary||""}}</span>'+
        '<span class="describe m_item">{{=data.label||""}}</span>'+
        '</div>'+
        '<i class="tag">{{=data.tag||""}}</i>'+
        '</li>'+
        '{{ } }}'+
        '</ul>'+
        '{{ }else{ }}'+
        '<div class="template-conv template-conv-item">'+
        '<div class="error">'+
        '{{=it.retErrorMsg||""}}'+
        '</div>'+
        '</div>'+
        '{{ } }}';


    template.temp2 = '<div class="multi-conv-temp2 template-conv-item temp2">'+
        '{{if(it.retCode==="000000"){ }}'+
        '<h1>{{=(it.remindQuestion||it.answerStrip)}}</h1>'+
        '<ul>'+
        '{{for(var i=0;i<it.interfaceRetList.length;i++){ }}'+
        '{{var data = it.interfaceRetList[i];}}'+
        '<li data-param="{{=it.outPutParamList}}" data-content=\'{{=JSON.stringify(data)}}\' data-level="{{=it.level}}" class="js-multi-item" data-id="{{=it.conversationId}}" data-temp="{{=it.template}}">'+
        '<a class="temp-a" href="{{=it.endFlag?(data.anchor||("javascript:void(0);")):"javascript:void(0);"}}">'+
        '{{=data.title||""}}</a></li>'+
        '{{ } }}'+
        '</ul>'+
        '{{ }else{ }}'+
        '<div class="error">'+
        '<div class="error">'+
        '{{=it.retErrorMsg||""}}'+
        '</div>'+
        '</div>'+
        '{{ } }}'+
        '</div>';

    template.temp2_manual = '<div class="multi-conv-temp2 template-conv-item temp2">'+
        '{{if(it.retCode==="000000"){ }}'+
        '<h1>{{=(it.remindQuestion||it.answerStrip)}}</h1>'+
        '<ul>'+
        '{{for(var i=0;i<it.inputContentList.split(",").length;i++){ }}'+
        '{{var data = it.inputContentList.split(",")[i];}}'+
        '<li data-output="{{=it.outPutParamList}}" data-content="{{=data}}" data-level="{{=it.level}}" data-id="{{=it.conversationId}}" data-type="manual" class="js-multi-item">{{=data||""}}</li>'+
        '{{ } }}'+
        '</ul>'+
        '{{ }else{ }}'+
        '<div class="error">'+
        '{{=it.retErrorMsg||""}}'+
        '</div>'+
        '{{ } }}'+
        '</div>';

    template.temp3 = '<div class="multi-conv-temp3 template-conv-item temp3">'+
        '{{if(it.retCode==="000000"){ }}'+
        '<ul>'+
        '{{for(var i=0;i<it.interfaceRetList.length;i++) { }}'+
        '{{var data = it.interfaceRetList[i];}}'+
        '<li data-param="{{=it.outPutParamList}}" data-content=\'{{=JSON.stringify(data)}}\' data-level="{{=it.level}}" class="js-multi-item" data-id="{{=it.conversationId}}" data-temp="{{=it.template}}">'+
        '<a href="{{=it.endFlag?(data.anchor||("javascript:void(0);")):"javascript:void(0);"}}">'+
        '{{if(data.thumbnail){ }}'+
        '<img src="{{=data.thumbnail}}">'+
        '{{  } }}'+
        '<div class="content">'+
        '<span class="multi-title">{{=data.title||""}}</span>'+
        '<p class="multi-msg">{{=data.summary}}</p>'+
        '</div>'+
        '<span class="tags">{{=data.tag||""}}</span>'+
        '</a>'+
        '</li>'+
        '{{ } }}'+
        '</ul>'+
        '{{ }else{ }}'+
        '<div class="error">'+
        '{{=it.retErrorMsg||"--"}}'+
        '</div>'+
        '{{ } }}'+
        '</div> ';

    template.temp4 = '<div class="multi-conv-temp4 template-conv-item temp4">'+
        '{{if(it.retCode==="000000"){ }}'+
        '{{var data=it.interfaceRetList.length>0?it.interfaceRetList[0]:[];}}'+
        '{{if(data.thumbnail){ }}'+
        '<img class="temp4-img" src="{{=data.thumbnail}}">'+
        '{{ } }}'+
        '<div class="content">'+
        '<span class="title">{{=data.title||""}}</span>'+
        '<p class="describe">{{=data.summary||""}}</p>'+
        '<a href="{{=data.anchor||"javascript:void(0);"}}" class="check-detail" target="_blank">�鿴���� &gt;</a>'+
        '</div>'+
        '{{ }else{ }} '+
        '<div class="error">'+
        '{{=it.retErrorMsg||""}}'+
        '</div>'+
        '{{ } }}'+
        '</div>';

    template.temp5 = '<div><p>{{=it.answerStrip||""}}</p><p>{{=it.interfaceRetList[0].title}}</p></div';


    module.exports = template;


},{}],44:[function(require,module,exports){
    var NoticeHandler = function(global, myScroll) {

        var fnEvent = require('../../../common/util/listener.js');
        var msgTemplate = require('./template.js');
        var QQFace = require('../util/qqFace.js')();
        var Comm = require('../../../common/comm.js');
        var UpdateChatMsgHandler = require('./updateChatMsg.js');
        var SysMsgChannelHandler = require('./sysMsgChannelHandler.js');

        //DomԪ��
        var chatPanelList;

        var language = global.language.lan,
            languageText = global.language.text;

        var msgOuter = {
            L001: '����',
            L002: 'չ��'
        };

        //չ��  �۵�
        var onFlips = function() {
            var $this = $(this);
            if ($this.hasClass('expand')) {
                $('.js-note-msg').removeClass('mui-ellipsis-5');
                $this.addClass('collapse').removeClass('expand').text(msgOuter.L001);
            } else {
                $this.addClass('expand').removeClass('collapse').text(msgOuter.L002);
                $('.js-note-msg').addClass('mui-ellipsis-5');
            }
            myScroll.myRefresh();
        };

        //��������
        var countLines = function(ele) {
            var styles = window.getComputedStyle(ele[0], null);
            var lh = parseInt(styles.lineHeight, 10);
            var h = parseInt(styles.height, 10);
            var lc = Math.round(h / lh);
            // console.log('line count:', lc, 'line-height:', lh, 'height:', h);
            return lc;
        }
        var parseDom = function() {
            chatPanelList = $('.js-chatPanelList');
        }
        var bindListener = function() {
            chatPanelList.on('click', '.js-flips', onFlips);
        };
        var initPlugins = function() {};
        var init = function() {
            parseDom();
            bindListener();
            initPlugins();
        };
        init();

    };
    module.exports = NoticeHandler;

},{"../../../common/comm.js":1,"../../../common/util/listener.js":29,"../util/qqFace.js":66,"./sysMsgChannelHandler.js":49,"./template.js":50,"./updateChatMsg.js":54}],45:[function(require,module,exports){
    /*
     * @author daijm
     */
    var pushEvaHandler = function(global, window,_data) {
        var listener = require('../../../common/util/listener.js');
        var template = require('./template.js');
        var showTip = require('../util/showTip.js');
        var $ajax = require("../../../common/util/monitAjax.js")(global);
        var $outerNode,
            isRepeat = true,
            score = 0,
            config = {},
            solved = 1;
        var language = global.language.lan,
            languageText = global.language.text,
            color = global.userInfo.color ? global.userInfo.color : global.apiConfig.color;
        var humanChooseStar = function() {
            $aLi = $outerNode.find("#pushStar li");
            var iStar = 0;
            for (var i = 1; i <= $aLi.length; i++) {
                $aLi[i - 1].index = i;
                //�����������ִ���
                $($aLi[i - 1]).bind("click", function() {
                    iStar = this.index;
                    fnPoint(iStar);
                    switch (iStar) {
                        case 1: //һ��
                        case 2: //����
                        case 3: //����
                        case 4: //����
                            score = iStar;
                            underFiveStarHandler();
                            if (score > 2 && !$outerNode.find(".js-unSolved").hasClass("unsolveActive") && config[0].isQuestionFlag === 1) {

                                $outerNode.find(".js-solved").addClass("solveActive");
                                $outerNode.find(".js-solved").css({ "background": color, "border": "1px solid " + color });
                                $outerNode.find(".js-unSolved").css({ "background": "#fff", "border": "1px solid #d6dbe5" });
                                $outerNode.find(".js-unSolved").removeClass("unsolveActive");
                            };
                            break;
                        case 5: //����
                            score = 5;
                            if (!$outerNode.find(".js-unSolved").hasClass("unsolveActive") && config[0].isQuestionFlag === 1) {
                                $outerNode.find(".js-solved").addClass("solveActive");
                                $outerNode.find(".js-solved").css({ "background": color, "border": "1px solid " + color });
                                $outerNode.find(".js-unSolved").css({ "background": "#fff", "border": "1px solid #d6dbe5" });
                                $outerNode.find(".js-unSolved").removeClass("unsolveActive");
                                solved=1;
                            }else if($outerNode.find(".js-unSolved").hasClass("unsolveActive")&& config[0].isQuestionFlag === 1){
                                solved=0;

                            };
                            commitEvaluate();
                            $outerNode.undelegate();
                            // $outerNode.find(".js-solved").addClass("solveActive");
                            // $outerNode.find(".js-solved").css({ "background": color, "border": "1px solid " + color });
                            // $outerNode.find(".js-unSolved").remove();
                            break;
                    }

                })
            }
        };
        var underFiveStarHandler = function() {
            var solveActive = 0;
            if ($outerNode.find(".js-solved").hasClass("solveActive")) {
                solveActive = 1;
            } else if ($outerNode.find(".js-unSolved").hasClass("unsolveActive")) {
                solveActive = 2;
            } else {
                solveActive = 0;
            };
            var conf = {
                "score": score,
                //0Ϊ��������
                "sourceType": 0,
                "commentType": 0,
                "from": "push",
                "solveActive": solveActive
            };
            listener.trigger("listMsg.toDetailEvaluate", conf);
        };
        var fnPoint = function(iArg) {
            //������ֵ
            for (var i = 0; i < $aLi.length; i++) {
                $aLi[i].className = i < iArg ? "on" : "";
            }

        };
        // var closePushEvaHandler = function() {
        //     $outerNode.find(".js-toDetailEvaluate").css("display", "none");
        //     $outerNode.find(".js-commit").css("display", "none");
        //     $outerNode.find(".js-commited").css("display", "block");
        //     // $outerNode.find("#pushStar li").unbind();
        // };
        // var lowFourStarHandler = function() {
        //     $outerNode.find('.js-toDetailEvaluate').css("display", "block");
        // };
        // var fiveStarHandler = function() {
        //     $outerNode.find('.js-toDetailEvaluate').css("display", "none");
        // };
        var commitEvaluate = function() {
            if (isRepeat) {
                isRepeat = false;
                if (config[0].isQuestionFlag != 1) {
                    solved = -1;
                }

                $.ajax({
                    type: "post",
                    url: "/chat/user/comment.action",
                    dataType: "json",
                    data: {
                        cid: global.apiInit.cid,
                        visitorId: global.apiInit.uid,
                        score: score,
                        tag: "",
                        remark: "",
                        solved: solved,
                        //0,�������ۣ�1Ϊ��������
                        commentType: 0,
                        //��������ֻ��Ϊ�˹�
                        type: 1
                    },
                    success: function(req) {
                        if (req.status === 1) {
                            //closePushEvaHandler();
                            var conf = {
                                'language': language,
                                'languageText': languageText
                            };
                            $outerNode.find("#pushStar li").unbind();
                            $outerNode.find(".js-moregood").html(languageText['T0025']);
                            //var evamsgHtml = doT.template(template.evamsgHtml)(conf);
                            // $(".js-wrapBox").append(evamsgHtml);
                            //����ϵͳ��Ϣ
                            // var evaluateSystem = { type: 'system', status: 'evaluate', data: { content: languageText['T0025'] } }
                            // listener.trigger('sendArea.sendAreaSystemMsg', evaluateSystem);
                            showTipObj.show(languageText['T0032']);
                        } else {
                            var conf = {
                                'language': language,
                                'languageText': languageText
                            };
                            //var evamsgHtml2 = doT.template(template.evamsgHtml2)(conf);
                            //$(".js-wrapBox").append(evamsgHtml2);
                            showTipObj.show(languageText['T0033']);
                            // setTimeout(function() {
                            //     $('.js-evamsg').remove();
                            // }, 3000);
                        }
                    },
                    //������������
                    error: function() {
                        //Alert.hide();
                        var conf = {
                            'language': language,
                            'languageText': languageText
                        };
                        //var evamsgHtml2 = doT.template(template.evamsgHtml2)(conf);
                        //$(".js-mainBox").append(evamsgHtml2);
                        showTipObj.show(languageText['T0032']);
                        // setTimeout(function() {
                        //     $('.js-evamsg').remove();
                        // }, 3000)
                    }
                });

            }
            setTimeout(function() {
                isRepeat = true;
            }, 4000)
        };
        var reTopushEavHandler = function() {
            humanChooseStar();
        };
        var receiveDetailEavHandler = function(data) {
            $aLi = $outerNode.find("#pushStar li");
            var iStar = data.score,
                solved = data.solved;
            if (solved == 1) {
                $outerNode.find(".js-unSolved").removeClass("unsolveActive");
                $outerNode.find(".js-unSolved").css({ "background": "#fff", "border": "1px solid #d6dbe5" });
                $outerNode.find(".js-solved").css({ "background": color, "border": "1px solid " + color });
                $outerNode.find(".js-solved").removeClass("defaultSolveActive").addClass("solveActive");
            } else if (solved == 0) {
                $outerNode.find(".js-solved").removeClass("solveActive");
                $outerNode.find(".js-solved").css({ "background": "#fff", "border": "1px solid #d6dbe5" });
                $outerNode.find(".js-unSolved").addClass("unsolveActive");
                $outerNode.find(".js-unSolved").css({ "background": color, "border": "1px solid " + color });
            }
            fnPoint(iStar);

            $outerNode.undelegate();
            $outerNode.find("#pushStar li").unbind();
            $outerNode.find(".js-moregood").html(languageText['T0025']);
        };

        //��ʼ��Dom
        var parseDOM = function() {
            $mainBox = $(".js-mainBox");
            $chatPanelList = $(".js-chatPanelList");
        };
        var bindListener = function() {
            //����������۴���
            $outerNode.delegate(".js-commit", "click", commitEvaluate);
            //listener.on('listMsg.closePushEva', closePushEvaHandler);
            //���մ󴰿���������
            listener.on('sendArea.toPushEav', receiveDetailEavHandler);
            //�Ӵ����۵���˳��������Բ���ϵͳ��Ϣ�����ۣ�
            listener.on('sendArea.reTopushEav', reTopushEavHandler);
            $outerNode.delegate(".js-solved", "click", function() {
                if (!$(this).hasClass("solveActive")) {
                    $(this).addClass("solveActive");
                    $(this).css({ "background": color, "border": "1px solid " + color });
                    $outerNode.find(".unsolveActive").css({ "background": "#fff", "border": "1px solid #d6dbe5" });
                    $outerNode.find(".js-unSolved").removeClass("unsolveActive");
                };
                solved = 1;
            });
            $outerNode.delegate(".js-unSolved", "click", function() {
                if (!$(this).hasClass("unsolveActive")) {
                    $(this).addClass("unsolveActive");
                    $(this).css({ "background": color, "border": "1px solid " + color });
                    $outerNode.find(".solveActive").css({ "background": "#fff", "border": "1px solid #d6dbe5" });
                    $outerNode.find(".js-solved").removeClass("solveActive");
                }
                solved = 0;
            });
        };
        var initConfig = function() {
            $ajax({
                type: "get",
                url: "/chat/user/satisfactionMessage.action",
                dataType: "json",
                data: {
                    uid: global.apiInit.uid
                },
                success: function(req) {
                    if (req.status === 1) {
                        config = req.data;
                        //��˾��ʾ
                        showTipObj = showTip(global);
                        if ($chatPanelList.find(".js-zhichipushEva")) {
                            $chatPanelList.find(".js-zhichipushEva").remove();
                        };
                        var subName=_data.aname.length>4?_data.aname.substr(0,4)+'...':_data.aname
                        var conf = {
                            "config": config,
                            "language": language,
                            "languageText": languageText,
                            "subName":subName
                        };
                        var _html = doT.template(template.pushEvaMsg)(conf);
                        $outerNode = $(_html);
                        $chatPanelList.append($outerNode);
                        humanChooseStar();
                        listener.trigger("listMsg.scrollToBottom");
                        bindListener();
                    };
                },
                //������������
                error: function() {
                    showTip.show('������������');
                }
            });


        }
        var init = function() {
            parseDOM();
            initConfig();
        };
        init();
    };
    module.exports = pushEvaHandler;
},{"../../../common/util/listener.js":29,"../../../common/util/monitAjax.js":30,"../util/showTip.js":67,"./template.js":50}],46:[function(require,module,exports){
    var PushGoodsInfo = function(global, myScroll) {
        var That = {};
        var listener = require('../../../common/util/listener.js');
        var msgTemplate = require('./template.js');
        var QQFace = require('../util/qqFace.js')();
        var Comm = require('../../../common/comm.js');
        var UpdateChatMsgHandler = require('./updateChatMsg.js');
        var updateChatMsgHandler;

        //dom
        var node;

        var loaded = function(cbk) {
            var data = global.activeData ? (global.activeData.msg || []) : [];
            data.forEach(function(item) {
                var msg = Comm.getNewUrlRegex(item['content'].trim());
                //FIXME ���������˹��ͷ���Ҫ������Ϣȷ��
                item.logo = item.logo || 'https://img.sobot.com/console/common/face/admin.png';
                var comf = $.extend({
                    logo: item.logo,
                    name: item.name,
                    content: QQFace.analysisRight(item.content),
                    date: item.msgId,
                    msgId: item.msgId,
                    type: item.type,
                    icon: item.icon,
                    label: item.label,
                    title: item.title,
                    url: item.url
                });
                var msgHtml = doT.template(msgTemplate.leftGoodsMsg)(comf);
                updateChatMsgHandler.updateChatMsg(msgHtml);
            });
            cbk && cbk(1);
        };
        var mutex = true;
        var onOuterFn = function(e) {
            e.stopPropagation();
            // e.preventDefault();
        };
        var t = +new Date();
        var onOuterMFn = function(e) {
            if (+new Date() - t > 100) {
                e = e || event;
                var el = $(e.currentTarget);
                // el.parents('.js-msgOuter').css('border', '1px solid red');
                var url = el.attr('data-url');
                window.location.href = url;
                window.event.returnValue = false;
                // console.log(url);
                // $('.js-textarea').text(url);
                // window.open(url, 'blank');
            }
            t = +new Date();
        };
        var parseDom = function() {
            node = $('.js-chatPanelList');
        };
        var initPlugins = function() {
            updateChatMsgHandler = UpdateChatMsgHandler(global, myScroll);
        };
        var bindListener = function() {
            node.delegate('.js-outer-url', 'touchstart', onOuterFn);
            node.delegate('.js-outer-url', 'click', onOuterMFn);
            // node.delegate('.content-ware-title', 'click', onOuterMFn);
        };
        var init = function() {
            parseDom();
            bindListener();
            initPlugins();
        };
        init();
        That.loaded = loaded;
        return That;
    };
    module.exports = PushGoodsInfo;

},{"../../../common/comm.js":1,"../../../common/util/listener.js":29,"../util/qqFace.js":66,"./template.js":50,"./updateChatMsg.js":54}],47:[function(require,module,exports){
    /*
     * @author denzel
     */
    var ScrollHandler = function(global, node) {
        var offlineMessageFilter = require("../../../common/mode/offlineMessageFilter.js");
        var That = {};
        var pullDown, //����ˢ��
            wrapScroll; //��������
        var scroll;
        var language = global.language.lan,
            languageText = global.language.text;
        //api�ӿ�
        var api = {
            url_queryUserCids: '/chat/user/queryUserCids.action', //��ѯcid�б�  uid  time  [������]
            url_getChatDetailByCid: '/chat/user/getChatDetailByCid.action' //��ѯ��ʷ��Ϣ uid cid
        };
        var cidsList = []; //�Ựid�б�

        //��ʼ���������
        var initScroll = function() {
            if (scroll) {
                return;
            } else {
                scroll = new IScroll(wrapScroll[0], {
                    // scrollX:true,
                    probeType: 3,
                    tap: true,
                    click: true, // �Ƿ�֧�ֵ���¼� FIXME ��Ҫ����ΪTRUE �������½����޷����
                    mouseWheel: true, // �Ƿ�֧��������
                    useTransition: true,
                    preventDefault:true,//Ĭ��Ϊtrue  ��������Ϊ���ڶ��ֻỰ��֧�ֺ��򻬶�
                    preventDefaultException: {
                        tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT|P)$/
                    },
                    useTransform: true,
                    snap: false,
                    scrollbars: false, // �Ƿ���ʾ������
                    bounce: true, // �߽練��
                    momentum: true // �Ƿ���Ի���
                    //  startY : -300
                });
            }
        };
        //��ʼ����ˢ��
        var scrollStart = function() {
            var y = scroll.y,
                maxY = scroll.maxScrollY - y;
            if (global.flags.moreHistroy) {
                if (y >= 40) {
                    $(pullDown).text(languageText['T0003']);
                    $(pullDown).addClass('loading');
                    return "";
                }
            } else {
                $(pullDown).text(languageText['T0004']);
                $(pullDown).removeClass('loading');
            }
            if ((y < scroll.maxScrollY) && (scroll.pointY < 1)) {
                That.myRefresh();
                return;
            } else if (scroll.y > 0 && (scroll.pointY > window.innerHeight - 1)) {
                That.myRefresh();
                return;
            }
        };

        var isLoadCids = function(cbk) {
            if (pullDown.hasClass('js-get-cids-flag')) {
                pullDown.removeClass('js-get-cids-flag');
                var time = parseInt(global.urlParams.time);
                time = time != time ? 0 : time;
                $.ajax({
                    type: "post",
                    url: api.url_queryUserCids,
                    dataType: "json",
                    data: {
                        uid: global.apiInit.uid,
                        time: time //������
                    },
                    success: function(data) {
                        if (data && data.status) {
                            cidsList = data.cids || [];
                            cbk && cbk();
                        }
                    }
                });
            } else {
                cbk && cbk();
            }
        };

        //����ˢ��
        That.pullDown = function(callback) {
            var child = $('.js-chatPanelList').children().first().attr('date');
            var nexChild = $('.js-chatPanelList').children().eq(1).attr('date');
            var t = child ? child : nexChild;
            //�и�����ʷ��¼
            if (scroll.y >= 40) {
                isLoadCids(function(ret) {
                    if (cidsList && cidsList.length > 0) {
                        getChatDetailByCid(callback);
                    } else {
                        global.flags.moreHistroy = false;
                    }
                });
            }
            scrollStart();
            // $('.js-textarea').text('����');
        };

        var getChatDetailByCid = function(callback) {
            $.ajax({
                type: "post",
                url: api.url_getChatDetailByCid,
                dataType: "json",
                data: {
                    uid: global.apiInit.uid,
                    cid: cidsList.pop()
                },
                success: function(data) {


                    if (data && data.length > 0) {

                        var arr = offlineMessageFilter(data);
                        callback && callback(data);
                    } else if (cidsList && cidsList.length > 0) {

                        getChatDetailByCid(callback);
                    } else{

                        callback && callback(data);
                    }
                }
            });
        }
        var scrollTo = function(y) {
            scroll.scrollTo(0, y);
        };


        //ˢ��ҳ��
        That.myRefresh = function() {
            setTimeout(function() {
                scroll.refresh(); //ˢ��
                scroll.scrollTo(0, scroll.maxScrollY);
            }, 200);
        };
        var parseDom = function() {
            pullDown = $(node).find('.js-pullDownLabel');
            wrapScroll = $('.js-wrapper');
        };
        var bindListener = function() {
            // scroll.on('scroll', scrollStart);
        };
        var init = function() {
            parseDom();
            initScroll();
            bindListener();
        };
        init();
        That.scroll = scroll;
        That.scrollTo = scrollTo;
        return That;
    };
    module.exports = ScrollHandler;

},{"../../../common/mode/offlineMessageFilter.js":15}],48:[function(require,module,exports){
    var SendMsgChannelHandler = function(global,myScroll){

        var That = {};

        var fnEvent = require('../../../common/util/listener.js');
        var msgTemplate = require('./template.js');
        var QQFace = require('../util/qqFace.js')();
        var Comm = require('../../../common/comm.js');
        var UpdateChatMsgHandler = require('./updateChatMsg.js');

        var imgHanlder = {
            userLogo: '//img.sobot.com/console/common/face/user.png'
        };

        var updateChatMsgHandler;

        var userLogo = global.userInfo.face || imgHanlder.userLogo;

        //������Ϣ
        var onSendMsg = function(data,status){
            var msg;
            if(status){
                msg =Comm.getNewUrlRegex(data[0]['text'].trim());
            }else{
                msg = Comm.getNewUrlRegex(data[0]['answer'].trim());
            }
            //FIXME ���������˹��ͷ���Ҫ������Ϣȷ��
            global.msgSendACK.push(data[0]['dateuid']); //�ݴ淢����Ϣid
            var comf = $.extend({
                userLogo: userLogo,
                userMsg: QQFace.analysisRight(msg),
                date: data[0]['date'],
                msgId: data[0]['dateuid'],
                msgLoading: global.MSGSTATUSCLASS.MSG_LOADING //��Ϣȷ��
            });
            var msgHtml = doT.template(msgTemplate.rightMsg)(comf);
            updateChatMsgHandler.updateChatMsg(msgHtml);
        };
        var initPlugins = function(){
            updateChatMsgHandler = UpdateChatMsgHandler(global,myScroll);
        };
        var bindListener = function(){
            fnEvent.on('sendArea.send',onSendMsg); //��������
        };
        var init = function(){
            initPlugins();
        };
        init();
        That.onSendMsg = onSendMsg;
        return That;
    };
    module.exports = SendMsgChannelHandler;

},{"../../../common/comm.js":1,"../../../common/util/listener.js":29,"../util/qqFace.js":66,"./template.js":50,"./updateChatMsg.js":54}],49:[function(require,module,exports){
    var SysMsgChannelHandler = function(global, myScroll) {
        var language = global.language.lan,
            languageText = global.language.text;
        var listener = require("../../../common/util/listener.js");
        var UpdateChatMsgHandler = require('./updateChatMsg.js');
        var Comm = require('../../../common/comm.js');
        var msgTemplate = require('./template.js');
        var QQFace = require('../util/qqFace.js')();
        var fnEvent = require('../../../common/util/listener.js');
        var updateChatMsgHandler;
        var evaluate = require('./evaluateRobot.js');
        var language = global.language.lan,
            languageText = global.language.text;
        var That = {},
            //δ֪�������
            unknowCount = 0,
            wurl = "",
            wurlOpenStyle = false;

        var evaluateFlag = false; //�Ƿ���ʾ���ۻ����˰�ť
        //��װ html
        var onJoinHTML = function(data) {
            //ϵͳ��ʾ �˹������� �˻�ӭ��
            var _type = data.type;
            var _data = data.data;
            //�ж��Ƿ���ϵͳ�ظ�
            if (_type == 'system') {
                // onSysMsgShow(_data.content, data.status);
                onSysMsgShow(_data.content, data.status, _data.status);
            } else {
                //1 ������  2 �ͷ�
                global.currentState = _type == 'robot' ? 1 : 2;
                onMsgFromCustom(_type, _data);
            }
        };

        //�Ƿ���Ϣ����ʾת�˹�
        var onManualBtnShow = function(data,status) {
            var ret = false;
            evaluateFlag = false;
            //��Ϣ���ʹ���
            switch (data.answerType) {
                //ֱ�ӻش�
                case "1":
                case "9":
                    //�����׷��ת�˹���ť �ǽ�������
                    if (global.urlParams.manualTypeObj.direct === "1" && global.apiConfig.type != 1) {
                        ret = true;
                    }

                    //��ʾ���ۻ����˰�ť  (ͬ��||���� )
                    if (global.urlParams.evaluateFlag == 1 || global.urlParams.evaluateFlag == 0) {
                        evaluateFlag = !!global.urlParams.evaluateFlag;
                    } else {
                        evaluateFlag = !!(global.apiConfig.realuateFlag || 0);
                    }
                    break;
                //���ش�
                case "2":
                    //�����׷��ת�˹���ť
                    if (global.urlParams.manualTypeObj.under === "1" && global.apiConfig.type != 1) {
                        ret = true;
                    }
                    break;
                //δ֪�ش�
                case "3":
                    //������������δ֪������ʾת�˹���ť
                    if (global.urlParams.chatConnectButton === 1 && global.apiConfig.type != 1) {
                        unknowCount++;

                        if (unknowCount == global.urlParams.manualBtnCount) {
                            listener.trigger('listMsg.showChatSwitch');
                        }
                    }
                    //�����׷��ת�˹���ť
                    if (global.urlParams.manualTypeObj.unknow === "1" && global.apiConfig.type != 1) {
                        ret = true;
                    }
                    break;
                //�����ش�
                case "4":
                    //�����׷��ת�˹���ť
                    if (global.urlParams.manualTypeObj.guide === "1" && global.apiConfig.type != 1) {
                        ret = true;
                    }
                //���غ���
                case 5:
                    break;
                //�ٿƺ���
                case 6:
                    break;
                //������
                case 7:
                    break;
                //�������ٿ�
                case 8:
                    break;
                //simsimi
                case 9: //��������
                    break;
                case 10:
                    break;
                case '11':
                case '12':
                    // case '14':
                    //����ƥ��
                    if (global.urlParams.manualTypeObj.guide === "1" && global.apiConfig.type != 1) {
                        ret = true;
                    }
                    //��ʾ���ۻ����˰�ť  (ͬ��||����)
                    if (global.urlParams.evaluateFlag == 1 || global.urlParams.evaluateFlag == 0) {
                        evaluateFlag = !!global.urlParams.evaluateFlag;
                    } else {
                        evaluateFlag = !!(global.apiConfig.realuateFlag || 0);
                    }
                    break;
            }
            //���ֻỰʹ��
            if(status){
                return [ret,evaluate];
            }
            return ret;
        };
        var wurlHandler = function(data) {
            wurl = data.wurl;
            wurlOpenStyle = data.wurlOpenStyle;
        }


        //�����ڿͷ�����Ϣ
        var onMsgFromCustom = function(type, data) {
            var htmlTags = ['<a', '<img', '<frame', '<audio','<video','<iframe','<IFRAME','<EMBED','<embed'],
                htmlMutex = false;
            evaluateFlag = false;
            var logo,
                name,
                msg,
                showArtificial = false;
            if (global.outerFrameStatus == 'collapse') {
                global.unReadCount++;
            }

            if (type == 'robot') {
                msg = QQFace.analysis(data.answer || ''); //���˱���;
                // msg = data.answer;
                //��Ϣ���ʹ���
                // if (global.apiConfig.type != 1) { //�������˵�ʱ�򲻳���ת�˹�
                showArtificial = onManualBtnShow(data);
                // }
                logo = global.apiConfig.robotLogo;
                name = global.apiConfig.robotName;
            } else if (type == 'human') {
                msg = QQFace.analysis(data.content || ''); //���˱���
                logo = data.aface;
                name = data.aname;
            }
            var index = msg.indexOf('webchat_img_upload');
            var res,
                imgStatus;
            //�ж��Ƿ��Ǹ��ı�
            if (index >= 0) {
                imgStatus = 'imgStatus';
                res = msg;
            }
            htmlTags.forEach(function(item) {
                if (msg.indexOf(item) >= 0) {
                    htmlMutex = true;
                }
            });
            if (htmlMutex) {
                res = msg;
            } else {
                res = Comm.getNewUrlRegex(msg);
            }
            // if (msg.indexOf('<') >= 0 && msg.indexOf('>') >= 0) {
            //   res = msg;
            // } else {
            //   res = Comm.getNewUrlRegex(msg);
            // }
            var comf = $.extend({
                customLogo: logo,
                customName: name,
                customMsg: res,
                manualTitle: languageText['T0060'],
                imgStatus: imgStatus,
                date: +new Date(),
                showArtificial: showArtificial,
                wurl: wurl,
                wurlOpenStyle: wurlOpenStyle,
                evaluateFlag: evaluateFlag, //�Ƿ���ʾ���������۰�ť
                docId: data.docId,
                docName: data.question,
                robotFlag: data.robotFlag,
                msgId: data.msgId
            });
            var tmpHtml = doT.template(msgTemplate.leftMsg)(comf);
            updateChatMsgHandler.updateChatMsg(tmpHtml);
        };

        //ϵͳ��Ϣ��ʾ
        var onSysMsgShow = function(msg, status, from) {
            //����ʱ���
            var tp = +new Date();
            var msgTmp = '',
                msgIndex, //��Ϣ�±�
                msgType; //�Ƿ�����פ��Ϣ��ʾ
            //�Ƿ������Ҫ�����ϵͳ��ʾ��
            msgIndex = global.keyword.indexOf(status);
            if (msgIndex >= 0) {
                global.keywordManager.push(tp); //����ϵͳ��ʾ�ж�
                msgType = global.keyword[msgIndex];
            } else if (status == 205) {
                msgTmp = 'input205';
                $('.input205').remove(); //�Ƴ�class
                if (msg === '') { //�ͷ�����Ϊ�ջ��ûس�������Ϣ
                    return '';
                }
                msg = languageText['T0020'];
            }
            //�Ƴ��Ŷ���Ϣ
            if (status === 'transfer') {
                $('.' + global.keyword[0]).remove();
            };
            // console.log(status)
            // console.log(from);
            //ת�˹��Ŷ���������������
            if (status === 'queue' && from == 7) {
                setTimeout(function() {
                    if (global.urlParams.isLeaveCustomSysFlag) {
                        window.open(global.urlParams.leaveCustomUrl, '_self');
                    }
                    // else {
                    //     console.log(666);
                    //     listener.trigger("sendArea.openleaveMsgPage");
                    // }
                    //  $(document.body).trigger('listMsg-queue');
                }, 5000);
            }

            var comf = $.extend({
                sysMsg: msg,
                sysMsgSign: tp,
                date: tp,
                msgTmp: msgTmp,
                msgType: msgType
            });
            var msgHtml = doT.template(msgTemplate.sysMsg)(comf);
            updateChatMsgHandler.updateChatMsg(msgHtml);
        };
        var initPlugins = function() {
            updateChatMsgHandler = UpdateChatMsgHandler(global, myScroll);
            //��������ת����
            fnEvent.on("sendArea.wurlHandler", wurlHandler);
        };
        var init = function() {
            initPlugins();
        };
        init();
        That.onJoinHTML = onJoinHTML;
        That.onMsgFromCustom = onMsgFromCustom;
        That.onSysMsgShow = onSysMsgShow;
        That.onManualBtnShow = onManualBtnShow;
        return That;
    };
    module.exports = SysMsgChannelHandler;

},{"../../../common/comm.js":1,"../../../common/util/listener.js":29,"../util/qqFace.js":66,"./evaluateRobot.js":35,"./template.js":50,"./updateChatMsg.js":54}],50:[function(require,module,exports){
    /*
     * @author denzel
     */
    var template = {};


    var seperatorTemplate = '' +
        '<div class="seperator-line" date="{{=it.t}}">------&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{=it.msgTxt}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;------</div>' +
        '';

    var leftMsg =
        '<div class="js-left-msg msgwrap leftMsg {{=it.imgStatus}}  {{= it.showArtificial || it.evaluateFlag ? "show-manual-service" : ""}}"  date="{{=it.date}}">' +
        '<div class="header">' +
        '<img src="{{=it.customLogo}}" alt="" />' +
        '</div>' +
        '<p class="r-name">' +
        '{{=it.customName}}' +
        '</p>' +
        '<div class="msgOuter js-msgOuter" data-robotflag="{{=it.robotFlag||""}}" data-msgid="{{=it.msgId || ""}}" data-docid="{{=it.docId||""}}" data-docname="{{=it.docName||""}}" style="position:relative;{{=it.evaluateFlag ? "min-width:50%;" : ""}}" >' +
        '<p>' +
        '{{=it.customMsg}}' +
        '</p>' +
        '{{if(it.showArtificial&&!it.wurl){}}' +
        '<span class="js-artificial js-manual-remove msgArtificial">{{=it.manualTitle}}</span>' +
        '{{}}}' +
        '{{if(it.showArtificial&&it.wurl){ }}' +
        '{{if(it.wurlOpenStyle){ }}' +
        '<a target="_blank" href="{{=it.wurl}}" class="js-manual-remove msgArtificial">{{=it.manualTitle}}</a>' +
        '{{ }else{ }}' +
        '<a target="_parent" href="{{=it.wurl}}" class="js-manual-remove msgArtificial">{{=it.manualTitle}}</a>' +
        '{{ } }}' +
        '{{ } }}' +
        '{{ if(it.evaluateFlag) { }}' +
        '<div class="js-evaluate-wrap evaluate-wrap">' +
        '<a class="js-tap-evaluate com-evaluate up-evaluate" data-id="1"></a>' +
        '<a class="js-tap-evaluate com-evaluate down-evaluate" data-id="-1"></a>' +
        '<span class="js-evaluated-outer evaluated-outer">{{=it.evaluatedOuter||""}}</span>' +
        '</div>' +
        '{{ } }}' +
        '<div style="clear:both"></div>' +
        '</div>' +
        //'<span class="msgStatus statusLeft"></span>'+
        '{{if(it.showArtificial || it.evaluateFlag){}}' +
        '<span class="js-manual-remove msgArtificialDot"></span>' +
        '{{}}}' +
        '</div>';

    var listSugguestionsMsg =
        '<div class="msgwrap leftMsg js-left-msg  {{= it.showArtificial || it.evaluateFlag ? "show-manual-service" : ""}}"" date="{{=it.date}}">' +
        '<div class="header">' +
        '<img src="{{=it.customLogo}}" alt="" />' +
        '</div>' +
        '<p class="r-name">' +
        '{{=it.customName}}' +
        '</p>' +
        '<div class="msgOuter js-msgOuter" data-robotflag="{{=it.robotFlag||""}}" data-msgid="{{=it.msgId || ""}}" data-docid="{{=it.docId||""}}" data-docname="{{=it.docName||""}}">' +
        '<div style="margin-bottom:10px;">' +
        '{{=it.answer?it.answer:""}}' +
        '</div>' +
        '<p>' +
        '{{=it.stripe?it.stripe:""}}' +
        '</p>' +
        '<ul class="sugguestions">' +
        '{{for(var i=0,lan=it.list || [];i<lan.length;i++){ }}' +
        '{{if(it.isHistory){ }}' +
        '<li>' +
        '<a href="#0" class="js-answerBtn" style="color:#596273">{{=i+1}}. {{=it.list[i]}}</a>' +
        '</li>' +
        '{{}else{}}' +
        '<li>' +
        '<a href="#0" class="js-answerBtn" style="color:#596273" data-docid="{{=it.list[i]["docId"]}}">{{=i+1}}. {{=it.list[i]["question"]}}</a>' +
        '</li>' +
        '{{}}}' +
        '{{ } }}' +
        '</ul>' +
        '{{if(it.showArtificial&&!it.wurl){}}' +
        '<span class="js-artificial js-manual-remove msgArtificial">{{=it.manualTitle}}</span>' +
        '{{}}}' +
        '{{if(it.showArtificial&&it.wurl){ }}' +
        '<a href="{{=it.wurl}}" class="js-manual-remove msgArtificial">{{=it.manualTitle}}</a>' +
        '{{ } }}' +
        '{{ if(it.evaluateFlag) { }}' +
        '<div class="js-evaluate-wrap evaluate-wrap">' +
        '<a class="js-tap-evaluate com-evaluate up-evaluate" data-id="1"></a>' +
        '<a class="js-tap-evaluate com-evaluate down-evaluate" data-id="-1"></a>' +
        '<span class="js-evaluated-outer evaluated-outer">{{=it.evaluatedOuter||""}}</span>' +
        '</div>' +
        '{{ } }}' +
        '<div style="clear:both"></div>' +
        '</div>' +
        '</div>' +
        '{{if(it.showArtificial || it.evaluateFlag){}}' +
        '<span class="js-manual-remove msgArtificialDot"></span>' +
        '{{}}}' +
        '</div>';

    var rightMsg =

        '<div class="msgwrap rightMsg {{=it.imgStatus}}" date="{{=it.date}}">' +
        '<div class="header">' +
        '<img src="{{=it.userLogo}}" alt="" />' +
        '</div>' +
        '<div class="msgOuter js-userMsgOuter js-msgOuter">' +
        '<p>' +
        '{{=it.userMsg}}' +
        '</p>' +
        '</div>' +
        '<span id="userMsg{{=it.msgId}}" class="msg js-msgStatus msgStatus statusRight {{=it.msgLoading}}"></span>' +
        '</div>' +
        '</div>';

    var rightImg =
        '<div class="msgwrap rightMsg rightImg" date="{{=it.date}}">' +
        '<div class="header">' +
        '<img src="{{=it.userLogo}}" alt="" />' +
        '</div>' +
        '<div id="img{{=it.token}}" class="msgOuter js-userMsgOuter js-msgOuter">' +
        '<p>' +
        '<img src="{{=it.uploadImg}}"' +
        '</p>' +
        '<div class="shadowLayer js-shadowLayer">' +
        '</div>' +
        '<div class="progressLayer js-progressLayer">' +
        '<span id="progress{{=it.token}}" class="progress js-progress">{{=it.progress}}</span>' +
        '</div>' +
        '</div>' +
        '<span id="userMsg{{=it.token}}" class="img close js-msgStatus msgStatus statusRight {{=it.msgLoading}}"></span>' +
        '</div>' +
        '</div>';

    var systemMsg =
        '<div class="js-sysMsg sysMsg {{=it.msgType}} {{=it.msgTmp}}" id={{=it.sysMsgSign}} date="{{=it.date}}">' +
        '<span class="sysMsgText"> ' +
        '{{=it.sysMsg}}' +
        '</span>' +
        '</div>';


    var systemData =
        '<p class="sysData" date="{{=it.date}}">' +
        '{{=it.sysData}}' +
        '</p>';

    var showMsgLayer =
        '<div class="js-showMsgLayer showMsgLayer">' +
        '<div class="js-msgLayer msgLayer">' +
        '<img src="{{=it.msg}}" />' +
        '</div>' +
        '</div>';

    var zoomImgLayer =
        '<section class="imgzoom_pack">' +
        '<div class="imgzoom_x">X</div>' +
        '<div class="imgzoom_img"><img src="" /></div>' +
        '</section>';

    var offlineMessageTipBubble = '<span class="offline-message-bubble">' +
        '{{=it.count}} {{=it.msgTxt}}' +
        '</span>';


    var noteTemp = '<div class="chatMsgList leftMsg ">' +
        '<div class="js-notice note js-msgOuter">' +
        '<span class="note-icon"></span>' +
        '<div class="js-note-msg note-msg">' +
        '{{=it.msg}}' +
        '</div>' +
        '<span class="js-flips flips expand">չ��</span>' +
        '</div>' +
        '</div>';
    var pushEvaMsg = '<div class="js-sysMsg sysMsg zhichipushEva js-zhichipushEva">' +
        '<div class="systemMsg">' +
        '<div class="systemMsgPushEva">' +
        '<div class="pushEvaluate js-pushEvaluate">' +
        '{{if(it.config[0].isQuestionFlag){}}' +
        '<div class="operateType">' +
        '<p class="operateTypeTitle">{{=it.subName}}{{=it.languageText.T0106}}</p>' +
        '<div class="operateTypeBtn">' +
        '<p class="solve solved js-solved defaultSolveActive"><span></span>{{=it.languageText.T0041}}</p>' +
        '<p class="solve unSolved js-unSolved" style="margin-left:25px;"><span></span>{{=it.languageText.T0042}}</p>' +
        '</div>' +
        '</div>' +
        '{{}}}' +
        '<p class="pushEvaTitle">{{=it.subName}}{{=it.languageText.T0093}}</p>' +
        '<div id="pushStar">' +
        '<ul>' +
        '<li><a href="javascript:;">1</a></li>' +
        '<li><a href="javascript:;">2</a></li>' +
        '<li><a href="javascript:;">3</a></li>' +
        '<li><a href="javascript:;">4</a></li>' +
        '<li class="js-commit"><a href="javascript:;">5</a></li>' +
        '</ul>' +
        '</div>' +
        '<p class="moregood js-moregood">{{=it.languageText.T0107}}</p>' +
        // '<div class="btnGroup">'+
        //     '<span class="js-toDetailEvaluate toDetailEvaluate" style="display:none">{{=it.languageText.T0094}}</span>'+
        // '</div>'+
        '</div>' +
        // '<span class="js-commit commit">{{=it.languageText.T0095}}</span>'+
        // '<span class="js-commited commited" style="display:none;"><i class="commitedIco"></i>{{=it.languageText.T0025}}</span>'+
        '</div>' +
        '</div>' +
        '</div>';

    var evamsgHtml =
        '<div class="js-evamsg evamsg"><p>{{=it.language.T0037}}</p></div>';
    var evamsgHtml2 = '<div class="js-showTip showTip" style="color:#cb1f16"><p>{{=it.language.T0038}}</p></div>';

    var evaluateRobotHtml = '{{ if (it.type ==1) { }}' +
        '<div><ul><li><a class="js-evalute-up" href="javascript:;/></li><li><a class="js-evaluate-down" href="javascript:;/></li></ul></div>'
    '{{ } else if (it.type ==2){ }}' +
    '<div><span>{{=it.msgOuter}}</span></div>'
    '{{ } }}';

    var goods1Html = '<div class="js-goods-wrap goods-wrap">' +
        '<div class="js-goods-thum goods-thum">' +
        '<img src="{{=it.thum}}" />' +
        '</div>' +
        '<div class="js-goods-detail goods-detail">' +
        '<p class="js-goods-title goods-title margin-left">{{=it.title}}</p>' +
        '<p class="js-goods-abstract goods-abstract margin-left">{{=it.abstract}}</p>' +
        '<p class="js-goods-label  goods-label margin-left"><span class="rmb-icon"></span>{{=it.label}}</p>' +
        '<button class="js-goods-send  goods-send">����</button>' +
        '</div>' +
        '</div>';

    var leftGoodsMsg = '<div class="js-left-msg msgwrap leftMsg"  date="{{=it.date}}">' +
        '<div class="header">' +
        '<img src="{{=it.logo}}" alt="" />' +
        '</div>' +
        '<p class="r-name">' +
        '{{=it.name}}' +
        '</p>' +
        '<div class="msgOuter js-msgOuter">' +
        '{{if(it.type===1){ }}'+
        '<p>' +
        '{{=it.content}}' +
        '</p>' +
        '{{ }else{ }}'+
        '<div data-url="{{=it.url}}" class="js-outer-url">'+
        '<div class="content-ware-msg">'+
        '<div class="content-ware-left  content-ware">'+
        '<img src="{{=it.icon}}" />'+
        '</div>'+
        '<div class="content-ware-right conetnt-ware">'+
        '<a href="javascript:;" style="color: #333 !important;display:block;" data-url="{{=it.url}}" class="content-ware-title js-outer-url">'+
        '{{=it.title}}'+
        '</a>'+
        '<a href="javascript:;" style="color: #999999 !important;display:block;" data-url="{{=it.url}}" class="content-ware-detail js-outer-url">'+
        '{{=it.content}}'+
        '</a>'+
        '<a href="javascript:;" data-url="{{=it.url}}" class="content-ware-lable js-outer-url">'+
        '{{=it.label}}'+
        '</a>'+
        '</div>'+
        '</div>'+
        '</div>'+
        '{{ } }}'+
        '<div style="clear:both"></div>' +
        '</div>';

    template.offlineMessageTipBubble = offlineMessageTipBubble;
    template.leftMsg = leftMsg;
    template.rightMsg = rightMsg;
    template.seperatorTemplate = seperatorTemplate;
    template.rightImg = rightImg;
    template.sysMsg = systemMsg;
    template.sysData = systemData;
    template.showMsgLayer = showMsgLayer;
    template.zoomImgLayer = zoomImgLayer;
    template.listSugguestionsMsg = listSugguestionsMsg;
    template.noteTemp = noteTemp;
    template.pushEvaMsg = pushEvaMsg;
    template.evamsgHtml = evamsgHtml;
    template.evamsgHtml2 = evamsgHtml2;
    template.evaluateRobotHtml = evaluateRobotHtml;
    template.goods1Html = goods1Html;
    template.leftGoodsMsg = leftGoodsMsg;

    module.exports = template;

},{}],51:[function(require,module,exports){
    /*
     * @author denzel
     */

//H5����ҳ��ʽ����ɫ����

    var Theme = function(global,node){

        var topTitleBar,//����������
            userMsgBg,//�û����챳��
            chatWrap,//���촰��
            setStyle,//style css
            companyTitle;//��˾����

        //�Ƿ���ʾ����״̬��
        var isShowTopTitleBar = function(){
            if(global.userInfo.back && global.userInfo.back == 1) {
                $(topTitleBar).addClass('show');
                $(chatWrap).addClass('addTop');
            } else {
                $(chatWrap).removeClass('addTop');
            }
        };
        //����������ʽ
        var setThemeColor = function(){
            var color = global.userInfo.color?global.userInfo.color: global.apiConfig.color;
            $(setStyle).html('.rightMsg .msgOuter::before{border-color:transparent ' + color + ' !important} '+
                '.rightMsg .msgOuter{background-color:' + color + ' !important}'+
                '.wrap .header-back{background-color:'+color+' !important}'
            );
        };
        //���ÿͻ���Ϣ
        var setCustomInfo = function(){
            //���ù�˾��
            // var title = global.apiConfig.companyName&&global.apiConfig.companyName.length > 12 ? global.apiConfig.companyName.substr(0,12) + '..' : global.apiConfig.companyName
            // var title = global.apiConfig.robotName;
            // companyTitle.text(title);
        };
        var parseDom = function(){
            topTitleBar = node.find('.js-header-back');
            userMsgBg = node.find('.js-userMsgOuter');
            chatWrap = node.find('.js-wrapper');
            setStyle = $('.js-setStyle');
            companyTitle = node.find('.js-title');
        };
        var initPlugins = function(){
            isShowTopTitleBar();
            setThemeColor();
            setCustomInfo();
        };
        var init = function(){
            parseDom();
            initPlugins();
        };
        init();
    };
    module.exports = Theme;

},{}],52:[function(require,module,exports){
    var TimeLineHandler = function(global){

        var That = {};
        var language = global.language.lan,
            languageText = global.language.text;

        var msgTemplate = require('./template.js');

        var getTimeLine = function(data,tp,oldTp,theFirst){
            //ʱ������ʾ
            var ret='',//���ؽ��
                tl,//ʱ����
                type;//0 ����  1��һ�� 2������ʷ
            if(oldTp){
                var curTime = new Date();
                var _t = Math.abs(curTime - new Date(tp.substr(0,tp.indexOf(' '))))/1000/60/60/24;
                oldTp = oldTp.replace(/-/g,'/');
                tp = tp.replace(/-/g,'/');
                var _m = Math.abs(new Date(oldTp)- new Date(tp))/1000/60;
                if(Number(_m)>1){ //����һ���� �����������ִ��
                    //0 ����  1��һ�� 2������ʷ
                    type = _t<=1 ? 0 : _t>1 && _t<=2 ? 1 : 2;
                    var _date = tp.substring(0,tp.lastIndexOf(':'));
                    var _time = tp.substring(tp.indexOf(' '),tp.lastIndexOf(':'));
                    switch (type) {
                        case 0:
                            tl=  languageText['T0011']+ _time;
                            break;
                        case 1:
                            tl = languageText['T0013']+_time;
                            break;
                        case 2:
                            tl = _date;
                            break;
                    }
                    var comf = $.extend({
                        sysData:tl,
                        date:+new Date()
                    });
                    ret = doT.template(msgTemplate.sysData)(comf);
                }
            }
            //FIXME �״ν��� ��ʾʱ����
            if(theFirst){
                var _time = new Date();
                var _hour = _time.getHours()>9?_time.getHours():'0'+_time.getHours();
                var _minutes = _time.getMinutes()>9?_time.getMinutes():'0'+_time.getMinutes();
                var _ret = languageText['T0011']+' '+_hour+':'+_minutes;
                var comf = $.extend({
                    sysData:_ret,
                    date:+_time
                });
                ret = doT.template(msgTemplate.sysData)(comf);
            }
            return ret;
        };

        That.getTimeLine = getTimeLine;
        return That;

    };
    module.exports = TimeLineHandler;

},{"./template.js":50}],53:[function(require,module,exports){
    var UnReadHandler = function(global, myScroll) {

        var fnEvent = require('../../../common/util/listener.js');
        var msgTemplate = require('./template.js');

        var language = global.language.lan,
            languageText = global.language.text;

        global.unReadCount = 0;
        var onPostMessage = function(evt) {
            var data;
            if (typeof evt.data === 'string') {
                try {
                    data = JSON.parse(evt.data);
                } catch (e) {}

            } else {
                data = evt.data;
            }
            if (data.name == 'offlineMessage') {
                if ($(".seperator-line").length == 0) {
                    fnEvent.trigger("core.onreceive", {
                        'type': 'human',
                        'list': [{
                            'type': -110
                        }]
                    });
                }
                data.data.type = 202;
                data.data.msg = data.data.content;
                fnEvent.trigger("core.onreceive", {
                    'type': "human",
                    'list': [data.data]
                });
            }
            if (data.name == "collapse") {
                global.outerFrameStatus = data.name;
                global.unReadCount = 0;
                if ($(".seperator-line").length > 0)
                    $(".seperator-line").remove();
                fnEvent.trigger("core.onreceive", {
                    'type': 'human',
                    'list': [{
                        'type': -110
                    }]
                });
            } else if (data.name == 'expand') {
                global.outerFrameStatus = data.name;
                if (global.unReadCount === 0) {
                    $(".seperator-line").remove();
                    $(".offline-message-bubble").remove();
                } else {
                    initOfflineMessageBubble(global.unReadCount);
                }
            }
        };
        var initOfflineMessageBubble = function(count) {
            if (count < 10)
                return;
            var spanHtml = doT.template(msgTemplate.offlineMessageTipBubble)({
                'count': count,
                'msgTxt': languageText['T0058']
            });
            var $span = $(spanHtml);
            if (global.urlParams.back == 1 && global.urlParams.from !== 'iframe') {
                $span.css("top", 50);
            }
            $(".js-wrapper").append($span);
            $span.on('click', function() {
                $span.remove();
                $(".js-textarea").blur();
                if ($(".seperator-line").length > 0) {
                    setTimeout(function() {
                        var top = $(".seperator-line").offset().top - $(".js-chatMsgList").offset().top;
                        myScroll.scrollTo(-top);
                    }, 1000);
                }
            });
        };
        var bindListener = function() {
            $(window).on("message", onPostMessage);
        };
        var init = function() {
            bindListener();
        };
        init();
    };
    module.exports = UnReadHandler;

},{"../../../common/util/listener.js":29,"./template.js":50}],54:[function(require,module,exports){
    var UpdateChatMsg = function(global, myScroll) {

        var That = {};

        var chatPanelList, //�����б�
            wrapBox;

        var language = global.language.lan,
            languageText = global.language.text;

        var Comm = require('../../../common/comm.js');
        var fnEvent = require('../../../common/util/listener.js');
        var msgTemplate = require('./template.js');

        //���������¼
        var updateChatMsg = function(tempHtml) {
            if (chatPanelList && chatPanelList.children().length) {
                var lastDom = chatPanelList.children().last();
                var _m = Math.abs(new Date() - new Date(Number(lastDom.attr('date')))) / 1000 / 60;
                //��һ���� ��ʾ ʱ����
                if (_m > 1 && !lastDom.hasClass('sysData')) {
                    var _t = new Date();
                    var hour = _t.getHours() >= 10 ? _t.getHours() : '0' + _t.getHours(),
                        minutes = _t.getMinutes() >= 10 ? _t.getMinutes() : '0' + _t.getMinutes(),
                        _time = languageText['T0011'] + ' ' + hour + ':' + minutes;
                    var comf = $.extend({
                        sysData: _time,
                        date: +new Date()
                    });
                    tempHtml = doT.template(msgTemplate.sysData)(comf) + tempHtml;
                }
            }
            chatPanelList.append(tempHtml);
            //FIXME ������Ϣֻ��ʾ���µ�һ��  ��ת�˹��� ��ɾ���ų���������ʾ
            if (global.keywordManager.length > 1) {
                var sign = global.keywordManager.shift();
                $('#' + sign).animate({ 'margin-top': '-30px', opacity: '0' }, 100, function() {
                    $(this).remove();
                });
            }
            if (global.currentState === 2 && global.apiInit.ustatus !== 0) { // 0 ��δ�����Ự
                var sign = global.keywordManager[0];
                var $sign = $('#' + sign);
                if (!$sign.hasClass('firstEvaluate') && !$sign.hasClass('evaluated')) {
                    $sign.animate({ 'margin-top': '-30px', opacity: '0' }, 100, function() {
                        $(this).remove();
                    });
                }
            }
            //FIXME ����android�ֻ��ض������������� ������Ⱦһ��
            if (global.UAInfo.UA == 'android') {
                $(wrapBox).css('font-size', '0.99em');
                setTimeout(function() {
                    $(wrapBox).css('font-size', '1em');
                }, 200);
            }
            myScroll.myRefresh(); //ˢ��
        };
        //��ʾ��Ʒ��Ϣ
        var appendGoods = function(tempHtml) {
            chatPanelList.append(tempHtml);
            myScroll.myRefresh(); //ˢ��
        };
        var parseDom = function() {
            chatPanelList = $('.js-chatPanelList');
            wrapBox = $('.js-wrapBox')[0];
        };
        var init = function() {
            parseDom();
        };
        init();

        That.updateChatMsg = updateChatMsg;
        That.appendGoods = appendGoods;

        return That;
    };
    module.exports = UpdateChatMsg;

},{"../../../common/comm.js":1,"../../../common/util/listener.js":29,"./template.js":50}],55:[function(require,module,exports){
    function Adapter(phoneType, browserType, browserInfo) {
        // alert(phoneType);
        // alert(browserType);
        // alert(browserInfo);
        //���������ֻ�����뵥�У��������������
        var isFirstPopInputFlag = true;
        try {
            if (window.localStorage) {
                isFirstPopInputFlag = window.localStorage.getItem('isFirstPopInputFlag')
            }
        } catch (e) {}
        var isInIframe = window.parent !== window;
        if (!isInIframe) {
            //iphone6+�µ�safri�������qq�������΢�������,beequickΪ���ʷ�app��Ƕ�����
            if (phoneType == "iphone-6+" && browserInfo.indexOf('11_') == -1) {
                $(".js-chatArea").css({ "top": "277px" });
                setTimeout(function() {
                    $(window).scrollTop('1');
                }, 50)
            } else if (phoneType == "iphone-6+") {
            }
            if (phoneType == "iphone-6+" && browserType == "mqqbrowser") {
                $(".js-chatArea").css({ "top": "273px" });
                setTimeout(function() {
                    $(window).scrollTop('1');
                }, 50)
            }
            if (phoneType == "iphone-6+" && (browserType == "micromessenger" || browserType == "qq") && browserInfo.indexOf('11_') == -1) {
                $(".js-chatArea").css({ "top": "277px" });
                setTimeout(function() {
                    $(window).scrollTop('1');
                }, 50)
            } else if (phoneType == "iphone-6+" && (browserType == "micromessenger" || browserType == "qq")) {
                if (isFirstPopInputFlag == 'true') {
                    $(".js-chatArea").css({ "bottom": "47px" });
                }
            }
            if (phoneType == "iphone-6+" && browserType == "ucbrowser") {
                $(".js-chatArea").css({ "top": "302px" });
                setTimeout(function() {
                    $(window).scrollTop('1');
                }, 50)
            }

            //iphone6�����������������
            //app��webview

            if (phoneType == "iphone-6" && browserInfo.indexOf('11_') == -1) {
                setTimeout(function() {
                    $(".js-chatArea").css({ "bottom": "0px" });
                    $(window).scrollTop('333');
                }, 400);
            } else if (phoneType == "iphone-6") {
                // alert(1);
            }
            if (phoneType == "iphone-6" && browserType == "safari" && browserInfo.indexOf('11_') == -1) {
                setTimeout(function() {
                    $(".js-chatArea").css({ "bottom": "0px" });
                    $(window).scrollTop('288');
                }, 400);
            } else if (phoneType == "iphone-6" && browserType == "safari") {
                // $('.js-textarea').attr("placeholder", isFirstPopInputFlag);
                if (isFirstPopInputFlag == 'true') {
                    $(".js-chatArea").css({ "bottom": "60px" });
                }
            }
            //΢��
            if (phoneType == "iphone-6" && browserType == "micromessenger" && browserInfo.indexOf('11_') == -1) {
                setTimeout(function() {
                    $(".js-chatArea").css({ "bottom": "0px" });
                    $(window).scrollTop('330');
                }, 400);
            } else if (phoneType == "iphone-6" && browserType == "micromessenger") {
                if (isFirstPopInputFlag == 'true') {
                    $(".js-chatArea").css({ "bottom": "70px" });
                }
            }
            if (phoneType == "iphone-6" && browserType == "mqqbrowser" && browserInfo.indexOf('11_') == -1) {
                $(".js-chatArea").css({ "bottom": "-1px" });
                setTimeout(function() {
                    $(window).scrollTop('0');
                }, 50);
            } else if (phoneType == "iphone-6" && browserType == "mqqbrowser") {
                $(".js-chatArea").css({ "bottom": "-1px" });
            }
            if (phoneType == "iphone-6" && browserType == "ucbrowser" && browserInfo.indexOf('11_') == -1) {
                $(".js-chatArea").css({ "bottom": "117px" });
                setTimeout(function() {
                    $(window).scrollTop('0');
                }, 50);
            } else if (phoneType == "iphone-6" && browserType == "ucbrowser") {
                $(".js-chatArea").css({ "bottom": "117px" });
            };

            //iphone5
            if (phoneType == "iphone-5" && browserInfo.indexOf('11_') == -1) {
                $(".js-chatArea").css({ "top": "129px" });
                setTimeout(function() {
                    $(window).scrollTop('1');
                }, 50);
            }
            if (phoneType == "iphone-5" && browserType == "ucbrowser" && browserInfo.indexOf('11_') == -1) {
                $(".js-chatArea").css({ "top": "140px" });
                setTimeout(function() {
                    $(window).scrollTop('1');
                }, 50)
            }
        }
        //��Ϊ��ҫ6
        if (browserType == "safari" && browserInfo.indexOf('h60_l03') != -1 || browserInfo.indexOf('h60-l03') != -1) {
            $(".js-chatArea").css({ "top": "218px" });
            setTimeout(function() {
                $(window).scrollTop('1');
            }, 50)
        }
        //����note2
        if (browserType == "safari" && browserInfo.indexOf('mz-m2') != -1) {
            $(".js-chatArea").css({ "top": "315px" });
            setTimeout(function() {
                $(window).scrollTop('1');
            }, 50)
        }

        //����mx5,���������
        if (browserType == "safari" && browserInfo.indexOf('mx5') != -1) {
            $(".js-chatArea").css({ "top": "266px" });
            setTimeout(function() {
                $(window).scrollTop('1');
            }, 50)
        }
        //����mx5
        if (browserType == "safari" && browserInfo.indexOf('mz-mx5') != -1) {
            $(".js-chatArea").css({ "top": "338px" });
            setTimeout(function() {
                $(window).scrollTop('1');
            }, 50)
        }
        //С��3
        if (browserType == "miuibrowser" && browserInfo.indexOf('mi 3') != -1) {
            $(".js-chatArea").css({ "top": "253px" });
            setTimeout(function() {
                $(window).scrollTop('1');
            }, 50)
        }
        //С��4
        if (browserType == "miuibrowser" && browserInfo.indexOf('mi 4') != -1) {
            $(".js-chatArea").css({ "top": "241px" });
            setTimeout(function() {
                $(window).scrollTop('1');
            }, 50)
        }
        //С��5
        if (browserType == "miuibrowser" && browserInfo.indexOf('mi 5') != -1) {
            $(".js-chatArea").css({ "top": "286px" });
            setTimeout(function() {
                $(window).scrollTop('1');
            }, 50)
        }
        //С��note
        if (browserType == "miuibrowser" && browserInfo.indexOf('mi note') != -1) {
            $(".js-chatArea").css({ "top": "277px" });
            setTimeout(function() {
                $(window).scrollTop('1');
            }, 50)
        }
        //����note2
        if (browserType == "miuibrowser" && browserInfo.indexOf('redmi note 2') != -1) {
            $(".js-chatArea").css({ "top": "253px" });
            setTimeout(function() {
                $(window).scrollTop('1');
            }, 50)
        }
        //����note3��h5demo
        if (browserType == "safari" && browserInfo.indexOf('samsung-sm-n7508v_td') != -1) {
            // $(".js-chatArea").css({ "top": "266px"});
            // setTimeout(function() {
            //     $(window).scrollTop('1');
            // }, 50)
        }
        //huawei
        if (browserType == "safari" && browserInfo.indexOf('huawei nxt-al10') != -1) {
            $(".js-chatArea").css({ "top": "220px" });
            setTimeout(function() {
                $(window).scrollTop('1');
            }, 50)
        }
        //huawei��ҫ4x
        if (browserType == "safari" && browserInfo.indexOf('honor_che2-tl00m_td') != -1) {
            $(".js-chatArea").css({ "top": "220px" });
            setTimeout(function() {
                $(window).scrollTop('1');
            }, 50)
        }
        //δ��֤���� Vivo  x7
        //��������ͣ���ȱ���ͻ�δ���
        //����pro5(�������������������)����Ϊnexus6p����Ϊ��ҫv8(������û����)���ȸ�(������û����)��
    }

    module.exports = Adapter;
},{}],56:[function(require,module,exports){
    /**
     * @author daijm
     */
//currentStatusΪ0��Ϊ�����ˣ�Ϊ1��Ϊ�˹�
    function evaluate(currentStatus, global, evaType,aname) {
        var template = require('./template.js');
        var Alert = require('../util/alert.js');
        var listener = require("../../../common/util/listener.js");
        var $ajax = require("../../../common/util/monitAjax.js")(global);
        //var Dialog=require('../util/dialog.js');
        var currentStatus = currentStatus;
        var language = global.language.lan;
        var languageText = global.language.text;
        var color = global.urlParams.color || global.userInfo.color;
        color = color.indexOf('#') == 0 ? color : ('#' + color);
        var showTip = require('../util/showTip.js');

        var Alert,
            dialog,
            $outerNode,
            $body;
        var score = 0,
            tag = "",
            remark = "",
            type = "",
            isRepeat = false,
            solved = 1,
            commentType = evaType.commentType === 0 ? evaType.commentType : 1;
        var BASE = 4;
        var config = {};


        //���ɶ�ѡ
        var toggleActive = function() {
            $(this).css({ "color": "#fff", "border": "1px solid " + color, "background": color }).siblings().css({ "color": "#000", "border": "1px solid #c5cecb", "background": "#fff" });
        };
        //�ɶ�ѡ
        var toggleActiveRepeat = function() {
            $(this).toggleClass("active")
            if ($(this).hasClass("active")) {
                $(this).css({ "background": color, "border": "1px solid " + color, "color": "#fff" })
            } else {
                $(this).css({ "background": "#fff", "border": "1px solid #c4cdcc", "color": "#686d70" })
            }

        };
        var textareaMaxlen = function(targetID, maxLen) {
            // �������Կ�����ַ���Ϊ200
            document.getElementById(targetID).addEventListener('input', function() {
                if (this.value.length > maxLen) {
                    this.value = this.value.substr(0, maxLen);
                }
            }, false);
        };
        var sobotSetInnerStepOneHtml = function() {
            var subName=global.apiConfig.robotName.length>8?global.apiConfig.robotName.substr(0,8)+'...':global.apiConfig.robotName
            var _html = doT.template(template.sobotOne_selfHtml)({
                'config': config,
                'languageText': languageText,
                'robotName':global.apiConfig.robotName,
                'subName':subName
            });
            $outerNode = $(_html);
            $body.append($outerNode);
            $outerNode.find(".js-submit").css("background", color);
            $outerNode.find(".js-solved").addClass("solveActive").css({ "background": color, "border": "1px solid " + color });
        };
        //�Զ���html��ӵ�������
        var sobotSetInnerStepTwoHtml = function() {
            var conf = global.apiConfig.robotCommentTitle.split(",");
            var _html = doT.template(template.sobotTwo_selfHtml)({
                'list': conf,
                'languageText': languageText
            });
            $outerNode.find(".js-evaluateDetail").remove();
            $outerNode.find(".js-evaluate").append(_html);
            //$outerNode.find(".situation span").on("click", toggleActiveRepeat);
            $outerNode.find(".js-submit").on("click", EvaluateAjaxHandler);
            textareaMaxlen("js-evaluateInner", 200);

        };
        var humanSetInnerStepOneHtml = function() {
            var subName=aname.length>4?aname.substr(0,4)+'...':aname
            var conf = {
                'languageText': languageText,
                'config': config,
                'subName':subName
            };
            var _html = doT.template(template.humanOne_selfHtml)(conf);
            $outerNode = $(_html);
            $body.append($outerNode);
            $aLi = $("#star li");
            //console.log(evaType);
            if (evaType.from == "push") {
                score = evaType.score;
                var solveActive = evaType.solveActive;
                if (solveActive == 0) {
                    $outerNode.find(".js-solved").addClass("solveActive");
                    $outerNode.find(".js-solved").css({ "background": color, "border": "1px solid " + color });
                } else if (solveActive == 1) {
                    $outerNode.find(".js-solved").addClass("solveActive");
                    $outerNode.find(".js-solved").css({ "background": color, "border": "1px solid " + color });
                    $outerNode.find(".unsolveActive").css({ "background": "#fff", "border": "1px solid #d6dbe5" });
                    $outerNode.find(".js-unSolved").removeClass("unsolveActive");
                } else if (solveActive == 2) {
                    $outerNode.find(".js-unSolved").addClass("unsolveActive");
                    $outerNode.find(".js-unSolved").css({ "background": color, "border": "1px solid " + color });
                    $outerNode.find(".js-solved").css({ "background": "#fff", "border": "1px solid #d6dbe5" });
                    $outerNode.find(".js-solved").removeClass("solveActive");
                };
                humanSetInnerStepTwoHtml(score);
            } else {
                score = 5;
                $outerNode.find(".js-solved").addClass("solveActive").css({ "background": color, "border": "1px solid " + color });
            };
            fnPoint(score);
            $outerNode.find(".js-evaluateTip").html(config[score - 1].scoreExplain);
            $outerNode.find(".js-submit").css("background", color);
            var iStar = 0;
            for (var i = 1; i <= $aLi.length; i++) {
                $aLi[i - 1].index = i;
                //����ƹ���ʾ����
                $aLi[i - 1].onmouseover = function() {
                    fnPoint(this.index);
                };
                //����뿪��ָ��ϴ�����
                $aLi[i - 1].onmouseout = function() {
                    fnPoint(this.index);
                };
                //�����������ִ���
                $($aLi[i - 1]).bind("click", function() {
                    iStar = this.index;
                    switch (iStar) {
                        case 1: //һ��
                        case 2: //����
                        case 3: //����
                        case 4: //����
                            score = iStar;
                            humanSetInnerStepTwoHtml(iStar);
                            break;
                        case 5: //����
                            score = 5;
                            $outerNode.find(".js-evaluateDetail").html("");
                            //alert("��л���ķ���");
                            //EvaluateAjaxHandler();
                            break;
                    };
                    $outerNode.find(".js-evaluateTip").html(config[score - 1].scoreExplain);

                });
            };

        };
        var humanSetInnerStepTwoHtml = function(iStar) {
            var conf = config[iStar - 1];
            var list = [];
            if (conf.labelName) {
                list = conf.labelName.split(",");
            }
            //ȥ���ձ�ǩ
            for (var i = 0; i < list.length; i++) {
                if (list[i] == "") {
                    list.splice(i, 1);
                }
            };
            var _html = doT.template(template.humanTwo_selfHtml)({
                'list': list,
                'conf': conf,
                'languageText': languageText
            });
            $outerNode.find(".js-evaluateDetail").remove();
            $outerNode.find(".js-evaluate").append(_html);
            $outerNode.find(".close_button").click(function() {
                listener.trigger('sendArea.reTopushEav');
            });
            //$outerNode.find(".js-noques").css({ "color": "#fff", "border": "1px solid " + color, "background": color });
            //$outerNode.find(".js-isques").on("click", EvaluateAjaxHandler);
            //$outerNode.find(".wether span").on("click", toggleActive);

            textareaMaxlen("js-evaluateInner", 200);
        };
        var beforeEvaluateAjaxHandler = function() {
            //���������ۣ�scoreΪ1����Ϊ�ǣ�Ϊ0��Ϊ��
            score = 5;
            EvaluateAjaxHandler();
        };
        var EvaluateAjaxHandler = function() {
            if (isRepeat == false) {
                isRepeat = true;
                var tagArr = [],
                    tagNum = $outerNode.find(".tag").length;
                $outerNode.find(".tag").each(function() {
                    var _val = $(this).html();
                    if ($(this).hasClass("active")) {
                        tagArr.push(_val)
                    }
                });
                //��ǩ�Ƿ�Ϊ��ѡ
                if (currentStatus && tagArr.length == 0 && config[score - 1].isTagMust && score != 5 && tagNum > 0) {
                    showTip.show(languageText['T0104']);
                    setTimeout(function() {
                        isRepeat = false;
                    }, 3000)
                    return;
                };
                tag = tagArr.join(",");
                remark = $outerNode.find(".js-evaluateInner").val() || '';
                if (/^\s+$/g.test(remark)) {
                    remark=""
                }
                //���������Ƿ�Ϊ��ѡ
                if (currentStatus && remark == "" && config[score - 1].isInputMust && score != 5) {
                    showTip.show(languageText['T0105']);
                    setTimeout(function() {
                        isRepeat = false;
                    }, 3000)
                    return;
                }
                if (currentStatus == 1) {
                    if (config[0].isQuestionFlag == 1) {
                        if ($outerNode.find(".js-solved").hasClass("solveActive")) {
                            solved = 1
                        } else {
                            solved = 0
                        }
                    } else {
                        solved = -1
                    }
                } else {
                    if ($outerNode.find(".js-solved").hasClass("solveActive")) {
                        solved = 1;
                        score = 5;
                    } else {
                        solved = 0;
                        score = 0;
                    }
                };
                $.ajax({
                    type: "post",
                    url: "/chat/user/comment.action",
                    dataType: "json",
                    data: {
                        cid: global.apiInit.cid,
                        visitorId: global.apiInit.uid,
                        score: score,
                        tag: tag,
                        solved: solved,
                        remark: remark,
                        type: currentStatus,
                        //0,�������ۣ�1Ϊ��������
                        commentType: commentType
                    },
                    success: function(req) {
                        if (req.status === 1) {
                            //alert("��л���ķ���");
                            // var conf = {
                            //     'language': language,
                            //     'languageText': languageText
                            // };
                            // var evamsgHtml = doT.template(template.evamsgHtml)(conf);
                            // $body.append(evamsgHtml);
                            showTip.show(languageText['T0032']);

                            //���������۵�״̬���ظ�ϵͳ��Ϣ���������
                            var pushEavConf = {
                                "score": score,
                                "solved": solved
                            };
                            listener.trigger('sendArea.toPushEav', pushEavConf);
                            if (evaType) { //&&evaType.sourceType===0
                                listener.trigger("listMsg.closePushEva")
                            }
                            //���е���λ��
                            position();
                            setTimeout(function() {
                                $('.js-evamsg').remove();
                            }, 3000);
                            $outerNode.remove();
                        } else {
                            hideDialog();
                            showTip.show(languageText['T0033']);
                            // var conf = {
                            //     'language': language,
                            //     'languageText': languageText
                            // };
                            // var evamsgHtml2 = doT.template(template.evamsgHtml2)(conf);
                            // $body.append(evamsgHtml2);
                            //���е���λ��
                            position();
                            // setTimeout(function() {
                            //     $('.js-evamsg').remove();
                            // }, 3000)
                        }
                    },
                    //������������
                    error: function() {
                        hideDialog();
                        showTip.show(languageText['T0033']);
                        // var conf = {
                        //     'language': language,
                        //     'languageText': languageText
                        // };
                        // var evamsgHtml2 = doT.template(template.evamsgHtml2)(conf);
                        // $('body').append(evamsgHtml2);
                        //���е���λ��
                        position();
                        // setTimeout(function() {
                        //     $('.js-evamsg').remove();
                        // }, 3000)
                    }
                });
                $(".js-endSession span").css("width", "45%");
                setTimeout(function() {
                    isRepeat = false;
                }, 3000)
            }
        };

        var position = function() {
            //����
            var left, top;
            left = ($(window).width() - 200) / 2 + "px";
            top = ($(window).height() - $(".js-evamsg").height()) / 2 + "px";
            $(".js-evamsg").css({ "left": left, "top": top });
        };
        var fnPoint = function(iArg) { //alert(iArg);
            //������ֵ
            for (var i = 0; i < $aLi.length; i++) {
                $aLi[i].className = i < iArg ? "on" : "";
            }
        };

        var modeAlert = function() {
            Alert.show();
        };
        var hideDialog = function() {
            $outerNode.animate({ "opacity": 0 });
            setTimeout(function() {
                $outerNode.remove();
            }, 1000)
        };
        var bindListener = function() {
            $outerNode.delegate(".js-solved", "click", function() {
                if (!$(this).hasClass("solveActive")) {
                    $(this).addClass("solveActive");
                    $(this).css({ "background": color, "border": "1px solid " + color });
                    $outerNode.find(".unsolveActive").css({ "background": "#fff", "border": "1px solid #d6dbe5" });
                    $outerNode.find(".js-unSolved").removeClass("unsolveActive");
                    if (currentStatus == 0) {
                        $outerNode.find(".js-evaluateDetail").remove();
                    }
                }
            });
            $outerNode.delegate(".js-unSolved", "click", function() {
                if (!$(this).hasClass("unsolveActive")) {
                    $(this).addClass("unsolveActive");
                    $(this).css({ "background": color, "border": "1px solid " + color });
                    $outerNode.find(".solveActive").css({ "background": "#fff", "border": "1px solid #d6dbe5" });
                    $outerNode.find(".js-solved").removeClass("solveActive");
                }
                if (currentStatus == 0) {
                    sobotSetInnerStepTwoHtml()
                }
            });
            $outerNode.delegate(".js-close_button", "click", function() {
                hideDialog();
            });
            $outerNode.delegate(".js-tag", "click", toggleActiveRepeat);
            $outerNode.delegate(".js-submit", "click", EvaluateAjaxHandler);

        };

        var parseDOM = function() {
            $body = $(document.body);
            $evaluate = $(".js-evaluate");
        };
        var init = function() {
            //��ֹ�û����ٶ�ε������
            $('.layer-opacity0').remove();
            parseDOM();

            //����������
            if (currentStatus == 0) {
                sobotSetInnerStepOneHtml();
                //sobotbindListener();
                //�˹�����
            } else {
                //humanInitPlugins();
                humanSetInnerStepOneHtml();
                //humanbindListener();
            };
            bindListener();
            //����������������������
            // if (evaType.from=="push") {
            //     if (evaType.score) {
            //         score = evaType.score;
            //         humanSetInnerStepTwoHtml();
            //         for (var i = 0; i < score; i++) {
            //             $("#star li").eq(i).addClass("on")
            //         }
            //     }
            // }

        };
        var initConfig = function() {
            showTip = showTip(global);
            $ajax({
                type: "get",
                url: "/chat/user/satisfactionMessage.action",
                dataType: "json",
                data: {
                    uid: global.apiInit.uid
                },
                success: function(req) {
                    // console.log(req);
                    if (req.status === 1) {
                        config = req.data;
                        init();
                    }
                },
                //������������
                error: function() {
                    showTip.show('������������');
                    setTimeout(function() {
                        $('.js-evamsg').remove();
                    }, 3000)
                }
            });

        };
        initConfig();
        this.modeAlert = modeAlert;
    }

    module.exports = evaluate;
},{"../../../common/util/listener.js":29,"../../../common/util/monitAjax.js":30,"../util/alert.js":60,"../util/showTip.js":67,"./template.js":58}],57:[function(require,module,exports){
    /**
     *
     * @author daijm
     */
    function TextArea(window) {
        // alert(navigator.userAgent);
        //var that = {};
        var global;
        var language, languageText
        var listener = require("../../../common/util/listener.js");
        //����
        var ZC_Face = require('../util/qqFace.js')();
        //�ϴ�����
        var uploadImgFun = require('./uploadImg.js');
        var getCurrentManualStatus = require("../../../common/mode/currentState.js");
        var uploadImg;
        var browserAdapter = require("./browserAdapter.js");
        //��ǰ״̬
        //var CurrentState = require('../../../common/mode/currentState.js');
        //ģ��placeholder
        //var placeholder = require('./placeholder.js');
        //������ڵ�����
        //var inputBoxBlock=require("./inputBoxBlock.js");
        var evaluate = require("./evaluate.js");
        /* var inputCache = {};*/
        //ģ������
        var template = require('./template.js');
        var global;
        var $node, $shadow;
        var currentCid,
            currentUid,
            answer,
            //��ס������״̬,������ͺ�Ҫ����
            focusStatus,
            currentStatus,
            //�û�����������ڿͷ���ʾ
            timer,
            //�Ự�Ƿ����, ������ֹĳЩ�¼�
            sessionEnd = false,
            //�ж��û��Ƿ�˵����
            //isSpeak=false,
            //�Ƿ����۹� -1��ʾ�û�û��˵������0��ʾ˵����û�����۹���1��ʾ���۹�
            isEvaluated = -1,
            isRepeat = false,
            leaveMsgMutex = false;
        //0Ϊ�����ˣ�1Ϊ�˹�
        var transferFlag = 0,
            browserType = "",
            phoneType = "",
            phoneTypeFlag = false,
            browserInfo = "",
            eventType = "",
            isQueueFlag = false, //�ж��Ƿ����ų�
            aname = "";
        var oldIsFirstPopInputFlag = true;
        //���������url
        var statusHandler = function(data) {
            currentStatus = data;
            if (currentStatus == "human") {
                transferFlag = 1;
                $qqFaceTip.removeClass("activehide");
                //�ϴ�ͼƬ��ť
                $uploadImg.removeClass("activehide");
                //���������
                $satisfaction.removeClass("activehide");
                if (global.apiConfig.type == 1) {
                    $(".js-textarea").attr("placeholder", global.apiConfig.robotDoc)
                } else {
                    //��ʾ�ı�
                    $(".js-textarea").attr("placeholder", global.apiConfig.customDoc)
                }

            } else if (currentStatus == 'robot') {
                transferFlag = 0;
                $uploadImg.addClass("activehide");
                $satisfaction.removeClass("activehide");
                if (!isQueueFlag) {
                    $(".js-textarea").attr("placeholder", global.apiConfig.robotDoc) //languageText['T0023']
                }
            }
        };


        var onCommentWindowClose = function() {
            $shadow.toggleClass("disabled");
        };

        var onPostMessage = function(evt) {
            var data;
            if (typeof evt.data === 'string') {
                try {
                    data = JSON.parse(evt.data);
                } catch (e) {}
            } else {
                data = evt.data;
            }
            if (data.name === 'zhichiClose') {
                onCommentWindowClose();
                return;
            }
            if (data.type == 'auto') {
                if (getCurrentManualStatus.getCurrentState() == 'human') {
                    return;
                }
                global.urlParams.autoManual = true;
                global.urlParams.aid = data.aid;
                artificialHandler();
            }
        };

        var changeStatusHandler = function(data) {
            //hide,ת�˹���ť����
            if (data.action == "hide") {
                $artificial.addClass("activehide");
                //��������
                if (global.apiConfig.type == 1) {
                    $(".js-textarea").attr("placeholder", global.apiConfig.robotDoc).attr("contenteditable", "true")
                } else {
                    $(".js-textarea").attr("placeholder", global.apiConfig.customDoc).attr("contenteditable", "true")
                };
                if ($textarea.text()) {
                    //�Ӻ������ж�������ʾ��û�в���ʾ
                    $add.addClass("activehide");
                }

            } else {
                $artificial.removeClass("activehide");
                //alert($chatAdd.width());
            }
        }
        //�û����룬����̨��ʾ
        var chatAdminshowtextHandler = function(evt) {
            if (evt && evt.keyCode == 13) {
                return;
            }
            clearInterval(timer);
            timer = setTimeout(function() {
                var content = $textarea.text();
                $.ajax({
                    type: "post",
                    url: "/chat/user/input.action",
                    dataType: "json",
                    data: {
                        cid: currentCid,
                        uid: currentUid,
                        content: content
                    }
                });
            }, 500)
        };
        var showSendBtnHandler = function(evt) {
            //������볤��1024
            var str = $textarea.text();
            str = str.trim();
            if (str.length > 1024) {
                $textarea.text(str.substring(0, 1024))
            };
            //�жϵ�ǰ�Ƿ�Ϊ�˹�ģʽ
            if (transferFlag == 0) {
                robotmodeButton();
            } else {
                manualmodeButton();
                //FIXME  ֻҪ�����Ự��Ż�����̨���û�������������
                //����̨��ʾ��Ϣ
                chatAdminshowtextHandler(evt);
            }
            //ʵʱ�����������뷨
            //   specialModelshideKeyboardHandler();
        };
        var robotmodeButton = function() {
            var _text = $textarea.text();
            if (_text) {
                //if (phoneTypeFlag == false) {
                $sendBtn.removeClass("activehide");
                $add.addClass("activehide");
                //}
                hideChatAreaHandler();
            } else {
                //if (phoneTypeFlag == false) {
                $sendBtn.addClass("activehide");
                $add.removeClass("activehide");
                //}
                hideChatAreaHandler();
            }
            if (document.activeElement.id == "js-textarea") {
                focusStatus = true;
            }
        };
        var manualmodeButton = function() {
            var _text = $textarea.text();
            if (_text) {
                //if (phoneTypeFlag == false) {
                $sendBtn.removeClass("activehide");
                $add.addClass("activehide");
                //}
            } else {
                //if (phoneTypeFlag == false) {
                $sendBtn.addClass("activehide");
                $add.removeClass("activehide");
                //}
                hideChatAreaHandler();
                // $textarea.blur();
                // $textarea.focus();
            }
            if (document.activeElement.id == "js-textarea") {
                focusStatus = true;
            }
        };
        var onbtnSendHandler = function(evt) {
            var str = $textarea.text();
            str = str.trim();
            //�ж�������Ƿ�Ϊ��
            if (str.length == 0 || /^\s+$/g.test(str)) {
                $textarea.html("")
                return false;
            } else {
                //���˱���
                //ZC_Face.analysisRight(str);
                //xss
                var $dom = $('<div></div>').text(str);
                var s = $dom.html();
                //ͨ��textarea.send�¼����û������ݴ�����ʾ̨
                var date = currentUid + +new Date();
                setTimeout(function() {
                    listener.trigger('sendArea.send', [{
                        'answer': s,
                        'uid': currentUid,
                        'cid': currentCid,
                        'dateuid': date,
                        'date': +new Date(),
                        'token': "",
                        'sendAgain': false,
                        'currentStatus': currentStatus
                    }]);
                }, 200)

            };
            //��մ����Ϳ�
            $textarea.html("");
            //����ǰ��ʲô״̬�����ͺ����ʲô״̬
            //��ȡdocument�ϻ�ȡ�����id,������س����͵�ʱ������ִ��blur�¼���������ּ�������
            if (evt.keyCode != "13") {
                if (focusStatus) {
                    $add.removeClass("activehide");
                    if (phoneTypeFlag == false && global.urlParams.from != 'iframe') {
                        //�������iphone�ֻ������ֶ�������
                        setTimeout(function() {
                            //$textarea.blur();
                            $textarea.focus();
                        }, 50)
                    };
                    if (phoneTypeFlag && global.urlParams.from == 'iframe') {
                        setTimeout(function() {
                            $(".js-textarea").blur();
                        }, 50)
                        //$textarea.blur();
                    }
                    setTimeout(function() {
                        autoSizePhone();
                    }, 0);
                } else {
                    $add.removeClass("activehide");
                }
            } else {
                $add.removeClass("activehide");
            }
            $sendBtn.addClass("activehide");
            $chatArea.removeClass("showChatEmotion");
            $qqFaceTip.removeClass("qqFaceTiphover");
            autoSizePhone();
            setTimeout(function() {
                clearTimeout(timer);
            }, 100);
            try {
                if (window.localStorage) {
                    window.localStorage.setItem("isFirstPopInputFlag", 'true');
                }

            } catch (e) {}

        };
        var blurHandler = function() {
            //$textarea.remove();
            //$(".js-qqFaceTip").before('<div id="js-textarea" class="textarea js-textarea" placeholder="'+languageText['T0023']+'" contenteditable="true"></div>')
        };
        var showChatAddHandler = function() {
            $(".js-textarea").blur();
            //������Ż�
            if ($chatArea.hasClass("showChatAdd")) {
                //����
                hideChatAreaHandler();
                //0Ϊ������ģʽ
                if (transferFlag == 0) {
                    $add.removeClass("activehide")
                    $qqFaceTip.addClass("activehide")
                } else {
                    $add.removeClass("activehide")
                    $qqFaceTip.removeClass("activehide")
                }
                autoSizePhone();
            } else {
                //��ʾ
                $chatArea.addClass("showChatAdd");
                $add.addClass("addhover");
                $chatArea.removeClass("showChatEmotion");
                $qqFaceTip.removeClass("qqFaceTiphover");
                //0Ϊ������ģʽ
                if (transferFlag == 0) {
                    $qqFaceTip.addClass("activehide")
                } else {
                    $qqFaceTip.removeClass("activehide")
                }
                autoSizePhone();
            }
            focusStatus = false;
        };
        var showChatEmotionHandler = function() {
            $(".js-textarea").blur();
            //������Ż�
            if ($chatArea.hasClass("showChatEmotion")) {
                //����
                hideChatAreaHandler();
                autoSizePhone();
            } else {
                //��ʾ
                $chatArea.addClass("showChatEmotion");
                $add.removeClass("addhover");
                $chatArea.removeClass("showChatAdd");
                $qqFaceTip.addClass("qqFaceTiphover");
                // $chatAdd.hide();
                //$chatEmotion.css("display", "inline-block");
                if (transferFlag == 0) {
                    $qqFaceTip.addClass("activehide");
                    $add.removeClass("activehide")
                } else {
                    var _text = $textarea.text();
                    //if (phoneTypeFlag == false) {
                    if (_text) {
                        $add.addClass("activehide")
                        $sendBtn.removeClass("activehide")
                    } else {
                        $add.removeClass("activehide")
                        $sendBtn.addClass("activehide");
                    }
                    //}
                }
                autoSizePhone();
            }
            focusStatus = false;
        };
        var hideChatAreaHandler = function() {
            $chatArea.removeClass("showChatAdd");
            $chatArea.removeClass("showChatEmotion");
            $add.removeClass("addhover");
            $qqFaceTip.removeClass("qqFaceTiphover")
            autoSizePhone();
            var _text = $textarea.text();
            if (transferFlag == 0) {
                $qqFaceTip.addClass("activehide");
                //if (phoneTypeFlag == false) {
                if (_text) {
                    $add.addClass("activehide");
                    $sendBtn.removeClass("activehide");
                } else {
                    $add.removeClass("activehide");
                    $sendBtn.addClass("activehide");
                }
                //}
            } else {
                $qqFaceTip.removeClass("activehide");
                //if (phoneTypeFlag == false) {
                if (_text) {
                    $add.addClass("activehide");
                    $sendBtn.removeClass("activehide");
                } else {
                    $add.removeClass("activehide");
                    $sendBtn.addClass("activehide");
                }
                //}
            }
            //������ڵ�������
            inputUPHandler();
            focusStatus = false;
        };
        //���顢�Ӻ��л�
        var tabChatAreaHandler = function() {
            //������鰴ť��ʱ���ٸ��Ӻ�����л������������򶯻�Ч���ᱻ����
            var id = $(this).attr("data-id");
            $(id).removeClass("activehide");
        };
        //��λ���
        var gotoxyHandler = function(data) {
            //����img��ǩ
            var src = data[0].answer;
            //���±���׷�ӵ������Ϳ���
            var _html = $textarea.html() + src;
            $textarea.html(_html);
            var textarea = document.getElementById('js-textarea');
            textarea.scrollTop = textarea.scrollHeight;
            //��ʾ�ı�
            //$textarea.attr("placeholder","��ǰ���˹�")
            //��ʾ���Ͱ�ť
            manualmodeButton();
            //��������߶�
            autoSizePhone();
        };
        //ģ���˸�(����)
        var backDeleteHandler = function() {
            var _html = $textarea.text();
            if (_html.length == 1) {
                _html = "";
            } else {
                _html = $.trim(_html.substring(0, _html.length - 1));
            }
            $textarea.text(_html);
            focusStatus = false
        };
        var onImageUpload = function(data) {
            //ͨ��textarea.send�¼����û������ݴ�����ʾ̨
            var img = '<img class="webchat_img_upload uploadedFile" src="' + data[0].answer + '" />';
            listener.trigger('sendArea.send', [{
                'answer': img,
                'uid': currentUid,
                'cid': currentCid,
                //ʱ���
                'dateuid': data[0].token,
                'date': data[0].date,
                'token': data[0].token,
                //false֤�������ط�(����ͼƬ)
                'sendAgain': false,
                'currentStatus': currentStatus
            }]);
            focusStatus = false;
            //������ڵ�������
            inputUPHandler();
        };
        var artificialHandler = function() {
            $(".js-textarea").blur();
            if (isRepeat == false) {
                isRepeat = true;
                listener.trigger('sendArea.artificial');
                //��ֹ���ٵ��ת�˹���ť
                setTimeout(function() {
                    isRepeat = false;
                }, 3000)
            }

            //autoSizePhone();
            focusStatus = false;
        };
        //�������Ӧ�ֻ�
        var autoSizePhone = function() {
            listener.trigger('sendArea.autoSize', $chatArea);
        };

        //�û��Ŷ��С�����
        var onCustomQueue = function() {
            isQueueFlag = true; //�����Ŷ���
            $(".js-textarea").attr("placeholder", global.apiConfig.waitDoc).attr("contenteditable", "true"); //languageText['T0024']
            // leaveMessageBtnClickHandler();
        }

        //�����Ự
        var endSessionHandler = function(status) {
            switch (status) {
                case -3: //�˹�����ģʽ��ת�˹�ʧ��,�пͷ��Ŷ���
                    $qqFaceTip.addClass("activehide");
                    //$satisfaction.addClass("activehide");
                    break;
                case -2: //���˹�ģʽ��ת�˹�ʧ��,�пͷ��Ŷ���
                    //FIXME  �����û�ת�Ӳ��ߴ˷���  ���¼����� ==> onCustomQueue
                    $(".js-textarea").attr("placeholder", global.apiConfig.waitDoc).attr("contenteditable", "false"); //languageText['T0024']


                    $artificial.addClass("activehide");
                    $qqFaceTip.addClass("activehide");
                    //$satisfaction.addClass("activehide");
                    break;
                case -4: //websocket�жϣ��������ιر�
                case -1: //���˹�ģʽ��ת�˹�ʧ��,�޿ͷ�
                case 1: //�ͷ��Լ�������
                case 2: //�ͷ�����T��
                case 3: //�ͷ�����������
                case 4: //��ʱ�䲻˵��
                case 6: //���´��ڴ�
                case 7: //�����˳�ʱ����
                    $(".js-textarea").blur();
                    //Ϊ��iphone�µ�������ڵ�����
                    setTimeout(function() {
                        $(".js-chatArea").css("height", "64px");
                    }, 100)
                    $keepSession.hide();
                    $endSession.show();
                    autoSizePhone();
                    sessionEnd = true;
                    // if (status == -1) { //���˹�ģʽ��ת�˹�ʧ��,�޿ͷ�
                    //     //�Ƴ����������
                    //     $(".js-satisfaction").addClass("activehide");
                    // }

                    if (status == -1 || status == 3) { //���˹�ģʽ��ת�˹�ʧ��,�޿ͷ�,����
                        //�Ƴ����������
                        $(".js-satisfaction").addClass("activehide");
                        if (status == -1 && global.urlParams.msgflag != 1) {
                            //������ת����������
                            if (global.urlParams.isLeaveCustomSysFlag) {
                                window.open(global.urlParams.leaveCustomUrl);
                            } else {
                                //����
                                leaveMessageBtnClickHandler();
                            }
                        }
                    }



                    //���ۿ���
                    if (!global.urlParams.satDegree_A) {
                        $(".js-endSatisfaction").remove();
                    }
                    //���Կ���
                    if (global.apiConfig.msgflag == 1) {
                        $(".js-leaveMsgBtn").addClass("activehide");
                    }
                    //flex���ݴ���
                    if ($(".sendarea").css("display") != "flex") {
                        $(".endSession").css({ "display": "inline-block" });
                    };

                    break;
            }
        };
        //���¿�ʼ�»Ự
        var newMessage = function() {
            var ua = navigator.userAgent.toLowerCase();
            if (ua.match(/MicroMessenger/i) == "micromessenger") {
                //΢���������������ʹ�����������˷���
                var random = +new Date();
                str = window.location.href.replace("#", "").replace(/&autoManual=[^&]+/, '');
                //alert(str)
                window.location.href = str + "&refresh=" + random;
            } else {
                var href = window.location.href;
                href = href.replace(/(&|\?)autoManual=[^&]+/, '').replace(/#[\S]+$/, '');
                href = href.replace(/(&|\?)tnk=[^&]+/, '');
                href += '&tnk=' + (+new Date());
                window.location.href = href;
            }
        };
        var evaluateHandler = function(data) {
            if (isRepeat == false) {
                isRepeat = true;
                $.ajax({
                    type: "post",
                    url: "/chat/user/isComment.action",
                    dataType: "json",
                    data: {
                        cid: global.apiInit.cid,
                        uid: global.apiInit.uid,
                        type: transferFlag
                    },
                    success: function(req) {
                        isEvaluated = req.isComment;
                        //console.log(req.isComment);
                        //1��ʾ���۹�
                        if (isEvaluated == 1) {
                            var evaluateSystem = {
                                type: 'system',
                                status: 'evaluated',
                                data: {
                                    content: languageText['T0025']
                                }
                            }
                            listener.trigger('sendArea.sendAreaSystemMsg', evaluateSystem);
                        } else if (isEvaluated == 0) { //0��ʾ˵����û�����۹�
                            //��ֹ�û����ٶ�ε������
                            var conf = {};
                            var _html = doT.template(template.layerOpacity0)(conf);
                            $(document.body).append(_html);
                            //����
                            evaluate(transferFlag, global, data, aname);
                        } else { //-1��ʾ�û�û��˵����
                            var evaluateSystem = { type: 'system', status: 'firstEvaluate', data: { content: languageText['T0026'] } }
                            listener.trigger('sendArea.sendAreaSystemMsg', evaluateSystem);
                        }
                        focusStatus = false;
                    }
                });
                //��ֹ���ٵ��
                setTimeout(function() {
                    isRepeat = false;
                }, 1000)
            }
        };
        var toDetailEvaluate = function(data) {
            //console.log(data);
            evaluateHandler(data);
        };
        var hideKeyboard = function(data) {
            //�Ựû������ʱ������Ļ�����ʧȥ����
            $(".js-textarea").blur();
            var viewHeight = $(document).height() - $(".sendarea").height();
            if (global.urlParams.back) {
                viewHeight -= 50;

            }
            //data<viewHeight˵����ǰ�ı�����̧��״̬
            if (!sessionEnd && data < viewHeight) {
                // TODO  iframe�� �÷�����������ִ��
                // alert(data+';'+viewH);
                if (global.urlParams.from == 'iframe') {
                    // setTimeout(function() {
                    //     var _input = $('<input class="js-cache-input" />');
                    //     $(document.body).append(_input);
                    //     _input.focus();
                    //     $(document.body).find('.js-cache-input').remove();
                    // }, 300)
                } else {
                    var _text = $textarea.text();
                    if (transferFlag == 0) {
                        if (_text) {
                            $qqFaceTip.addClass("activehide");
                        } else {
                            $add.removeClass("activehide");
                            $qqFaceTip.addClass("activehide");
                        }
                    } else {
                        if (_text) {
                            $qqFaceTip.removeClass("activehide");
                        } else {
                            $add.removeClass("activehide");
                            $qqFaceTip.removeClass("activehide");
                        }
                    }
                    inputUPHandler();
                    focusStatus = false;
                    autoSizePhone();
                }

            }
            $add.removeClass("addhover");
            $qqFaceTip.removeClass("qqFaceTiphover");
            $chatArea.removeClass("showChatEmotion").removeClass("showChatAdd");

            try {
                if (window.localStorage) {
                    window.localStorage.setItem('isFirstPopInputFlag', 'false');
                }
            } catch (e) {}


        };
        //������������������
        var specialModelsHandler = function() {

            $(".js-chatArea").css({ "top": "auto", "bottom": "0" });

        };

        var onGroupList = function() {
            setTimeout(function() {
                isRepeat = false;
                artificialHandler()
            }, 10)
        };


        //��������������̧��
        var specialModelshideKeyboardHandler = function() { //���������ο���ַhttps://github.com/daijnming/contenteditable/issues
            browserAdapter(phoneType, browserType, browserInfo);
            autoSizePhone();
            //ios11�״ε���������ʶ
        };
        var initHover = function() {
            // $add.on("touchstart", function() {
            //     $(this).addClass("addhover");
            // });
            // $add.on("touchend", function() {
            //     setTimeout(function() {
            //         $add.removeClass("addhover")
            //     }, 300)
            // });
            // $qqFaceTip.on("touchstart", function() {
            //     $(this).addClass("qqFaceTiphover");
            // });
            // $qqFaceTip.on("touchend", function() {
            //     setTimeout(function() {
            //         $qqFaceTip.removeClass("qqFaceTiphover")
            //     }, 300)
            // });
            $uploadImg.on("touchstart", function() {
                $(".uploadImgbg").addClass("uploadImgbgHover");
            });
            $uploadImg.on("touchend", function() {
                setTimeout(function() {
                    $(".uploadImgbg").removeClass("uploadImgbgHover")
                }, 300)
            });
            $satisfaction.on("touchstart", function() {
                $(".satisfactionbg").addClass("satisfactionbgHover");
            });
            $satisfaction.on("touchend", function() {
                setTimeout(function() {
                    $(".satisfactionbg").removeClass("satisfactionbgHover")
                }, 300)
            });
            $leaveMessage.on("touchstart", function() {
                $(".leaveMessagebg").addClass("leaveMessagebgHover");
            });
            $leaveMessage.on("touchend", function() {
                setTimeout(function() {
                    $(".leaveMessagebg").removeClass("leaveMessagebgHover")
                }, 300)
            });

        };
        var flexcompatible = function() {
            $textarea.css({ "width": "70%" });
            $(".endSession span").css({ "display": "inline-block" });
            $(".endSession span").css({ "width": "28%" });
        };
        var inputUPHandler = function() {
            autoSizePhone();
        };
        var noSliding = function() {
            return false;
        }
        var parseDOM = function() {
            $node = $("#chatArea");
            $chatArea = $(".js-chatArea");
            $sendBtn = $(".js-sendBtn");
            $textarea = $(".js-textarea");
            $sendarea = $(".sendarea");
            //ת�˹���ť
            $artificial = $(".js-artificial")
            $add = $(".js-add");
            $chatAdd = $(".js-chatAdd");
            //�ϴ�ͼƬ��ť
            $uploadImg = $(".js-uploadImg");
            //���鰴ť
            $emotion = $(".js-emotion");
            $chatEmotion = $(".js-chatEmotion");
            $tab = $(".js-tab");
            //�Ự����
            $keepSession = $(".js-keepSession")
            //�����Ự����
            $endSession = $(".js-endSession");
            //�»Ự
            $newMessage = $(".js-newMessage");
            //����
            $satisfaction = $(".js-satisfaction");
            //oTxt = document.getElementById("js-textarea");
            //���԰�ť
            $leaveMessage = $(".js-leaveMessage");
            //��ʾ
            //$placeholder=$(".js-placeholder");
            $qqFaceTip = $(".qqFaceTip");

        };

        var resizeFrameWidthHandler = function(e) {

            //��iframe��ȱ仯
            var evt = e || window.event;
            type = evt.type;
            try {
                if (window.localStorage) {
                    window.localStorage.setItem('inputStatus', type);
                }

            } catch (e) {}
            if (window != window.parent) {
                if (type == 'focus')
                    window.parent.postMessage('focus-frame', '*');
                else if (type == 'blur')
                    window.parent.postMessage('blur-frame', '*');
            }
        };

        var leaveMessageBtnClickHandler = function(evt) {
            if (leaveMsgMutex) {
                return;
            }
            leaveMsgMutex = true;
            setTimeout(function() {
                leaveMsgMutex = false;
            }, 500);
            evt && evt.preventDefault();
            if (!$shadow || global.urlParams.leaveMsgSendGroupIdFlag) {
                //var $elm = $(evt.currentTarget);
                var url = global.apiConfig.leaveMsgUrl; //$elm.attr("data-href");
                url = url.replace(/\&back=\d/, '');
                // var color = global.urlParams.color + "" || 'fff';
                var color = global.urlParams.color ? global.urlParams.color : global.apiConfig.color;
                // console.log(color);
                if (color.indexOf("#") < 0) {
                    color = "#" + color;
                };
                url = url + "&uid=" + global.apiInit.uid;
                //�����Ӻ���׷��groupId
                if (global.urlParams.leaveMsgSendGroupIdFlag && global.urlParams.leaveMsgGroupId) {
                    url = url + "&leaveMsgGroupId=" + global.urlParams.leaveMsgGroupId
                };
                var _html = doT.template(template.shadowTemplate)({
                    'url': url,
                    'color': color,
                    'title': languageText['T0040']
                });
                $shadow = $(_html);

                $shadow.css({
                    'top': 0
                }).addClass("disabled");
                $(document.body).append($shadow);
                $shadow.find("iframe").css({
                    'height': document.body.clientHeight
                });
                $shadow.find(".close-btn").on("click", function() {});
            } else {
                $shadow.find("iframe")[0].contentWindow.location.reload();
            }
            if ($(".js-chatArea").hasClass("showChatAdd")) {
                showChatAddHandler();
            }
            setTimeout(function() {
                $shadow.toggleClass("disabled");
            }, 10);
        };

        var bindLitener = function() {
            //���Ͱ�ť
            $sendBtn.on(eventType, onbtnSendHandler);
            //qq����
            $emotion.on(eventType, onEmotionClickHandler);
            $(document.body).delegate(".close-btn", 'click', onCommentWindowClose);
            $textarea.on("keyup", showSendBtnHandler);
            $(window).on("message", onPostMessage);
            // ������Ϣ
            $textarea.on('input', showSendBtnHandler, false);
            listener.on("core.grouplist", onGroupList);
            //$textarea.on("keydown",chatAdminshowtextHandler);
            $textarea.on("focus", hideChatAreaHandler);
            $textarea.on("focus", specialModelshideKeyboardHandler);
            $textarea.on("blur", specialModelsHandler);
            //$(document.body).delegate(".js-textarea", "focus", resizeFrameWidthHandler);
            $textarea.on("focus", resizeFrameWidthHandler);
            $textarea.on('blur', resizeFrameWidthHandler);
            /*******/
            $add.on(eventType, showChatAddHandler);
            $emotion.on(eventType, showChatEmotionHandler);
            //���顢�Ӻ��л�
            $tab.on(eventType, tabChatAreaHandler)
            //��λ���
            listener.on("sendArea.gotoxy", gotoxyHandler);
            //ģ���˸�
            listener.on("sendArea.backDelete", backDeleteHandler);
            //����ͼƬ
            listener.on("sendArea.uploadImgUrl", onImageUpload);
            $(window).on("resize", autoSizePhone);
            listener.on("listMsg.hideKeyboard", hideKeyboard);
            listener.on("listMsg.realScrollBottom", autoSizePhone);
            //ת�˹�
            $(document.body).delegate(".js-artificial", eventType, artificialHandler);
            //�����Ự
            listener.on("core.sessionclose", endSessionHandler);
            //�»Ự
            $newMessage.on(eventType, newMessage);
            //���۵���
            $satisfaction.on(eventType, evaluateHandler);
            //��������
            listener.on("listMsg.toDetailEvaluate", toDetailEvaluate);
            //��ֹ���������
            $chatArea.on('touchmove', noSliding);
            $(".js-noSliding").on('touchmove', noSliding);

            //�ϴ�ͼƬ����Ӻ���
            listener.on("sendArea.closeAddarea", hideChatAreaHandler);
            //�����˳�ʱ�Ự
            listener.on("listMsg.robotAutoOffLine", endSessionHandler);
            $(document.body).on('listMsg-queue', onCustomQueue); //�û��Ŷ���
            //Ϊ�˽��������ڵ�����
            $textarea.on("blur", function() {
                setTimeout(function() {
                    inputUPHandler();
                }, 50);
            });
            //�س�����
            $textarea.on('keydown', function(evt) {
                if (evt.keyCode == "13") {
                    //iphone�˹�ģʽ�µĻس���ִ��ʧ���¼�
                    onbtnSendHandler(evt);
                    return false;
                }
            });

            listener.on("listMsg.showChatSwitch", function() {
                $artificial.css("display", "block");
            });
        };


        var onEmotionClickHandler = function() {
            listener.trigger('sendArea.faceShow');
        };
        var initPlugsin = function() { //���
            //�ϴ�ͼƬ
            //iphone����tap�¼��������ʧ��
            eventType = navigator.userAgent.toLowerCase().indexOf("mobile") >= 0 ? 'tap' : 'click';
            phoneTypeFlag = navigator.userAgent.toLowerCase().indexOf("iphone") >= 0 ? true : false;
            //alert(phoneTypeFlag);
            //alert(navigator.userAgent.toLowerCase());
            //�ж��Ƿ�����ѯ�ܽ�  ֻ��ֵΪ false ʱ���� ���۰�ť
            //alert(global.urlParams.satDegree_A)
            // if (global.urlParams.satDegree_A){
            //      $satisfaction.addClass('show');
            // } else {
            //      $satisfaction.addClass('hide');
            // }
            autoSizePhone();
            if (global.urlParams.autoManual && (global.apiConfig.type == 1 || global.apiConfig.type == 3)) {
                setTimeout(artificialHandler, 100);
            }
        };
        var init = function() {
            //parseDOM();
            initPlugsin();
            bindLitener();
            //��ʼ����ť
            $qqFaceTip.addClass("activehide");
            $sendBtn.addClass("activehide");
            //hoverЧ��
            initHover();
            //flex���ݴ���
            if ($(".sendarea").css("display") != "flex") {
                flexcompatible();
            }
            //�Ӻ������ж�������ʾ��û�в���ʾ
            // if(!$chatAdd.width()){
            //     $add.addClass("activehide");
            // }
            try {
                if (window.localStorage) {
                    oldIsFirstPopInputFlag = window.localStorage.getItem('isFirstPopInputFlag') || 'true';
                    window.localStorage.setItem("isFirstPopInputFlag", oldIsFirstPopInputFlag);
                }

            } catch (e) {}
        };
        (function() {
            parseDOM();
            //�Ƿ����ذ�ť
            listener.on("core.buttonchange", changeStatusHandler);
            //�ı䵱ǰ״̬
            listener.on("core.statechange", statusHandler);
            listener.on("sendArea.openleaveMsgPage", leaveMessageBtnClickHandler);
            //ˢ�£�ת�˹��ɹ�
            listener.on("core.transfersuccess", function(data) {
                //�˹�����
                aname = data.data.aname;
            });
        })();
        listener.on("core.onload", function(data) {
            global = data[0];
            language = global.language.lan;
            languageText = global.language.text;
            uploadImg = uploadImgFun(global);
            currentUid = global.apiInit.uid;
            currentCid = global.apiInit.cid;
            //���Կ��أ�1������0�ر�
            if (!global.urlParams.isMessageFlag) {
                $(".js-sendLeaveMessage").remove();
            }
            //�ϴ��������أ�1������0�ر�
            if (!global.apiConfig.isUploadFlag) {
                $(".js-uploadImg").remove();
            }
            //���ۿ���
            if (!global.urlParams.isFeedBackFlag) {
                $(".js-sendSatisfaction").remove();
            }
            //ת�˹���url������)
            var wurl = global.urlParams.wurl || "";
            var wurlOpenStyle = global.urlParams.wurlOpenStyle || "";
            if (wurl && global.urlParams.isCustomSysFlag == 1) {
                $artificial.remove();
                if (wurlOpenStyle) {
                    $(".js-textarea").before('<a class="artificial js-sendArtificial" target="_blank" href="' + wurl + '"></a>');
                } else {
                    $(".js-textarea").before('<a class="artificial js-sendArtificial" target="_parent" href="' + wurl + '"></a>');
                }

                $artificial = $(".js-sendArtificial");
                listener.trigger('sendArea.wurlHandler', {
                    "wurl": wurl,
                    "wurlOpenStyle": wurlOpenStyle
                });
            }
            //������δ֪������ʾת�˹���ť
            var chatConnectButton = global.urlParams.chatConnectButton;
            if (chatConnectButton == "1") {
                $artificial.css("display", "none");
            }
            //��uid�����ϴ�ͼƬģ��
            listener.trigger('sendArea.sendInitConfig', { "uid": currentUid, "sysNum": global.sysNum });
            //��ȡ��ǰ������İ汾
            browserType = global.browser.browser;
            phoneType = global.UAInfo.iphoneVersion;
            browserInfo = navigator.userAgent.toLowerCase();
            // alert(browserType);
            // alert(phoneType);
            // alert(browserInfo);
            //isMessageFlag����������е�����,0�رգ�1����
            if (global.urlParams.isMessageFlag) {
                var hostUrl = global.apiConfig.leaveMsgUrl;
                var conf = $.extend({
                    'hostUrl': hostUrl,
                    'languageText': languageText
                });
                var _html = doT.template(template.leaveMessageBtn)(conf);
                $leaveMessage.append(_html);
            };
            //msgflag���ƴ����кͽ����Ự������,0������1�ر�
            if (!global.urlParams.msgflag) {
                var hostUrl = global.apiConfig.leaveMsgUrl;
                var conf = $.extend({
                    'hostUrl': hostUrl,
                    'languageText': languageText
                });
                var _html2 = doT.template(template.leaveMessageEndBtn)(conf);
                $endSession.append(_html2);
            };
            //������ת����������
            if (global.urlParams.isLeaveCustomSysFlag) {
                $(document.body).delegate(".leave-msg-btn", 'click', function() {
                    window.open(global.urlParams.leaveCustomUrl);
                });
                $node.delegate(".js-leaveMsgBtn", 'click', function() {
                    window.open(global.urlParams.leaveCustomUrl);
                });
            } else {
                //����
                $(document.body).delegate(".leave-msg-btn", 'click', leaveMessageBtnClickHandler);
                $node.delegate(".js-leaveMsgBtn", 'click', leaveMessageBtnClickHandler);
            }

            $(".js-endSession").hide();
            //�û�������ʽ
            var userColor = global.userInfo.color;
            $sendBtn.css({ "background-color": userColor })
            init();
        });

    }

    module.exports = TextArea;
},{"../../../common/mode/currentState.js":9,"../../../common/util/listener.js":29,"../util/qqFace.js":66,"./browserAdapter.js":55,"./evaluate.js":56,"./template.js":58,"./uploadImg.js":59}],58:[function(require,module,exports){
    /**
     * @author daijm
     */
    var template = {};
    var sobotOne_selfHtml = '<div class="layer js-layer">' +
        '<div class="evamodeDialog js-evamodeDialog">' +
        '<div class="close"><span class="close_button js-close_button">��</span><p class="h1">{{=it.languageText.T0022}}</p></div>' +
        '<div class="model-body">' +
        '<div class="evaluate js-evaluate">' +
        '<div class="operateType">' +
        '<p class="operateTypeTitle">{{=it.subName}}{{=it.languageText.T0098}}</p>' +
        '<div class="operateTypeBtn">' +
        '<p class="solve solved js-solved"><span></span>{{=it.languageText.T0041}}</p>' +
        '<p class="solve unSolved js-unSolved" style="margin-left:25px;"><span></span>{{=it.languageText.T0042}}</p>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<a class="submit js-submit" href="#">{{=it.languageText.T0029}}</a>' +
        '</div>' +
        '</div>' +
        '</div>';
    var sobotTwo_selfHtml = '<div class="evaluateDetail js-evaluateDetail">' +
        '<p class="h2">{{=it.languageText.T0027}}</p>' +
        '<div class="situation">' +
        '{{for(var i=0;i<it.list.length;i++){}}' +
        '{{if(i%2==0){}}' +
        '<span class="tag js-tag" style="float:left;">' +
        '{{=it.list[i]}}' +
        '</span>' +
        '{{}else{}}' +
        '<span class="tag js-tag" style="float:right">' +
        '{{=it.list[i]}}' +
        '</span>' +
        '{{}}}' +
        '{{}}}' +
        '</div>' +
        '<textarea id="js-evaluateInner" class="js-evaluateInner" placeholder="{{=it.languageText.T0028}}" maxLength="200"></textarea>' +
        '</div>';
    var humanOne_selfHtml = '<div class="layer js-layer">' +
        '<div class="evamodeDialog js-evamodeDialog">' +
        '<div class="close"><span class="close_button js-close_button">��</span><p class="h1">{{=it.languageText.T0022}}</p></div>' +
        '<div class="model-body">' +
        '<div class="evaluate js-evaluate">' +
        '{{if(it.config[0].isQuestionFlag){}}' +
        '<div class="operateType">' +
        '<p class="operateTypeTitle">{{=it.subName}}{{=it.languageText.T0106}}</p>' +
        '<div class="operateTypeBtn">' +
        '<p class="solve solved js-solved"><span></span>{{=it.languageText.T0041}}</p>' +
        '<p class="solve unSolved js-unSolved" style="margin-left:25px;"><span></span>{{=it.languageText.T0042}}</p>' +
        '</div>' +
        '</div>' +
        '{{}}}' +
        '<p class="evaluateTipTitle">{{=it.languageText.T0096}}</p>' +
        '<div id="star">' +
        '<ul>' +
        '<li><a href="javascript:;">1</a></li>' +
        '<li><a href="javascript:;">2</a></li>' +
        '<li><a href="javascript:;">3</a></li>' +
        '<li><a href="javascript:;">4</a></li>' +
        '<li><a href="javascript:;">5</a></li>' +
        '</ul>' +
        '</div>' +
        '<p class="evaluateTip js-evaluateTip"></p>' +
        '</div>' +
        '<a class="submit js-submit" href="#">{{=it.languageText.T0029}}</a>' +
        '</div>' +
        '</div>' +
        '</div>';

    var humanTwo_selfHtml =
        '<div class="evaluateDetail js-evaluateDetail">' +
        '{{if(it.list.length>0){}}' +
        '<p class="h2">{{=it.languageText.T0027}}</p>' +
        '{{}}}' +
        '<div class="situation">' +
        '{{for(var i=0;i<it.list.length;i++){}}' +
        '{{if(i%2==0){}}' +
        '<span class="tag js-tag" style="float:left;">' +
        '{{=it.list[i]}}' +
        '</span>' +
        '{{}else{}}' +
        '<span class="tag js-tag" style="float:right;">' +
        '{{=it.list[i]}}' +
        '</span>' +
        '{{}}}' +
        '{{}}}' +
        '</div>' +
        '<textarea id="js-evaluateInner" class="js-evaluateInner" placeholder="{{=it.conf.inputLanguage||it.languageText.T0028}}{{=it.conf.isInputMust?it.languageText.T0046:it.languageText.T0047}}" maxLength="200"></textarea>' +
        '</div>';
// '</div>';
    var leaveMessageBtn = '<a style="display:block;width:60px;height:60px;" class="js-leaveMsgBtn" data-href="' +
        '{{=it.hostUrl}}' +
        '" href="#0"><i class="leaveMessagebg"></i><p>{{=it.languageText.T0030}}</p></a>';


    var leaveMessageEndBtn = '<span class="span3 js-endLeaveMessage"><a class="js-leaveMsgBtn" data-href="{{=it.hostUrl}}" href="' +
        '#0' +
        '"><i class="icon"></i><p>{{=it.languageText.T0030}}</p></a></span>';


    var waitingUploadImg = '<div class="js-allScreen allScreen"><div class="loadingUploadImg"><i></i><p>{{=it.language.L10036}}</p></div></div>';


    var evamsgHtml = '<div class="js-evamsg evamsg"><p>{{=it.language.L10037}}</p></div>';


    var evamsgHtml2 = '<div class="js-evamsg evamsg" style="color:#cb1f16"><p>{{=it.language.L10038}}</p></div>';


    var layerOpacity0 = '<div class="layer-opacity0"></div>';

    var shadowTemplate = '' +
        '<div class="shadow-layer">' +
        '<div class="shadow-title " style="background-color:#fff;color:#555556;"><div class="js-shadow-title-inner shadow-title-inner">{{=it.title}}</div><div class="close-btn" style="color:#666;">��</div></div>' +
        '<iframe style="position:absolute;top:8%;left:0; border:1px solid white;width:100% !important;height:92%;margin:0;padding:0;" src="{{=it.url}}"></iframe>' +
        '</div>' +
        '';

    template.shadowTemplate = shadowTemplate;
    template.sobotOne_selfHtml = sobotOne_selfHtml;
    template.sobotTwo_selfHtml = sobotTwo_selfHtml;
    template.humanOne_selfHtml = humanOne_selfHtml;
    template.humanTwo_selfHtml = humanTwo_selfHtml;
    template.leaveMessageBtn = leaveMessageBtn;
    template.leaveMessageEndBtn = leaveMessageEndBtn;
    template.evamsgHtml = evamsgHtml;
    template.evamsgHtml2 = evamsgHtml2;
    template.layerOpacity0 = layerOpacity0;
    template.waitingUploadImg = waitingUploadImg;
    module.exports = template;

},{}],59:[function(require,module,exports){
    /**
     *
     * @author daijm
     */
    function uploadImg(global) {
        var language = global.language.lan,
            languageText = global.language.text;
        var listener = require("../../../common/util/listener.js");
        //ģ������
        var template = require('./template.js');
        var currentUid = "",
            sysNum = "";
        var ua = navigator.userAgent.toLowerCase();
        /*
         //ģ������
         var template = require('./template.js');*/
        //���������url
        var parseDOM = function() {};
        var onFormDataUpHandler = function() {
            var oData = new FormData();
            var input = $(".js-upload")[0];
            //��������ͷ
            var file = input.files[0];
            //�ж��ϴ��ļ��Ƿ�ΪͼƬ,΢�ź�qq�������ȡ����ͼƬ��ʽ
            if ((/^(image)/.test(file.type)||(file.type==""&&(ua.match(/MicroMessenger/i) == "micromessenger")||(ua.match(/QQ/i) == "qq")))&&file.type!="image/tiff") {
                swatting();
                //չʾͼƬ֮ǰ�����ؼӺ�
                listener.trigger("sendArea.closeAddarea");
                //��������ͼƬ������
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function(e) {
                    var tp = +new Date();
                    var token = currentUid + tp;
                    var fileRead = e.target.result;
                    //alert(fileRead);
                    //չʾ����ͼ
                    /*listener.trigger("sendArea.createUploadImg",[{
                     'result' : fileRead,
                     'date':tp,
                     'token':token
                     }]);*/
                    //�ȴ��ӺŹرգ��ٶ�λ
                    setTimeout(function() {
                        listener.trigger('sendArea.autoSize', $(".js-chatArea"));
                        listener.trigger('sendArea.specialModels');
                    }, 700)
                    setTimeout(function() {
                        oData.append("sysNum", sysNum);
                        //��ȡ��չ���������gif�Ͳ�����ѹ��
                        var etc = fileRead.substring(fileRead.indexOf("data:image/") + 11, fileRead.indexOf(";base64"));
                        //console.log(etc);
                        if (etc == "gif") {
                            $(".js-allScreen").remove();
                            listener.trigger("sendArea.createUploadImg", [{
                                'result': fileRead,
                                'date': tp,
                                'token': token
                            }])
                            oData.append("base64", fileRead);
                            //�ϴ�
                            onAjaxUploadUpHandler(oData, tp, token)
                        } else {
                            //this.result ����ͼƬ��������
                            lrz(file, {
                                quality: 0.9 //0.7 ��4.82Mʣ��123k
                            }).then(function(results) {
                                listener.trigger("sendArea.createUploadImg", [{
                                    'result': results.base64,
                                    'date': tp,
                                    'token': token
                                }])
                                $(".js-allScreen").remove();
                                // size��λΪ�ֽ� 5M = 5242880
                                if (results.base64Len >= 5242880) {
                                    //ͼƬ����
                                    //alert("ͼƬ����5M");
                                    var imageLarge = { type: 'system', status: 'imageLarge', data: { content: language['L10034'] } }
                                    listener.trigger('sendArea.sendAreaSystemMsg', imageLarge);
                                    return;
                                }
                                oData.append("base64", results.base64);
                                //alert(results.base64);
                                //�ϴ�
                                onAjaxUploadUpHandler(oData, tp, token)
                            }).catch(function(err) {
                                console.log(err);
                                console.log('ͼƬѹ��ʧ��')
                            }).always(function() {
                                //console.log('�����ǳɹ�ʧ�ܣ�����ִ��')
                            });
                        }
                    }, 1500)
                }

            } else {
                //alert("���ϴ���ȷ��ͼƬ��ʽ");
                var imageError = { type: 'system', status: 'imageError', data: { content: language['L10033'] } }
                listener.trigger('sendArea.sendAreaSystemMsg', imageError);
            }
            //����ı���
            $(".js-upload").val("");

        }
        var onAjaxUploadUpHandler = function(oData, tp, token) {
            //listener.trigger('sendArea.autoSize',$(".js-chatArea"));
            var oXHR = new XMLHttpRequest();
            oXHR.upload.addEventListener('progress',
                function(e) {
                    if (e.lengthComputable) {
                        var iPercentComplete = Math.round(e.loaded * 100 / e.total);
                        var percentage = iPercentComplete.toString();
                        //console.log(percentage);
                        listener.trigger('sendArea.uploadImgProcess', { "percentage": percentage, "token": token }); //
                    } else {
                        //document.getElementById('progress').innerHTML = '�޷�����';
                    }
                }, false);
            oXHR.open('POST', '/chat/webchat/fileuploadBase64.action');
            //console.log("����base64�ϴ�");
            //��ֹ�ϴ�
            listener.on('leftMsg.closeUploadImg', function() {
                oXHR.abort();
            })
            oXHR.send(oData);
            oXHR.onreadystatechange = function(req) {
                if (req.target.readyState == 4) {
                    if (req.target.status == 200) {
                        // console.log('base64�ϴ��ɹ�');
                        var url = JSON.parse(req.target.response).url;
                        var img = url /*'<img class="webchat_img_upload uploadedFile" src="'+url+'">'*/ ;
                        listener.trigger('sendArea.uploadImgUrl', [{
                            'answer': img,
                            'date': tp,
                            'token': token
                        }]);
                    } else {
                        //alert("error");
                    }
                }
            }

        };
        //���·���
        var imgUploadAgain = function(data) {
            var oData = new FormData();
            var oXHR = new XMLHttpRequest();
            var tp = +new Date();
            oXHR.upload.addEventListener('progress',
                function(e) {
                    if (e.lengthComputable) {
                        var iPercentComplete = Math.round(e.loaded * 100 / e.total);
                        var percentage = iPercentComplete.toString();
                        //console.log(percentage);
                        listener.trigger('sendArea.uploadImgProcess', { "percentage": percentage, "token": data.token }); //
                    } else {
                        //document.getElementById('progress').innerHTML = '�޷�����';
                    }
                }, false);
            oXHR.open('POST', '/chat/webchat/fileuploadBase64.action');
            //��ֹ�ϴ�
            listener.on('leftMsg.closeUploadImg', function() {
                oXHR.abort();
            });
            oData.append("sysNum", sysNum);
            oData.append("base64", data.base64);
            oXHR.send(oData);
            oXHR.onreadystatechange = function(req) {
                if (req.target.readyState == 4) {
                    if (req.target.status == 200) {
                        var url = JSON.parse(req.target.response).url;
                        var img = url /*'<img class="webchat_img_upload uploadedFile" src="'+url+'">'*/ ;
                        listener.trigger('sendArea.uploadImgUrl', [{
                            'answer': img,
                            'date': tp,
                            'token': data.token
                        }]);
                    } else {
                        //alert("error");
                    }
                }
            }

        }
        var swatting = function() {

            var conf = {
                'languageText': languageText,
                'language': language
            };
            var _html = doT.template(template.waitingUploadImg)(conf);
            $(document.body).append(_html);
            $('.loadingUploadImg').css("top", (($(document).height() - $('.loadingUploadImg').height()) / 2) + "px");
            $('.loadingUploadImg').css("left", (($(document).width() - $('.loadingUploadImg').width()) / 2) + "px");
        }
        var bindLitener = function() {
            var browserType = navigator.userAgent.toLowerCase();
            //console.log(browserType);
            //mozilla/5.0 (linux; u; android 4.4.4; zh-cn; htc d820mu build/ktu84p) applewebkit/534.30 (khtml, like gecko) version/4.0 mobile safari/534.30
            if (browserType.indexOf("htc") != -1 && browserType.indexOf("safari/534.30") != -1) {
                $(".js-upload").remove();
                $(".js-uploadImg").on("click", function() {
                    var imageLarge = { type: 'system', status: 'imageLarge', data: { content: language['L10035'] } }
                    listener.trigger('sendArea.sendAreaSystemMsg', imageLarge);
                });

            }

            $(".js-upload").on("change", onFormDataUpHandler);
            listener.on('listMsg.imgUploadAgain', imgUploadAgain)

        };

        var initPlugsin = function() { //���
        };
        var initConfig = function(data) {
            currentUid = data.uid;
            sysNum = data.sysNum;
        };
        var init = function() {
            parseDOM();
            bindLitener();
            initPlugsin();
            listener.on('sendArea.sendInitConfig', initConfig)

        };
        init();

    }

    module.exports = uploadImg;

},{"../../../common/util/listener.js":29,"./template.js":58}],60:[function(require,module,exports){
    /**
     * @author daijm
     */

    function Alert(spec) {
        var Dialog = require('./dialog');
        var _self = this;
        var conf = $.extend({
            'text' : 'TEXT',
            'info' : '',
            "OK" : function(dialog) {
            }
        },spec);
        Dialog.call(this,conf);
        var initAlert = function() {
            var template = require('./template.js');
            var _html = doT.template(template.AlertTemplate)(conf);
            _self.setInner(_html);
        };

        initAlert();
    };

    module.exports = Alert;

},{"./dialog":61,"./template.js":68}],61:[function(require,module,exports){
    /**
     * @author daijm
     */
    function Dialog(spec) {
        var template = require('./template.js');
        var $layer="",
            $AlertTemplate_html="";
        var _self = this;
        //�����������浯����λ�û῿��
        var _h=0;
        var conf = $.extend({
            "okText" : "ȷ��",
            "title" : "��ʾ",
            'inner' : false,
            "OK" : function() {

            }
        },spec);
        var initDOM = function() {
            $layer = $(template.layer);
            $AlertTemplate_html = doT.template(template.AlertTemplate)(conf);
        };
        var setInner = function(elm) {
            $(".model-body").html(elm);
            position();
        };
        var hide = function(e) {
            //�Ҳ�Ҫ�����ݷֿ�����������������ݲ����浯�𣬵����ı���������ס
            $layer.animate({
                'opacity' : 0
            },300, function() {
                setTimeout(function() {
                    $layer.remove();
                },100);
            });
            $(".js-modeDialog").animate({
                'opacity' : 0
            },300, function() {
                setTimeout(function() {
                    $(".js-modeDialog").remove();
                },100);
            });

        };
        //���ɶ�ѡ
        var toggleActive=function(){
            $(this).addClass("active").siblings().removeClass("active")
        };
        var bindListener = function() {
            //$layer.on("click",hide);
            /*$layer.on("click",function(e) {
             e.stopPropagation();
             });*/
            $(".js-modeDialog").delegate(".close_button",'click',hide);
            $(".wether span").on("click",toggleActive);
        };
        var position =function(){
            //  var phoneFlag = navigator.userAgent.toLowerCase().indexOf("iphone");
            // // console.log(phoneFlag);
            //  if(phoneFlag){
            //      _h=30;
            //  }
            //  //����
            //  var left,top;
            //  left=($(window).width()-($(window).width()*0.84))/2+"px";
            //  top=($(window).height()-$(".js-modeDialog").height())/2-_h+"px";
            //  $(".js-modeDialog").css({"left":left,"top":top});
            //  //$(".js-modeDialog").css("top",top);
        };
        var show = function() {
            //�Ҳ�Ҫ�����ݷֿ�����������������ݲ����浯�𣬵����ı���������ס
            $(document.body).append($layer);
            $(document.body).append($AlertTemplate_html);
            bindListener();
            position();
        };
        var init = function() {
            initDOM();
        };
        init();

        //this.getOuter = getOuter;
        this.setInner = setInner;
        this.show = show;
        this.hide = hide;
    }

    module.exports = Dialog;

},{"./template.js":68}],62:[function(require,module,exports){
    var that = {};
    that.qqfaceReg =/\/::\)|\/::~|\/::B|\/::\||\/:8-\)|\/::<|\/::\$|\/::X|\/::Z|\/::'\(|\/::-\||\/::@|\/::P|\/::D|\/::O|\/::\(|\/::\+|\/:�Cb|\/::Q|\/::T|\/:,@P|\/:,@-D|\/::d|\/:,@o|\/::g|\/:\|-\)|\/::!|\/::L|\/::>|\/::,@|\/:,@f|\/::-S|\/:\?|\/:,@x|\/:,@@|\/::8|\/:,@!|\/:!!!|\/:xx|\/:bye|\/:wipe|\/:dig|\/:handclap|\/:&-\(|\/:B-\)|\/:<@|\/:@>|\/::-O|\/:>-\||\/:P-\(|\/::'\||\/:X-\)|\/::\*|\/:@x|\/:8\*|\/:pd|\/:<W>|\/:beer|\/:basketb|\/:oo|\/:coffee|\/:eat|\/:pig|\/:rose|\/:fade|\/:showlove|\/:heart|\/:break|\/:cake|\/:li|\/:bome|\/:kn|\/:footb|\/:ladybug|\/:shit|\/:moon|\/:sun|\/:gift|\/:hug|\/:strong|\/:weak|\/:share|\/:v|\/:@\)|\/:jj|\/:@@|\/:bad|\/:lvu|\/:no|\/:ok|\/:love|\/:<L>|\/:jump|\/:shake|\/:<O>|\/:circle|\/:kotow|\/:turn|\/:skip|\/:oY|\/:#-0|\/:hiphot|\/:kiss|\/:<&|\/:&>|\/΢Ц|\/Ʋ��|\/ɫ|\/����|\/����|\/����|\/����|\/����|\/˯|\/���|\/����|\/��ŭ|\/��Ƥ|\/����|\/����|\/�ѹ�|\/��|\/�亹|\/˥|\/����|\/�ô�|\/�ټ�|\/����|\/�ٱ�|\/����|\/�ܴ���|\/��Ц|\/��ߺ�|\/�Һߺ�|\/��Ƿ|\/����|\/ί��|\/�����|\/����|\/����|\/��|\/����|\/ץ��|\/��|\/͵Ц|\/���|\/����|\/����|\/����|\/��|\/����|\/����|\/��Ц|\/����|\/�ܶ�|\/����|\/����|\/��|\/��|\/����|\/����|\/ƹ��|\/����|\/��|\/��ͷ|\/õ��|\/��л|\/�촽|\/����|\/����|\/����|\/����|\/ը��|\/��|\/����|\/ư��|\/���|\/����|\/̫��|\/����|\/ӵ��|\/�˵�|\/����|\/ơ��|\/��|\/����|\/ʤ��|\/��ȭ|\/����|\/ȭͷ|\/�|\/����|\/NO|\/OK|\/����|\/����|\/����|\/ǿ|\/����|\/���|\/תȦ|\/��ͷ|\/��ͷ|\/����|\/Ͷ��|\/����|\/����|\/����|\/��̫��|\/��̫��|\[΢Ц\]|\[Ʋ��\]|\[ɫ\]|\[����\]|\[����\]|\[����\]|\[����\]|\[����\]|\[˯\]|\[���\]|\[����\]|\[��ŭ\]|\[��Ƥ\]|\[����\]|\[����\]|\[�ѹ�\]|\[��\]|\[�亹\]|\[˥\]|\[����\]|\[�ô�\]|\[�ټ�\]|\[����\]|\[�ٱ�\]|\[����\]|\[�ܴ���\]|\[��Ц\]|\[��ߺ�\]|\[�Һߺ�\]|\[��Ƿ\]|\[����\]|\[ί��\]|\[�����\]|\[����\]|\[����\]|\[��\]|\[����\]|\[ץ��\]|\[��\]|\[͵Ц\]|\[���\]|\[����\]|\[����\]|\[����\]|\[��\]|\[����\]|\[����\]|\[��Ц\]|\[����\]|\[�ܶ�\]|\[����\]|\[����\]|\[��\]|\[��\]|\[����\]|\[����\]|\[ƹ��\]|\[����\]|\[��\]|\[��ͷ\]|\[õ��\]|\[��л\]|\[�촽\]|\[����\]|\[����\]|\[����\]|\[����\]|\[ը��\]|\[��\]|\[����\]|\[ư��\]|\[���\]|\[����\]|\[̫��\]|\[����\]|\[ӵ��\]|\[�˵�\]|\[����\]|\[ơ��\]|\[��\]|\[����\]|\[ʤ��\]|\[��ȭ\]|\[����\]|\[ȭͷ\]|\[�\]|\[����\]|\[NO\]|\[OK\]|\[����\]|\[����\]|\[����\]|\[ǿ\]|\[����\]|\[���\]|\[תȦ\]|\[��ͷ\]|\[��ͷ\]|\[����\]|\[Ͷ��\]|\[����\]|\[����\]|\[����\]|\[��̫��\]|\[��̫��\]/g;

    that.qqfaceReg2 =/\/::\)|\/::~|\/::B|\/::\||\/:8-\)|\/::<|\/::\$|\/::X|\/::Z|\/::'\(|\/::-\||\/::@|\/::P|\/::D|\/::O|\/::\(|\/::\+|\/:�Cb|\/::Q|\/::T|\/:,@P|\/:,@-D|\/::d|\/:,@o|\/::g|\/:\|-\)|\/::!|\/::L|\/::>|\/::,@|\/:,@f|\/::-S|\/:\?|\/:,@x|\/:,@@|\/::8|\/:,@!|\/:!!!|\/:xx|\/:bye|\/:wipe|\/:dig|\/:handclap|\/:&-\(|\/:B-\)|\/:<@|\/:@>|\/::-O|\/:>-\||\/:P-\(|\/::'\||\/:X-\)|\/::\*|\/:@x|\/:8\*|\/:pd|\/:<W>|\/:beer|\/:basketb|\/:oo|\/:coffee|\/:eat|\/:pig|\/:rose|\/:fade|\/:showlove|\/:heart|\/:break|\/:cake|\/:li|\/:bome|\/:kn|\/:footb|\/:ladybug|\/:shit|\/:moon|\/:sun|\/:gift|\/:hug|\/:strong|\/:weak|\/:share|\/:v|\/:@\)|\/:jj|\/:@@|\/:bad|\/:lvu|\/:no|\/:ok|\/:love|\/:<L>|\/:jump|\/:shake|\/:<O>|\/:circle|\/:kotow|\/:turn|\/:skip|\/:oY|\/:#-0|\/:hiphot|\/:kiss|\/:<&|\/:&>|\/΢Ц|\/Ʋ��|\/ɫ|\/����|\/����|\/����|\/����|\/����|\/˯|\/���|\/����|\/��ŭ|\/��Ƥ|\/����|\/����|\/�ѹ�|\/��|\/�亹|\/˥|\/����|\/�ô�|\/�ټ�|\/����|\/�ٱ�|\/����|\/�ܴ���|\/��Ц|\/��ߺ�|\/�Һߺ�|\/��Ƿ|\/����|\/ί��|\/�����|\/����|\/����|\/��|\/����|\/ץ��|\/��|\/͵Ц|\/���|\/����|\/����|\/����|\/��|\/����|\/����|\/��Ц|\/����|\/�ܶ�|\/����|\/����|\/��|\/��|\/����|\/����|\/ƹ��|\/����|\/��|\/��ͷ|\/õ��|\/��л|\/�촽|\/����|\/����|\/����|\/����|\/ը��|\/��|\/����|\/ư��|\/���|\/����|\/̫��|\/����|\/ӵ��|\/�˵�|\/����|\/ơ��|\/��|\/����|\/ʤ��|\/��ȭ|\/����|\/ȭͷ|\/�|\/����|\/NO|\/OK|\/����|\/����|\/����|\/ǿ|\/����|\/���|\/תȦ|\/��ͷ|\/��ͷ|\/����|\/Ͷ��|\/����|\/����|\/����|\/��̫��|\/��̫��|\[΢Ц\]|\[Ʋ��\]|\[ɫ\]|\[����\]|\[����\]|\[����\]|\[����\]|\[����\]|\[˯\]|\[���\]|\[����\]|\[��ŭ\]|\[��Ƥ\]|\[����\]|\[����\]|\[�ѹ�\]|\[��\]|\[�亹\]|\[˥\]|\[����\]|\[�ô�\]|\[�ټ�\]|\[����\]|\[�ٱ�\]|\[����\]|\[�ܴ���\]|\[��Ц\]|\[��ߺ�\]|\[�Һߺ�\]|\[��Ƿ\]|\[����\]|\[ί��\]|\[�����\]|\[����\]|\[����\]|\[��\]|\[����\]|\[ץ��\]|\[��\]|\[͵Ц\]|\[���\]|\[����\]|\[����\]|\[����\]|\[��\]|\[����\]|\[����\]|\[��Ц\]|\[����\]|\[�ܶ�\]|\[����\]|\[����\]|\[��\]|\[��\]|\[����\]|\[����\]|\[ƹ��\]|\[����\]|\[��\]|\[��ͷ\]|\[õ��\]|\[��л\]|\[�촽\]|\[����\]|\[����\]|\[����\]|\[����\]|\[ը��\]|\[��\]|\[����\]|\[ư��\]|\[���\]|\[����\]|\[̫��\]|\[����\]|\[ӵ��\]|\[�˵�\]|\[����\]|\[ơ��\]|\[��\]|\[����\]|\[ʤ��\]|\[��ȭ\]|\[����\]|\[ȭͷ\]|\[�\]|\[����\]|\[NO\]|\[OK\]|\[����\]|\[����\]|\[����\]|\[ǿ\]|\[����\]|\[���\]|\[תȦ\]|\[��ͷ\]|\[��ͷ\]|\[����\]|\[Ͷ��\]|\[����\]|\[����\]|\[����\]|\[��̫��\]|\[��̫��\]/
    /*that.qqfaceReg =/\/::\)|\/::~|\/::B|\/::\||\/:8-\)|\/::<|\/::\$|\/::X|\/::Z|\/::'\(|\/::-\||\/::@|\/::P|\/::D|\/::O|\/::\(|\/::\+|\/:�Cb|\/::Q|\/::T|\/:,@P|\/:,@-D|\/::d|\/:,@o|\/::g|\/:\|-\)|\/::!|\/΢Ц|\/Ʋ��|\/ɫ|\/����|\/����|\/����|\/����|\/����|\/˯|\/���|\/����|\/��ŭ|\/��Ƥ|\/����|\/����|\/�ѹ�|\/��|\/�亹|\/ץ��|\/��|\/͵Ц|\/���|\/����|\/����|\/����|\/��|\/����|\[΢Ц\]|\[Ʋ��\]|\[ɫ\]|\[����\]|\[����\]|\[����\]|\[����\]|\[����\]|\[˯\]|\[���\]|\[����\]|\[��ŭ\]|\[��Ƥ\]|\[����\]|\[����\]|\[�ѹ�\]|\[��\]|\[�亹\]|\[ץ��\]|\[��\]|\[͵Ц\]|\[���\]|\[����\]|\[����\]|\[����\]|\[��\]|\[����\]/g;
     that.qqfaceReg2 =/\/::\)|\/::~|\/::B|\/::\||\/:8-\)|\/::<|\/::\$|\/::X|\/::Z|\/::'\(|\/::-\||\/::@|\/::P|\/::D|\/::O|\/::\(|\/::\+|\/:�Cb|\/::Q|\/::T|\/:,@P|\/:,@-D|\/::d|\/:,@o|\/::g|\/:\|-\)|\/::!|\/΢Ц|\/Ʋ��|\/ɫ|\/����|\/����|\/����|\/����|\/����|\/˯|\/���|\/����|\/��ŭ|\/��Ƥ|\/����|\/����|\/�ѹ�|\/��|\/�亹|\/ץ��|\/��|\/͵Ц|\/���|\/����|\/����|\/����|\/��|\/����|\[΢Ц\]|\[Ʋ��\]|\[ɫ\]|\[����\]|\[����\]|\[����\]|\[����\]|\[����\]|\[˯\]|\[���\]|\[����\]|\[��ŭ\]|\[��Ƥ\]|\[����\]|\[����\]|\[�ѹ�\]|\[��\]|\[�亹\]|\[ץ��\]|\[��\]|\[͵Ц\]|\[���\]|\[����\]|\[����\]|\[����\]|\[��\]|\[����\]/; */
    module.exports = that;
},{}],63:[function(require,module,exports){
    module.exports=/*{
     "[΢Ц]": "weixiao",
     "[Ʋ��]": "piezui",
     "[ɫ]": "se",
     "[����]": "fadai",
     "[����]": "deyi",
     "[����]": "liulei",
     "[����]": "haixiu",
     "[����]": "bizui",
     "[˯]": "shui",
     "[���]": "daku",
     "[����]": "ganga",
     "[��ŭ]": "fanu",
     "[��Ƥ]": "tiaopi",
     "[����]": "ciya",
     "[����]": "jingya",
     "[�ѹ�]": "nanguo",
     "[��]": "ku",
     "[�亹]": "lenghan",
     "[˥]": "shuai",
     "[����]": "kulou",
     "[�ô�]": "qiaoda",
     "[�ټ�]": "zaijian",
     "[����]": "cahan",
     "[�ٱ�]": "koubi",
     "[����]": "guzhang",
     "[�ܴ���]": "qiudal",
     "[��Ц]": "huaixiao",
     "[��ߺ�]": "zuohengheng",
     "[�Һߺ�]": "youhengheng",
     "[��Ƿ]": "haqian",
     "[����]": "bishi",
     "[ί��]": "weiqu",
     "[�����]": "kuaikul",
     "[����]": "yinxian",
     "[����]": "qinqin",
     "[��]": "xia",
     "[����]": "kelian",
     "[ץ��]": "zhuakuang",
     "[��]": "tu",
     "[͵Ц]": "touxiao",
     "[���]": "yukuai",
     "[����]": "baiyan",
     "[����]": "aoman",
     "[����]": "jie",
     "[��]": "kun",
     "[����]": "jingkong",
     "[����]": "liuhan",
     "[��Ц]": "hanxiao",
     "[����]": "youxian",
     "[�ܶ�]": "fendou",
     "[����]": "zhouma",
     "[����]": "yiwen",
     "[��]": "xu",
     "[��]": "yun",
     "[����]": "fengl",
     "[����]": "lanqiu",
     "[ƹ��]": "pingpang",
     "[����]": "kafei",
     "[��]": "fan",
     "[��ͷ]": "zhutou",
     "[õ��]": "meigui",
     "[��л]": "diaoxie",
     "[�촽]": "zuichun",
     "[����]": "aixin",
     "[����]": "xinsui",
     "[����]": "dangao",
     "[����]": "shandian",
     "[ը��]": "zhadan",
     "[��]": "dao",
     "[����]": "zuqiu",
     "[ư��]": "piaochong",
     "[���]": "bianbian",
     "[����]": "yueliang",
     "[̫��]": "taiyang",
     "[����]": "liwu",
     "[ӵ��]": "yongbao",
     "[�˵�]": "caidao",
     "[����]": "xigua",
     "[ơ��]": "pijiu",
     "[��]": "ruo",
     "[����]": "woshou",
     "[ʤ��]": "shengli",
     "[��ȭ]": "baoquan",
     "[����]": "gouyin",
     "[ȭͷ]": "quantou",
     "[�]": "chajin",
     "[����]": "aini",
     "[NO]": "no_1",
     "[OK]": "ok_1",
     "[����]": "aiqing",
     "[����]": "feiwen",
     "[����]": "tiaotiao",
     "[ǿ]": "qiang",
     "[����]": "fadou",
     "[���]": "ouhuo",
     "[תȦ]": "zhuanquan",
     "[��ͷ]": "ketou",
     "[��ͷ]": "huitou",
     "[����]": "tiaosheng",
     "[Ͷ��]": "touxiang",
     "[����]": "jidong",
     "[����]": "luanwu",
     "[����]": "xianwen",
     "[��̫��]": "zuotaiji",
     "[��̫��]": "youtaiji"
     }*/
        {
            "[΢Ц]": "weixiao",
            "[Ʋ��]": "piezui",
            "[ɫ]": "se",
            "[����]": "fadai",
            "[����]": "deyi",
            "[����]": "liulei",
            "[����]": "haixiu",
            "[����]": "bizui",
            "[˯]": "shui",
            "[���]": "daku",
            "[����]": "ganga",
            "[��ŭ]": "fanu",
            "[��Ƥ]": "tiaopi",
            "[����]": "ciya",
            "[����]": "jingya",
            "[�ѹ�]": "nanguo",
            "[��]": "ku",
            "[�亹]": "lenghan",
            "[ץ��]": "zhuakuang",
            "[��]": "tu",
            "[͵Ц]": "touxiao",
            "[���]": "yukuai",
            "[����]": "baiyan",
            "[����]": "aoman",
            "[����]": "jie",
            "[��]": "kun",
            "[����]": "jingkong"
        }
},{}],64:[function(require,module,exports){
    module.exports={
        "/::)": "weixiao",
        "/::~": "piezui",
        "/::B": "se",
        "/::|": "fadai",
        "/:8-)": "deyi",
        "/::<": "liulei",
        "/::$": "haixiu",
        "/::X": "bizui",
        "/::Z": "shui",
        "/::'(": "daku",
        "/::-|": "ganga",
        "/::@": "fanu",
        "/::P": "tiaopi",
        "/::D": "ciya",
        "/::O": "jingya",
        "/::(": "nanguo",
        "/::+": "ku",
        "/:�Cb": "lenghan",
        "/:,@!": "shuai",
        "/:!!!": "kulou",
        "/::Q": "zhuakuang",
        "/::T": "tu",
        "/:,@P": "touxiao",
        "/:,@-D": "yukuai",
        "/::d": "baiyan",
        "/:,@o": "aoman",
        "/::g": "jie",
        "/:|-)": "kun",
        "/::!": "jingkong",
        "/::L": "liuhan",
        "/::>": "hanxiao",
        "/::,@": "youxian",
        "/:,@f": "fendou",
        "/::-S": "zhouma",
        "/:?": "yiwen",
        "/:,@x": "xu",
        "/:,@@": "yun",
        "/::8": "fengl",
        "/:xx": "qiaoda",
        "/:bye": "zaijian",
        "/:wipe": "cahan",
        "/:dig": "koubi",
        "/:handclap": "guzhang",
        "/:&-(": "qiudal",
        "/:B-)": "huaixiao",
        "/:<@": "zuohengheng",
        "/:@>": "youhengheng",
        "/::-O": "haqian",
        "/:>-|": "bishi",
        "/:P-(": "weiqu",
        "/:X-)": "yinxian",
        "/::'|": "kuaikul",
        "/::*": "qinqin",
        "/:@x": "xia",
        "/:8*": "kelian",
        "/:pd": "caidao",
        "/:<W>": "xigua",
        "/:beer": "pijiu",
        "/:basketb": "lanqiu",
        "/:oo": "pingpang",
        "/:coffee": "kafei",
        "/:eat": "fan",
        "/:pig": "zhutou",
        "/:rose": "meigui",
        "/:fade": "diaoxie",
        "/:showlove": "zuichun",
        "/:heart": "aixin",
        "/:break": "xinsui",
        "/:cake": "dangao",
        "/:li": "shandian",
        "/:bome": "zhadan",
        "/:kn": "dao",
        "/:footb": "zuqiu",
        "/:ladybug": "piaochong",
        "/:shit": "bianbian",
        "/:moon": "yueliang",
        "/:sun": "taiyang",
        "/:gift": "liwu",
        "/:hug": "yongbao",
        "/:strong": "qiang",
        "/:weak": "ruo",
        "/:share": "woshou",
        "/:v": "shengli",
        "/:@)": "baoquan",
        "/:jj": "gouyin",
        "/:@@": "quantou",
        "/:bad": "chajin",
        "/:lvu": "aini",
        "/:no": "no_1",
        "/:ok": "ok_1",
        "/:love":"aiqing",
        "/:<L>": "feiwen",
        "/:jump": "tiaotiao",
        "/:shake": "fadou",
        "/:<O>": "ouhuo",
        "/:circle": "zhuanquan",
        "/:kotow": "ketou",
        "/:turn": "huitou",
        "/:skip": "tiaosheng",
        "/:oY": "touxiang",
        "/:#-0": "jidong",
        "/:hiphot": "luanwu",
        "/:kiss": "xianwen",
        "/:<&": "zuotaiji",
        "/:&>": "youtaiji",
        "/΢Ц": "weixiao",
        "/Ʋ��": "piezui",
        "/ɫ": "se",
        "/����": "fadai",
        "/����": "deyi",
        "/����": "liulei",
        "/����": "haixiu",
        "/����": "bizui",
        "/˯": "shui",
        "/���": "daku",
        "/����": "ganga",
        "/��ŭ": "fanu",
        "/��Ƥ": "tiaopi",
        "/����": "ciya",
        "/����": "jingya",
        "/�ѹ�": "nanguo",
        "/��": "ku",
        "/�亹": "lenghan",
        "/˥": "shuai",
        "/����": "kulou",
        "/�ô�": "qiaoda",
        "/�ټ�": "zaijian",
        "/����": "cahan",
        "/�ٱ�": "koubi",
        "/����": "guzhang",
        "/�ܴ���": "qiudal",
        "/��Ц": "huaixiao",
        "/��ߺ�": "zuohengheng",
        "/�Һߺ�": "youhengheng",
        "/��Ƿ": "haqian",
        "/����": "bishi",
        "/ί��": "weiqu",
        "/�����": "kuaikul",
        "/����": "yinxian",
        "/����": "qinqin",
        "/��": "xia",
        "/����": "kelian",
        "/ץ��": "zhuakuang",
        "/��": "tu",
        "/͵Ц": "touxiao",
        "/���": "yukuai",
        "/����": "baiyan",
        "/����": "aoman",
        "/����": "jie",
        "/��": "kun",
        "/����": "jingkong",
        "/����": "liuhan",
        "/��Ц": "hanxiao",
        "/����": "youxian",
        "/�ܶ�": "fendou",
        "/����": "zhouma",
        "/����": "yiwen",
        "/��": "xu",
        "/��": "yun",
        "/����": "fengl",
        "/����": "lanqiu",
        "/ƹ��": "pingpang",
        "/����": "kafei",
        "/��": "fan",
        "/��ͷ": "zhutou",
        "/õ��": "meigui",
        "/��л": "diaoxie",
        "/�촽": "zuichun",
        "/����": "aixin",
        "/����": "xinsui",
        "/����": "dangao",
        "/����": "shandian",
        "/ը��": "zhadan",
        "/��": "dao",
        "/����": "zuqiu",
        "/ư��": "piaochong",
        "/���": "bianbian",
        "/����": "yueliang",
        "/̫��": "taiyang",
        "/����": "liwu",
        "/ӵ��": "yongbao",
        "/�˵�": "caidao",
        "/����": "xigua",
        "/ơ��": "pijiu",
        "/��": "ruo",
        "/����": "woshou",
        "/ʤ��": "shengli",
        "/��ȭ": "baoquan",
        "/����": "gouyin",
        "/ȭͷ": "quantou",
        "/�": "chajin",
        "/����": "aini",
        "/NO": "no_1",
        "/OK": "ok_1",
        "/����": "aiqing",
        "/����": "feiwen",
        "/����": "tiaotiao",
        "/ǿ": "qiang",
        "/����": "fadou",
        "/���": "ouhuo",
        "/תȦ": "zhuanquan",
        "/��ͷ": "ketou",
        "/��ͷ": "huitou",
        "/����": "tiaosheng",
        "/Ͷ��": "touxiang",
        "/����": "jidong",
        "/����": "luanwu",
        "/����": "xianwen",
        "/��̫��": "zuotaiji",
        "/��̫��": "youtaiji",
        "[΢Ц]": "weixiao",
        "[Ʋ��]": "piezui",
        "[ɫ]": "se",
        "[����]": "fadai",
        "[����]": "deyi",
        "[����]": "liulei",
        "[����]": "haixiu",
        "[����]": "bizui",
        "[˯]": "shui",
        "[���]": "daku",
        "[����]": "ganga",
        "[��ŭ]": "fanu",
        "[��Ƥ]": "tiaopi",
        "[����]": "ciya",
        "[����]": "jingya",
        "[�ѹ�]": "nanguo",
        "[��]": "ku",
        "[�亹]": "lenghan",
        "[˥]": "shuai",
        "[����]": "kulou",
        "[�ô�]": "qiaoda",
        "[�ټ�]": "zaijian",
        "[����]": "cahan",
        "[�ٱ�]": "koubi",
        "[����]": "guzhang",
        "[�ܴ���]": "qiudal",
        "[��Ц]": "huaixiao",
        "[��ߺ�]": "zuohengheng",
        "[�Һߺ�]": "youhengheng",
        "[��Ƿ]": "haqian",
        "[����]": "bishi",
        "[ί��]": "weiqu",
        "[�����]": "kuaikul",
        "[����]": "yinxian",
        "[����]": "qinqin",
        "[��]": "xia",
        "[����]": "kelian",
        "[ץ��]": "zhuakuang",
        "[��]": "tu",
        "[͵Ц]": "touxiao",
        "[���]": "yukuai",
        "[����]": "baiyan",
        "[����]": "aoman",
        "[����]": "jie",
        "[��]": "kun",
        "[����]": "jingkong",
        "[����]": "liuhan",
        "[��Ц]": "hanxiao",
        "[����]": "youxian",
        "[�ܶ�]": "fendou",
        "[����]": "zhouma",
        "[����]": "yiwen",
        "[��]": "xu",
        "[��]": "yun",
        "[����]": "fengl",
        "[����]": "lanqiu",
        "[ƹ��]": "pingpang",
        "[����]": "kafei",
        "[��]": "fan",
        "[��ͷ]": "zhutou",
        "[õ��]": "meigui",
        "[��л]": "diaoxie",
        "[�촽]": "zuichun",
        "[����]": "aixin",
        "[����]": "xinsui",
        "[����]": "dangao",
        "[����]": "shandian",
        "[ը��]": "zhadan",
        "[��]": "dao",
        "[����]": "zuqiu",
        "[ư��]": "piaochong",
        "[���]": "bianbian",
        "[����]": "yueliang",
        "[̫��]": "taiyang",
        "[����]": "liwu",
        "[ӵ��]": "yongbao",
        "[�˵�]": "caidao",
        "[����]": "xigua",
        "[ơ��]": "pijiu",
        "[��]": "ruo",
        "[����]": "woshou",
        "[ʤ��]": "shengli",
        "[��ȭ]": "baoquan",
        "[����]": "gouyin",
        "[ȭͷ]": "quantou",
        "[�]": "chajin",
        "[����]": "aini",
        "[NO]": "no_1",
        "[OK]": "ok_1",
        "[����]": "aiqing",
        "[����]": "feiwen",
        "[����]": "tiaotiao",
        "[ǿ]": "qiang",
        "[����]": "fadou",
        "[���]": "ouhuo",
        "[תȦ]": "zhuanquan",
        "[��ͷ]": "ketou",
        "[��ͷ]": "huitou",
        "[����]": "tiaosheng",
        "[Ͷ��]": "touxiang",
        "[����]": "jidong",
        "[����]": "luanwu",
        "[����]": "xianwen",
        "[��̫��]": "zuotaiji",
        "[��̫��]": "youtaiji"
    }
    /*{
     "/::)": "1",
     "/::~": "2",
     "/::B": "3",
     "/::|": "4",
     "/:8-)": "5",
     "/::<": "6",
     "/::$": "7",
     "/::X": "8",
     "/::Z": "9",
     "/::'(": "10",
     "/::-|": "11",
     "/::@": "12",
     "/::P": "13",
     "/::D": "14",
     "/::O": "15",
     "/::(": "16",
     "/::+": "17",
     "/:�Cb": "18",
     "/::Q": "19",
     "/::T": "20",
     "/:,@P": "21",
     "/:,@-D": "22",
     "/::d": "23",
     "/:,@o": "24",
     "/::g": "25",
     "/:|-)": "26",
     "/::!": "27",
     "/΢Ц": "1",
     "/Ʋ��": "2",
     "/ɫ": "3",
     "/����": "4",
     "/����": "5",
     "/����": "6",
     "/����": "7",
     "/����": "8",
     "/˯": "9",
     "/���": "10",
     "/����": "11",
     "/��ŭ": "12",
     "/��Ƥ": "13",
     "/����": "14",
     "/����": "15",
     "/�ѹ�": "16",
     "/��": "17",
     "/�亹": "18",
     "/ץ��": "19",
     "/��": "20",
     "/͵Ц": "21",
     "/���": "22",
     "/����": "23",
     "/����": "24",
     "/����": "25",
     "/��": "26",
     "/����": "27",
     "[΢Ц]": "1",
     "[Ʋ��]": "2",
     "[ɫ]": "3",
     "[����]": "4",
     "[����]": "5",
     "[����]": "6",
     "[����]": "7",
     "[����]": "8",
     "[˯]": "9",
     "[���]": "10",
     "[����]": "11",
     "[��ŭ]": "12",
     "[��Ƥ]": "13",
     "[����]": "14",
     "[����]": "15",
     "[�ѹ�]": "16",
     "[��]": "17",
     "[�亹]": "18",
     "[ץ��]": "19",
     "[��]": "20",
     "[͵Ц]": "21",
     "[���]": "22",
     "[����]": "23",
     "[����]": "24",
     "[����]": "25",
     "[��]": "26",
     "[����]": "27"
     }*/
},{}],65:[function(require,module,exports){
    module.exports={
        "/::)": "1",
        "/::~": "2",
        "/::B": "3",
        "/::|": "4",
        "/:8-)": "5",
        "/::<": "6",
        "/::$": "7",
        "/::X": "8",
        "/::Z": "9",
        "/::'(": "10",
        "/::-|": "11",
        "/::@": "12",
        "/::P": "13",
        "/::D": "14",
        "/::O": "15",
        "/::(": "16",
        "/::+": "17",
        "/:�Cb": "18",
        "/::Q": "19",
        "/::T": "20",
        "/:,@P": "21",
        "/:,@-D": "22",
        "/::d": "23",
        "/:,@o": "24",
        "/::g": "25",
        "/:|-)": "26",
        "/::!": "27",
        "/΢Ц": "1",
        "/Ʋ��": "2",
        "/ɫ": "3",
        "/����": "4",
        "/����": "5",
        "/����": "6",
        "/����": "7",
        "/����": "8",
        "/˯": "9",
        "/���": "10",
        "/����": "11",
        "/��ŭ": "12",
        "/��Ƥ": "13",
        "/����": "14",
        "/����": "15",
        "/�ѹ�": "16",
        "/��": "17",
        "/�亹": "18",
        "/ץ��": "19",
        "/��": "20",
        "/͵Ц": "21",
        "/���": "22",
        "/����": "23",
        "/����": "24",
        "/����": "25",
        "/��": "26",
        "/����": "27",
        "[΢Ц]": "1",
        "[Ʋ��]": "2",
        "[ɫ]": "3",
        "[����]": "4",
        "[����]": "5",
        "[����]": "6",
        "[����]": "7",
        "[����]": "8",
        "[˯]": "9",
        "[���]": "10",
        "[����]": "11",
        "[��ŭ]": "12",
        "[��Ƥ]": "13",
        "[����]": "14",
        "[����]": "15",
        "[�ѹ�]": "16",
        "[��]": "17",
        "[�亹]": "18",
        "[ץ��]": "19",
        "[��]": "20",
        "[͵Ц]": "21",
        "[���]": "22",
        "[����]": "23",
        "[����]": "24",
        "[����]": "25",
        "[��]": "26",
        "[����]": "27"
    }
},{}],66:[function(require,module,exports){
    /**
     *
     * @author daijm
     */

    function ZC_Face() {
        var listener = require("../../../common/util/listener.js");
        var weixinJson = require('./face/weixin.json');
        var weixinSymbol = require('./face/weixinsymbol.json');
        var weixinSymbolRight = require('./face/weixinsymbolRight.json');
        var reg = require('./face/Reg.js');
        //ģ������
        var template = require('./template.js');
        //show
        var tip = weixinJson,
            //analysis
            tip2 = weixinSymbol,
            tip2Right = weixinSymbolRight,
            qqfaceReg = reg.qqfaceReg,
            qqfaceReg2 = reg.qqfaceReg2;
        var that = {};
        var parseDOM = function() {
            $faceGroup = $(".js-faceGroup");
        };
        var show = function() {
            //������������ڣ��򴴽�
            if($('#faceBox').length <= 0) {
                var flag=0;
                //ios�½�ֹ����ճ��
                // unselectable="on" style="-moz-user-select:none;-webkit-user-select:none;" onselectstart="return false;"
                var str='<div id="faceBox" class="face" unselectable="on" style="-moz-user-select:none;-webkit-user-select:none;" onselectstart="return false;">';
                for(var a in tip) {
                    flag+=1;
                    // if(flag==27){
                    //     var conf=$.extend({
                    //         'flag':flag,
                    //         'a':a
                    //     });
                    //     str += doT.template(template.faceIcoStr)(conf);
                    //     //str+='<span class="faceIco js-faceIco faceIco'+flag+'" data-src="'+a+'" /></span><span class="backDelete"></span>'
                    // }else{
                    if(flag<=21){
                        var conf=$.extend({
                            'flag':flag,
                            'a':a
                        });
                        str += doT.template(template.faceIcoStr)(conf);
                    }
                    // str+='<span class="faceIco js-faceIco faceIco'+flag+'" data-src="'+a+'" /></span>';
                    // }
                };
                str+='</div>'
                $faceGroup.append(str);
                //ģ���˸��
                // $(".backDelete").unbind();
                // $(".backDelete").bind("click",function(){
                //     listener.trigger('sendArea.backDelete');
                // });
            }
            sendTotextArea();
        };
        var sendTotextArea = function() {
            $(".js-faceIco").unbind();
            $(".js-faceIco").bind("click", function(e) {
                var elm = e.currentTarget;
                var src = $(elm).attr("data-src");
                var reg = /u([0-9A-Za-z]{5})/;
                listener.trigger('sendArea.gotoxy',[{
                        'answer' : src
                    }]
                );

            });
        };
        //����̨����ʷ��¼���͵���Ϣ����
        var analysis = function(str) {//���ı����ڵı����ַ�ת��Ϊ����
            //�ݴ�������null
            if(str) {
                var icoAry = str.match(qqfaceReg);
            } else {
                return false;
            }
            //��ƥ�䵽�Ľ���ŵ�icoAry����������棬����ȡ����
            if(icoAry) {
                for(var i = 0;i < icoAry.length;i++) {
                    var ico = qqfaceReg2.exec(str);
                    //console.log(ico[0]);
                    var pathname = tip2[ico[0]];
                    //����ƥ�䵽��һ�����������ı����ַ�
                    str = str.replace(qqfaceReg2,'<img class="faceimg" src="images/static/' + pathname + '.png" border="0" />');
                    //str = str.replace(qqfaceReg2,'<span class="msgfaceIco faceIco faceIco'+pathname+'" /></span>');

                }
            }
            //console.log(str);
            //listener.trigger('sendArea.sendfaceStr',str)
            return str;
        };
        //����ҳ���͵���Ϣ����
        var analysisRight = function(str) {//���ı����ڵı����ַ�ת��Ϊ����
            //�ݴ�������null
            if(str) {
                var icoAry = str.match(qqfaceReg);
            } else {
                return false;
            }
            //��ƥ�䵽�Ľ���ŵ�icoAry����������棬����ȡ����
            if(icoAry) {
                for(var i = 0;i < icoAry.length;i++) {
                    var ico = qqfaceReg2.exec(str);
                    var pathname = tip2Right[ico[0]];
                    //����ƥ�䵽��һ�����������ı����ַ�
                    //str = str.replace(qqfaceReg2,'<img class="faceimg" src="' + path + pathname + '.gif" border="0" />');
                    str = str.replace(qqfaceReg2,'<span class="msgfaceIco faceIco faceIco'+pathname+'" /></span>');
                }
            }
            //console.log(str);
            //listener.trigger('sendArea.sendfaceStr',str)
            return str;
        };


        var hasEmotion = function(str) {//���ı����ڵı����ַ�ת��Ϊ����
            return this.qqfaceReg.test(str)
        };
        //���������url

        var bindLitener = function() {
            listener.on("sendArea.faceShow",show);
        };

        var initPlugsin = function() {//���

        };
        var init = function() {
            parseDOM();
            bindLitener();
            initPlugsin();
        };

        init();
        that.analysis = analysis;
        that.analysisRight = analysisRight;
        return that;
    }

    module.exports = ZC_Face;

},{"../../../common/util/listener.js":29,"./face/Reg.js":62,"./face/weixin.json":63,"./face/weixinsymbol.json":64,"./face/weixinsymbolRight.json":65,"./template.js":68}],67:[function(require,module,exports){
    /**
     *
     * @author daijm
     */
//��˾��ʾ
    function showTip(global) {
        var template = require('./template.js');
        var language = global.language.lan;
        var languageText = global.language.text;
        var that = {};
        var show = function(text) {
            var conf = {};
            conf = {
                'text': text
            };
            var showTipHtml = doT.template(template.showTip)(conf);
            $(".js-wrapBox").append(showTipHtml);
            parseDOM();
            position();
            setTimeout(function() {
                $showTip.remove();
            }, 3000)

        };
        var position = function() {
            var _top = $(".js-wrapBox").height() / 2 - 21;
            var _left = $(".js-wrapBox").width() / 2 - 70;
            $showTip.css({ "top": _top, "left": _left });
        };
        var parseDOM = function() {
            $showTip = $(".js-showTip");
        };
        var bindLitener = function() {

        };
        var init = function() {
            bindLitener();
        };
        init();
        that.show = show;
        return that;
    };


    module.exports = showTip;

},{"./template.js":68}],68:[function(require,module,exports){
    /*
     * @author daijm
     */
    var template = {};

    var layer = '<div class="layer js-layer"></div>';
    var AlertTemplate = '<div class="modeDialog js-modeDialog">'+
        '<div class="close"><span class="close_button">��</span><p class="h1">{{=it.title || "��ʾ"}}</p></div>'+
        '{{ if((it.footer !== false) ) { }}'+
        '<div class="wether">'+
        '<span class="js-isques">'+
        '{{=it.okText || "ȷ��"}}'+
        '</span>'+
        '<span class="js-noques">'+
        '{{=it.cancelText || "ȡ��"}}'+
        '</span>'+
        '</div>'+
        '{{ } }}'+
        '<div class="model-body">'+
        '</div>'+
        '</div>';
    var faceIcoStr= '<span unselectable="on" class="faceIco js-faceIco faceIco'+'{{=it.flag}}'+'" data-src="'+'{{=it.a}}'+'" /></span>';
    var showTip='<div class="js-showTip showTip"><p class="showTipText">'+'{{=it.text}}'+'</p></div>';
    template.layer=layer;
    template.AlertTemplate= AlertTemplate;
    template.faceIcoStr=faceIcoStr;
    template.showTip=showTip;
    module.exports = template;
//var faceIcoStr = '<span unselectable="on" class="faceIco js-faceIco faceIco'+'{{=it.flag}}'+'" data-src="'+'{{=it.a}}'+'" /></span><span class="backDelete"></span>';

},{}]},{},[33])