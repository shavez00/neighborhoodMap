export default function startServiceworker() {
        if ('serviceworker' in navigator) {
            navigator.serviceworker.register('/sw.js', {scope: '/'})
                    .then(function(reg) {
                        console.log('Registartion succeeded', reg);
                    })
                    .catch(function(error) {
                        console.log('Registration faile with ' + error);
                    })
        }
}