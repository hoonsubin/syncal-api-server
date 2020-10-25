import run from './app';

// the entry point for the server application
(() => {
    run().catch((e) => {
        console.log(e);
    });
})();
