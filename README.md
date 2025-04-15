## Installation

Before running the project, make sure to install all dependencies:

```bash
npm install
```

## Environment Variables

To fetch the data from the endpoint, make sure to specify the local URL where
the app is running (by default, [http://localhost:3000]).

1. Create a [.env] file
2. Add your local URL as specified in the [.env.example] file.

## Run the project

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the
result.

## Test API endpoints

You can use tools like `curl`, Postman o Thunder Client.

In the root directory of the project, there is a folder called fake-bd. This
folder is automatically created the first time data is saved to the application.

The fake-bd folder simulates a simple database. It stores a file called
data.json that contains the store used by the editor.

data.json is where the data is loaded from when the application starts and saved
to when there are changes.

## Get store

```bash
curl http://localhost:3000/api/editor/get
```

## Save store

```bash
curl -X POST http://localhost:3000/api/editor/post \
  -H "Content-Type: application/json" \
  -d '{
    "document": {
        "store": {
            "document:document": {
                "gridSize": 10,
                "name": "",
                "meta": {},
                "id": "document:document",
                "typeName": "document"
            },
            "page:page": {
                "meta": {},
                "id": "page:page",
                "name": "Page 1",
                "index": "a1",
                "typeName": "page"
            },
            "shape:2OJYxdpr8xF_DX6mNwwSc": {
                "x": 353.6484375,
                "y": 149.63671875,
                "rotation": 0,
                "isLocked": false,
                "opacity": 1,
                "meta": {},
                "id": "shape:2OJYxdpr8xF_DX6mNwwSc",
                "type": "geo",
                "props": {
                    "w": 93.46484375,
                    "h": 103.73046875,
                    "geo": "rectangle",
                    "color": "black",
                    "labelColor": "black",
                    "fill": "none",
                    "dash": "draw",
                    "size": "m",
                    "font": "draw",
                    "align": "middle",
                    "verticalAlign": "middle",
                    "growY": 0,
                    "url": "",
                    "scale": 1,
                    "richText": {
                        "type": "doc",
                        "content": [
                            {
                                "type": "paragraph"
                            }
                        ]
                    }
                },
                "parentId": "page:page",
                "index": "a1",
                "typeName": "shape"
            }
        },
        "schema": {
            "schemaVersion": 2,
            "sequences": {
                "com.tldraw.store": 4,
                "com.tldraw.asset": 1,
                "com.tldraw.camera": 1,
                "com.tldraw.document": 2,
                "com.tldraw.instance": 25,
                "com.tldraw.instance_page_state": 5,
                "com.tldraw.page": 1,
                "com.tldraw.instance_presence": 6,
                "com.tldraw.pointer": 1,
                "com.tldraw.shape": 4,
                "com.tldraw.asset.bookmark": 2,
                "com.tldraw.asset.image": 5,
                "com.tldraw.asset.video": 5,
                "com.tldraw.shape.group": 0,
                "com.tldraw.shape.text": 3,
                "com.tldraw.shape.bookmark": 2,
                "com.tldraw.shape.draw": 2,
                "com.tldraw.shape.geo": 10,
                "com.tldraw.shape.note": 9,
                "com.tldraw.shape.line": 5,
                "com.tldraw.shape.frame": 0,
                "com.tldraw.shape.arrow": 5,
                "com.tldraw.shape.highlight": 1,
                "com.tldraw.shape.embed": 4,
                "com.tldraw.shape.image": 4,
                "com.tldraw.shape.video": 2,
                "com.tldraw.binding.arrow": 0
            }
        }
    },
    "session": {
        "version": 0,
        "currentPageId": "page:page",
        "exportBackground": true,
        "isFocusMode": false,
        "isDebugMode": false,
        "isToolLocked": false,
        "isGridMode": false,
        "pageStates": [
            {
                "pageId": "page:page",
                "camera": {
                    "x": 0,
                    "y": 0,
                    "z": 1
                },
                "selectedShapeIds": [
                    "shape:2OJYxdpr8xF_DX6mNwwSc"
                ],
                "focusedGroupId": null
            }
        ]
    }
}'
```
