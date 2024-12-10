import { type PluginOptions, type Plugin, defaultPluginOptions, access } from '@neokit-dev/core';

export const id = 'dev.neokit.buckets';
export const defaultNamespace = 'buckets';
export const apiVersion = 2;
export const version = 1;

export class BucketsPlugin {
	metadataFn;
  downloadFn;
  uploadFn;
  removeFn;

	constructor(options: BucketsPluginOptions) {
		this.metadataFn = options.metadataFn;
    this.downloadFn = options.downloadFn;
    this.uploadFn = options.uploadFn;
    this.removeFn = options.removeFn;
	}

  metadata(path: string) {
    return this.metadataFn(path);
  }

  download(path: string) {
    return this.downloadFn(path);
  }

  upload(path: string, data: ArrayBuffer) {
    return this.uploadFn(path, data);
  }

  remove(path: string) {
    return this.removeFn(path);
  }
}

export interface BucketsPluginOptions extends PluginOptions {
	metadataFn: (path: string) => Promise<unknown>;
  downloadFn: (path: string) => Promise<ArrayBuffer>;
  uploadFn: (path: string, data: ArrayBuffer) => Promise<unknown>;
  removeFn: (path: string) => Promise<unknown>;
}

export function plugin(options: BucketsPluginOptions): Plugin {
	return {
		id,
		version,
		apiVersion,
		plugin: new BucketsPlugin(options),
		...defaultPluginOptions(options, { namespace: defaultNamespace })
	};
}

export function metadata(path: string) {
	return namespace(defaultNamespace).metadata(path);
}

export function download(path: string) {
  return namespace(defaultNamespace).download(path);
}

export function upload(path: string, data: ArrayBuffer) {
  return namespace(defaultNamespace).upload(path, data);
}

export function remove(path: string) {
  return namespace(defaultNamespace).remove(path);
}

export function namespace(namespace: string) {
  return access(id)[namespace].plugin as BucketsPlugin;
}