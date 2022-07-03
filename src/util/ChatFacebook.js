import React from "react";
import Script from "next/script";

export const showChatFB = () => {
    return <Script strategy="lazyOnload">
        {`
                var chatbox = document.getElementById('fb-customer-chat');
                chatbox.setAttribute("page_id", "111398824929944");
                chatbox.setAttribute("attribution", "biz_inbox");

                window.fbAsyncInit = function() {
                    FB.init({
                        xfbml: true,
                        version: 'v14.0'
                    });
                };

                (function(d, s, id) {
                    var js, fjs = d.getElementsByTagName(s)[0];
                    if (d.getElementById(id)) return;
                    js = d.createElement(s); js.id = id;
                    js.src = 'https://connect.facebook.net/vi_VN/sdk/xfbml.customerchat.js';
                       fjs.parentNode.insertBefore(js, fjs);
                }(document, 'script', 'facebook-jssdk'));
            `}
    </Script>
}
