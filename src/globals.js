import { create as createIPFS } from 'ipfs-core'

global.foo = 1;
global.ipfs = null;

function inc() {
	global.foo = global.foo + 1;
}

async function init_ipfs() {
	console.log("init ipfs");
	global.ipfs = await createIPFS();
	console.log("finished ipfs");
	console.log("global.ipfs inner: ", global.ipfs);
}

init_ipfs();
inc();
