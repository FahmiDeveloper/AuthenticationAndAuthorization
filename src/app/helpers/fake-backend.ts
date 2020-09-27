import { BaseRequestOptions, RequestMethod, Response, ResponseOptions, Http } from '@angular/http';
import {MockBackend, MockConnection} from '@angular/http/testing'



export function fakeBackendFactory(
    backend: MockBackend,
    options: BaseRequestOptions) {

    let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkZhaG1pIEJvdWFiaWRpIiwiYWRtaW4iOnRydWV9.Zha98DvoX3N6c5ZGmRLcGcGV3Mzq4GaeHzmN7wOsoLI';
    
    backend.connections.subscribe((connection:MockConnection) => {

        setTimeout(() => {
            if(connection.request.url.endsWith('/api/auhtenticate') && 
            connection.request.method === RequestMethod.Post) {
                let body = JSON.parse(connection.request.getBody());

                if(body.email === 'fahmi@domain.com' && body.password === '1234'){
                    connection.mockRespond(new Response(
                        new ResponseOptions({
                            status: 200,
                            body: { token:token }
                        })));
                } else {
                    connection.mockRespond(new Response(
                        new ResponseOptions({ status: 200 })
                    ));
                }
            }

            if(connection.request.url.endsWith('/api/orders') && 
            connection.request.method === RequestMethod.Get) {

                if(connection.request.headers.get('Authorization') === 'Bearer ' + token){
                    connection.mockRespond(new Response(
                        new ResponseOptions({
                            status: 200,
                            body: [1, 2, 3] })
                        ));
                } else {
                    connection.mockRespond(new Response(
                        new ResponseOptions({ status: 401 })
                    ));
                }
            }


        },1000);
    });

    return new Http(backend, options);

}

export let fackeBackendProvider = {
    provide: Http,
    useFactory: fakeBackendFactory,
    deps: [MockBackend, BaseRequestOptions]
};