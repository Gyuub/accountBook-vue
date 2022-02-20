<template>
    <div class="pull-down-container">
            <div class="pull-down-header" v-bind:style="{'height': pullDown.height + 'px'}">
            <div class="pull-down-content" :style="pullDownContentStyle">
                <div class="pull-down-content-progress" >
                    <v-progress-circular size="20" width="3" indeterminate color="primary" ></v-progress-circular>
                </div>
                <i class="pull-down-content--icon" v-bind:class="iconClass" style="display:none;"></i>
                <span class="pull-down-content--label" style="display:none;">{{label}}</span>
            </div>
        </div>
        <slot></slot>
    </div>
</template>

<style>
.pull-down-container { height: 100%; max-height: 100%; overflow-y: auto; }
.pull-down-header { width: 100%;height: 0px; overflow: hidden; position: fixed; /** background-color: #cacaca94; */ z-index: 100;}
.pull-down-content { position: absolute; max-width: 90%; bottom: 10px; left: 50%; transform: translateX(-50%); height: 40px;
                       color: #d5d5d5; text-align: center; /*border-left: 20px solid transparent;  */
                      font-family: "noto-thin", "Helvetica Neue", Helvetica, Arial, sans-serif; font-size: 14px; }
.pull-down-content-progress{ background-color: #ffffff; padding: 5px; border-radius: 50%; box-shadow: 0px 0px 3px 0px #7d7d7d;}               
.pull-down-content--icon{ float: left;height: 20px; width: 20px; margin-top: 10px; margin-left: -20px; 
                          /* background: url(../images/down-arrow.png) no-repeat center center;*/ background-size: 20px 20px; } 
.pull-down-content--label{ float: left; height: 20px; line-height: 20px; margin-left: 10px; margin-top: 10px;}
.pull-down-content--label.pull-down-refresh{ /*background: url(../images/refresh-icon.png) no-repeat center center;*/ background-size: 20px 20px; 
                                             animation: rotate 2s infinite; animation-timing-function: linear;}
.pull-down-content--label.pull-down-error{ /*background: url(../images/error-icon.png) no-repeat center center; */background-size: 20px 20px;}

@keyframes rotate {
  from {
      transform: rotate(0deg);
  }
  to {
      transform: rotate(360deg);
  }
}
</style>

<script>
const STATUS_ERROR = -1;
const STATUS_START = 0;
const STATUS_READY = 1;
const STATUS_REFRESH = 2;
const LABELS = ['error', 'start', 'ready', 'loading'];
const ANIMATION = 'height .2s ease';

export default {
        name: "RefreshPull",
        props: {
            onRefresh: {
                type: Function
            },
            config: {
                type: Object,
                default: function() {
                    return {};
                }
            }
        },
        data() {
            return {
                pullDown: {
                    status: 0,
                    height: 0,
                    msg: ''
                },
                canPull: false
            };
        },
        computed: {
            label() {
                // label of pull down
                if (this.pullDown.status === STATUS_ERROR) {
                    return this.pullDown.msg;
                }
                return this.customLabels[this.pullDown.status + 1];
            },
            customLabels() {
                let errorLabel = this.config.errorLabel !== undefined ? this.config.errorLabel : LABELS[0];
                let startLabel = this.config.startLabel !== undefined ? this.config.startLabel : LABELS[1];
                let readyLaebl = this.config.readyLabel !== undefined ? this.config.readyLabel : LABELS[2];
                let loadingLabel = this.config.loadingLabel !== undefined ? this.config.loadingLabel : LABELS[3];
                return [errorLabel, startLabel, readyLaebl, loadingLabel];
            },
            iconClass() {
                // icon of pull down
                if (this.pullDown.status === STATUS_REFRESH) {
                    return 'pull-down-refresh';
                } else if (this.pullDown.status === STATUS_ERROR) {
                    return 'pull-down-error';
                }
                return '';
            },
            pullDownContentStyle() {
                return {
                    bottom: (this.config.pullDownHeight - 40) / 2 + 'px'
                };
            }
        },
        mounted() {
            this.$nextTick(() => {
                var el = this.$el;
                var pullDownHeader = el.querySelector('.pull-down-header');
                var icon = pullDownHeader.querySelector('.pull-down-content--icon');
                // set default pullDownHeight
                this.config.pullDownHeight = this.config.pullDownHeight || 60;
                /**
                 * reset the status of pull down
                 * @param {Object} pullDown the pull down
                 * @param {Boolean} withAnimation whether add animation when pull up
                 */
                let resetPullDown = (pullDown, withAnimation) => {
                    if (withAnimation) {
                        pullDownHeader.style.transition = ANIMATION;
                    }
                    pullDown.height = 0;
                    pullDown.status = STATUS_START;
                };
                // store of touch position, include start position and distance
                var touchPosition = {
                    startY: 0,
                    startX : 0,
                    distance: 0,
                    enable : false,
                    isScroll : false
                };

                // @see https://www.chromestatus.com/feature/5745543795965952
                // Test via a getter in the options object to see if the passive property is accessed
                var supportsPassive = false;
                try {
                    var opts = Object.defineProperty({}, 'passive', {
                        get: function() {
                            supportsPassive = true;
                        }
                    });
                    /* global window */
                    window.addEventListener("test", null, opts);
                } catch (e) {}

                // bind touchstart event to store start position of touch
                el.addEventListener('touchstart', e => {
                    var _this = this;
                    
                    if (el.scrollTop === 0) {
                        this.canPull = true;
                    } else {
                        this.canPull = false;
                    }

                    touchPosition.startY = e.touches.item(0).pageY;
                    touchPosition.startX = e.touches.item(0).pageX;
                    touchPosition.enable = false
                    touchPosition.isScroll = false

                    //vue 테이블 스크롤시 pull down 방지
                    document.querySelectorAll('.v-data-table .v-data-table__wrapper').forEach(function(node){
                        node.addEventListener('scroll',scroll);
                    });
                    function scroll(event){
                        _this.pullDown.height = 0;
                        touchPosition.isScroll = true
                        event.target.removeEventListener(event.type, scroll);
                    }

                }, supportsPassive ? {passive: true} : false);

                /**	
                 * bind touchmove event, do the following:
                 * first, update the height of pull down
                 * finally, update the status of pull down based on the distance
                 */
                el.addEventListener('touchmove', e => {
                    var moveX = e.touches.item(0).pageX;
                    if(!touchPosition.enable && Math.abs(moveX-touchPosition.startX) < 5){ //pull down 할시 손가락이 대각선으로 내려가는거 방지
                        touchPosition.enable = true
                    }

                    if(touchPosition.isScroll) return;
                    if(!touchPosition.enable) return;
                    if(!this.canPull) return;

                    var distance = e.touches.item(0).pageY - touchPosition.startY;
                    // limit the height of pull down to 180
                    distance = distance > 140 ? 140 : distance;
                    // prevent native scroll
                    if (distance > 0) {
                        el.style.overflow = 'hidden';
                    }
                    // update touchPosition and the height of pull down
                    touchPosition.distance = distance;
                    this.pullDown.height = distance;
                    /**
                     * if distance is bigger than the height of pull down
                     * set the status of pull down to STATUS_READY
                     */
                    if (distance > this.config.pullDownHeight) {
                        this.pullDown.status = STATUS_READY;
                        icon.style.transform = 'rotate(180deg)';
                    } else {
                        /**
                         * else set the status of pull down to STATUS_START
                         * and rotate the icon based on distance
                         */
                        this.pullDown.status = STATUS_START;
                        icon.style.transform = 'rotate(' + distance / this.config.pullDownHeight * 180 + 'deg)';
                    }
                }, supportsPassive ? {passive: true} : false);

                // bind touchend event
                el.addEventListener('touchend', e => {
                    this.canPull = false;
                    el.style.overflowY = 'auto';
                    pullDownHeader.style.transition = ANIMATION;
                    // reset icon rotate
                    icon.style.transform = '';
                    // if distance is bigger than 60
                    if (touchPosition.distance - el.scrollTop > this.config.pullDownHeight) {
                        el.scrollTop = 0;
                        this.pullDown.height = this.config.pullDownHeight;
                        this.pullDown.status = STATUS_REFRESH;
                        // trigger refresh callback
                        if (this.onRefresh && typeof this.onRefresh === 'function') {
                            var res = this.onRefresh();
                            // if onRefresh return promise
                            if (res && res.then && typeof res.then === 'function') {
                                res.then(result => {
                                    resetPullDown(this.pullDown, true);
                                }, error => {
                                    // show error and hide the pull down after 1 second
                                    if (typeof error !== 'string') {
                                        error = false;
                                    }
                                    this.pullDown.msg = error || this.customLabels[0];
                                    this.pullDown.status = STATUS_ERROR;
                                    setTimeout(() => {
                                        resetPullDown(this.pullDown, true);
                                    }, 1000);
                                });
                            } else {
                                resetPullDown(this.pullDown);
                            }
                        } else {
                            resetPullDown(this.pullDown);
                            console.warn('please use :on-refresh to pass onRefresh callback');
                        }
                    } else {
                        resetPullDown(this.pullDown);
                    }
                    // reset touchPosition
                    touchPosition.distance = 0;
                    touchPosition.startY = 0;
                    touchPosition.startX = 0;
                });
                // remove transition when transitionend
                pullDownHeader.addEventListener('transitionend', () => {
                    pullDownHeader.style.transition = '';
                });
                pullDownHeader.addEventListener('webkitTransitionEnd', () => {
                    pullDownHeader.style.transition = '';
                });
            });
        }
    }
</script>