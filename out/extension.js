"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const path = require("path");
const vscode = require("vscode");
class SurfacesKeywordDesc {
    constructor(name, detail, shortDetail, document = null, primary = false) {
        this.name = name;
        this.detail = detail;
        this.document = document;
        this.primary = primary;
        this.shortDetail = shortDetail;
    }
}
class SurfacesSignatureHelpProvider {
    selectSignature(signature, parameterIndex) {
        var result = new vscode.SignatureHelp();
        result.activeSignature = 0;
        result.activeParameter = parameterIndex;
        result.signatures = [signature];
        return result;
    }
    selectSignatureToSplitItemCount(signature, splitItemsLength, lastWideRange = false) {
        if (splitItemsLength > 1 && splitItemsLength - 2 < signature.parameters.length)
            return this.selectSignature(signature, splitItemsLength - 2);
        else if (splitItemsLength > 1 && lastWideRange)
            return this.selectSignature(signature, signature.parameters.length - 1);
        return null;
    }
    provideSignatureHelp(document, position, token) {
        var elementSignature = new vscode.SignatureInformation("element*,合成メソッド,ファイル名,X座標,Y座標", "サーフェス エレメント");
        elementSignature.parameters = [
            new vscode.ParameterInformation("合成メソッド", "サーフェスの重ね方を設定します。\nただ重ねるだけで良いならoverlayを選択します。\nほかは必要に応じて選びます。"),
            new vscode.ParameterInformation("ファイル名", "使用する画像ファイルの名前を指定します。"),
            new vscode.ParameterInformation("X座標", "画像を配置するX座標を指定します。"),
            new vscode.ParameterInformation("Y座標", "画像を配置するY座標を指定します。")
        ];
        var animationIntervalSignature = new vscode.SignatureInformation("animation*.interval,インターバルタイプ", "アニメーション インターバル");
        animationIntervalSignature.parameters = [
            new vscode.ParameterInformation("インターバルタイプ", "アニメーションの発生間隔を示すタイプを指定します。")
        ];
        var animationIntervalRandomSignature = new vscode.SignatureInformation(animationIntervalSignature.label + ",設定値", "[random インターバル特有]\n発生確率を設定します。");
        animationIntervalRandomSignature.parameters = [
            animationIntervalSignature.parameters[0],
            new vscode.ParameterInformation("設定値", "毎秒(設定値)分の1の確率でアニメーションを再生します。")
        ];
        var animationIntervalPeriodicSignature = new vscode.SignatureInformation(animationIntervalSignature.label + ",設定値", "[periodic インターバル特有]\n再生間隔を設定します。");
        animationIntervalPeriodicSignature.parameters = [
            animationIntervalSignature.parameters[0],
            new vscode.ParameterInformation("設定値", "(設定値)秒ごとにアニメーションを再生します。")
        ];
        var animationIntervalTalkSignature = new vscode.SignatureInformation(animationIntervalSignature.label + ",設定値", "[talk インターバル特有]\n再生間隔を設定します。");
        animationIntervalTalkSignature.parameters = [
            animationIntervalSignature.parameters[0],
            new vscode.ParameterInformation("設定値", "(設定値)文字をバルーンに表示するたびにアニメーションを再生します")
        ];
        var animationPatternSignature = new vscode.SignatureInformation("animation*.pattern*,合成メソッド,サーフェスID,ウェイト,X座標,Y座標");
        animationPatternSignature.parameters = [
            new vscode.ParameterInformation("合成メソッド", "サーフェスの重ね方を設定します。\nただ重ねるだけで良いならoverlayを選択します。\nほかは必要に応じて選びます。"),
            new vscode.ParameterInformation("サーフェスID", "アニメーションのコマとして使用するサーフェス番号。"),
            new vscode.ParameterInformation("ウェイト", "このコマが表示されるまでの時間(ミリ秒単位)"),
            new vscode.ParameterInformation("X座標", "画像を配置するX座標を指定します。"),
            new vscode.ParameterInformation("Y座標", "画像を配置するY座標を指定します。")
        ];
        var animationPatternStartSignature = new vscode.SignatureInformation("animation*.pattern*,start,アニメーションID");
        animationPatternStartSignature.parameters = [
            animationPatternSignature.parameters[0],
            new vscode.ParameterInformation("アニメーションID", "[start メソッド特有]\n開始するアニメーションIDを指定します。")
        ];
        var animationPatternStopSignature = new vscode.SignatureInformation("animation*.pattern*,stop,アニメーションID");
        animationPatternStopSignature.parameters = [
            animationPatternSignature.parameters[0],
            new vscode.ParameterInformation("アニメーションID", "[stop メソッド特有]\n停止するアニメーションIDを指定します。")
        ];
        var animationPatternInsertSignature = new vscode.SignatureInformation("animation*.pattern*,stop,アニメーションID");
        animationPatternInsertSignature.parameters = [
            animationPatternSignature.parameters[0],
            new vscode.ParameterInformation("アニメーションID", "[insert メソッド特有]\n停止するアニメーションIDを指定します。")
        ];
        var animationPatternAlternativestartSignature = new vscode.SignatureInformation("animation*.pattern*,alternativestart,(アニメーションID)");
        animationPatternAlternativestartSignature.parameters = [
            animationPatternSignature.parameters[0],
            new vscode.ParameterInformation("アニメーションID", "[alternativestart メソッド特有]\n開始するアニメーションIDを括弧内に複数指定します。")
        ];
        var animationPatternAlternativestopSignature = new vscode.SignatureInformation("animation*.pattern*,alternativestop,(アニメーションID)");
        animationPatternAlternativestopSignature.parameters = [
            animationPatternSignature.parameters[0],
            new vscode.ParameterInformation("アニメーションID", "[alternativestop メソッド特有]\n停止するアニメーションIDを括弧内に複数指定します。")
        ];
        var animationPatternParallelstartSignature = new vscode.SignatureInformation("animation*.pattern*,parallelstart,(アニメーションID)");
        animationPatternParallelstartSignature.parameters = [
            animationPatternSignature.parameters[0],
            new vscode.ParameterInformation("アニメーションID", "[parallelstart  メソッド特有]\r開始するアニメーションIDを括弧内に複数指定します。")
        ];
        var animationPatternParallelstopSignature = new vscode.SignatureInformation("animation*.pattern*,parallelstart,(アニメーションID)");
        animationPatternParallelstopSignature.parameters = [
            animationPatternSignature.parameters[0],
            new vscode.ParameterInformation("アニメーションID", "[parallelstop  メソッド特有]\n停止するアニメーションIDを括弧内に複数指定します。")
        ];
        var collisionIDParameter = new vscode.ParameterInformation("判定ID", "判定の名前を示すID。headやbustなど。");
        var collisionExTypeParameter = new vscode.ParameterInformation("判定タイプ", "判定の形状を指定します。");
        var collisionRectParameters = [
            collisionIDParameter,
            collisionExTypeParameter,
            new vscode.ParameterInformation("始点X", "長方形の始点位置 X座標"),
            new vscode.ParameterInformation("始点Y", "長方形の始点位置 Y座標"),
            new vscode.ParameterInformation("終点X", "長方形の終点位置 X座標"),
            new vscode.ParameterInformation("終点Y", "長方形の終点位置 Y座標")
        ];
        var collisionCircleParameters = [
            collisionIDParameter,
            collisionExTypeParameter,
            new vscode.ParameterInformation("中心X", "円の中心位置 X座標"),
            new vscode.ParameterInformation("中心Y", "円の中心位置 Y座標"),
            new vscode.ParameterInformation("半径", "円の半径")
        ];
        var collisionEllipseParameters = [
            collisionIDParameter,
            collisionExTypeParameter,
            new vscode.ParameterInformation("始点X", "楕円形の始点位置 X座標"),
            new vscode.ParameterInformation("始点Y", "楕円形の始点位置 Y座標"),
            new vscode.ParameterInformation("終点X", "楕円形の終点位置 X座標"),
            new vscode.ParameterInformation("終点Y", "楕円形の終点位置 Y座標")
        ];
        var collisionPolygonParameters = [
            collisionIDParameter,
            collisionExTypeParameter,
            new vscode.ParameterInformation("頂点X,頂点Y...", "多角形の頂点位置を連続して記入。\n3頂点以上は最低でも必要。")
        ];
        var collisionSignature = new vscode.SignatureInformation("collision*,始点X,始点Y,終点X,終点Y,判定ID", "長方形の触り判定を作成");
        var collisionExSignature = new vscode.SignatureInformation("collisionex*,判定ID,判定タイプ,座標...", "触り判定を作成");
        var collisionExRectSignature = new vscode.SignatureInformation("collisionex*,判定ID,判定タイプ,始点X,始点Y,終点X,終点Y", "長方形の触り判定を作成");
        var collisionExCircleSignature = new vscode.SignatureInformation("collisionex*,判定ID,判定タイプ,中心X,中心Y,半径", "円形の触り判定を作成");
        var collisionExEllipseSignature = new vscode.SignatureInformation("collisionex*,判定ID,判定タイプ,始点X,始点Y,終点X,終点Y", "楕円形の触り判定を作成");
        var collisionExPolygonSignature = new vscode.SignatureInformation("collisionex*,判定ID,判定タイプ,頂点X,頂点Y...");
        //アニメコリジョン
        var animationCollisionSignature = new vscode.SignatureInformation("animation*." + collisionSignature.label, collisionSignature.documentation);
        var animationCollisionExSignature = new vscode.SignatureInformation("animation*." + collisionExSignature.label, collisionExSignature.documentation);
        var animationCollisionExRectSignature = new vscode.SignatureInformation("animation*." + collisionExRectSignature.label, collisionExSignature.documentation);
        var animationCollisionExCircleSignature = new vscode.SignatureInformation("animation*." + collisionExCircleSignature.label, collisionExCircleSignature.documentation);
        var animationCollisionExEllipseSignature = new vscode.SignatureInformation("animation*." + collisionExEllipseSignature.label, collisionExEllipseSignature.documentation);
        var animationCollisionExPolygonSignature = new vscode.SignatureInformation("animation*." + collisionExPolygonSignature.label, collisionExPolygonSignature.documentation);
        collisionSignature.parameters = animationCollisionSignature.parameters = [
            collisionRectParameters[2],
            collisionRectParameters[3],
            collisionRectParameters[4],
            collisionRectParameters[5],
            collisionIDParameter
        ];
        collisionExSignature.parameters = animationCollisionExSignature.parameters = [
            collisionIDParameter,
            collisionExTypeParameter
        ];
        //コリジョンパラメータ
        collisionExRectSignature.parameters = animationCollisionExRectSignature.parameters = collisionRectParameters;
        collisionExCircleSignature.parameters = animationCollisionExCircleSignature.parameters = collisionCircleParameters;
        collisionExEllipseSignature.parameters = animationCollisionExEllipseSignature.parameters = collisionEllipseParameters;
        collisionExPolygonSignature.parameters = animationCollisionExPolygonSignature.parameters = collisionPolygonParameters;
        var result = new vscode.SignatureHelp();
        var line = document.lineAt(position.line).text;
        var lineTopToCurrent = document.getText(new vscode.Range(document.lineAt(position.line).range.start, position));
        if (line.match(/^\s*element[0-9]+,/)) {
            //elementっぽい
            var splitItems = lineTopToCurrent.replace(/\s/, "").split(",");
            if (splitItems.length > 1 && splitItems.length - 2 < elementSignature.parameters.length) {
                result.activeSignature = 0;
                result.activeParameter = splitItems.length - 2;
                result.signatures = [elementSignature];
                return result;
            }
        }
        else if (line.match(/^\s*animation[0-9]+\.interval,/)) {
            var splitItems = lineTopToCurrent.replace(/\s/, "").split(",");
            if (splitItems.length >= 2) {
                if (splitItems[1].match(/random/)) {
                    var res = this.selectSignatureToSplitItemCount(animationIntervalRandomSignature, splitItems.length);
                    return res;
                }
                else if (splitItems[1].match(/periodic/)) {
                    var res = this.selectSignatureToSplitItemCount(animationIntervalPeriodicSignature, splitItems.length);
                    return res;
                }
                else if (splitItems[1].match(/talk/)) {
                    var res = this.selectSignatureToSplitItemCount(animationIntervalTalkSignature, splitItems.length);
                    return res;
                }
            }
            return this.selectSignatureToSplitItemCount(animationIntervalSignature, splitItems.length);
        }
        else if (line.match(/^\s*animation[0-9]+\.pattern[0-9]+,/)) {
            //start, stop など特殊なモノへの対応
            var splitItems = lineTopToCurrent.replace(/\s/, "").split(",");
            if (splitItems.length >= 2) {
                //start
                if (splitItems[1] == "start") {
                    var res = this.selectSignatureToSplitItemCount(animationPatternStartSignature, splitItems.length);
                    return res;
                }
                else if (splitItems[1] == "stop") {
                    var res = this.selectSignatureToSplitItemCount(animationPatternStopSignature, splitItems.length);
                    return res;
                }
                else if (splitItems[1] == "insert") {
                    var res = this.selectSignatureToSplitItemCount(animationPatternInsertSignature, splitItems.length);
                    return res;
                }
                else if (splitItems[1] == "alternativestart") {
                    var res = this.selectSignatureToSplitItemCount(animationPatternAlternativestartSignature, splitItems.length, true);
                    return res;
                }
                else if (splitItems[1] == "alternativestop") {
                    var res = this.selectSignatureToSplitItemCount(animationPatternAlternativestopSignature, splitItems.length, true);
                    return res;
                }
                else if (splitItems[1] == "parallelstart") {
                    var res = this.selectSignatureToSplitItemCount(animationPatternParallelstartSignature, splitItems.length, true);
                    return res;
                }
                else if (splitItems[1] == "parallelstop") {
                    var res = this.selectSignatureToSplitItemCount(animationPatternParallelstopSignature, splitItems.length, true);
                    return res;
                }
            }
            //通常アニメーションパターン
            if (splitItems.length > 1 && splitItems.length - 2 < animationPatternSignature.parameters.length) {
                result.activeSignature = 0;
                result.activeParameter = splitItems.length - 2;
                result.signatures = [animationPatternSignature];
                return result;
            }
        }
        else if (line.match(/^\s*collisionex[0-9]+,/)) {
            var splitItems = lineTopToCurrent.replace(/\s/, "").split(",");
            if (splitItems.length >= 3) {
                if (splitItems[2] == "rect") {
                    var res = this.selectSignatureToSplitItemCount(collisionExRectSignature, splitItems.length);
                    if (res != null)
                        return res;
                }
                else if (splitItems[2] == "circle") {
                    var res = this.selectSignatureToSplitItemCount(collisionExCircleSignature, splitItems.length);
                    if (res != null)
                        return res;
                }
                else if (splitItems[2] == "ellipse") {
                    var res = this.selectSignatureToSplitItemCount(collisionExEllipseSignature, splitItems.length);
                    if (res != null)
                        return res;
                }
                else if (splitItems[2] == "polygon") {
                    var res = this.selectSignatureToSplitItemCount(collisionExEllipseSignature, splitItems.length);
                    if (res != null)
                        return res;
                }
            }
            if (splitItems.length > 1 && splitItems.length - 2 < collisionExSignature.parameters.length)
                return this.selectSignature(collisionExSignature, splitItems.length - 2);
        }
        else if (line.match(/^\s*animation[0-9]+\.collision[0-9]+,/)) {
            var splitItems = lineTopToCurrent.replace(/\s/, "").split(",");
            if (splitItems.length >= 3) {
                if (splitItems[2] == "rect") {
                    var res = this.selectSignatureToSplitItemCount(animationCollisionExRectSignature, splitItems.length);
                    if (res != null)
                        return res;
                }
                else if (splitItems[2] == "circle") {
                    var res = this.selectSignatureToSplitItemCount(animationCollisionExCircleSignature, splitItems.length);
                    if (res != null)
                        return res;
                }
                else if (splitItems[2] == "ellipse") {
                    var res = this.selectSignatureToSplitItemCount(animationCollisionExEllipseSignature, splitItems.length);
                    if (res != null)
                        return res;
                }
                else if (splitItems[2] == "polygon") {
                    var res = this.selectSignatureToSplitItemCount(animationCollisionExEllipseSignature, splitItems.length);
                    if (res != null)
                        return res;
                }
            }
            if (splitItems.length > 1 && splitItems.length - 2 < collisionExSignature.parameters.length)
                return this.selectSignature(animationCollisionExSignature, splitItems.length - 2);
        }
        else if (line.match(/^\s*collision[0-9]+,/)) {
            var splitItems = lineTopToCurrent.replace(/\s/, "").split(",");
            if (splitItems.length > 1 && splitItems.length - 2 < collisionSignature.parameters.length)
                return this.selectSignature(collisionSignature, splitItems.length - 2);
        }
        else if (line.match(/^\s*animation[0-9]+\.collision[0-9]+,/)) {
            var splitItems = lineTopToCurrent.replace(/\s/, "").split(",");
            if (splitItems.length > 1 && splitItems.length - 2 < collisionSignature.parameters.length)
                return this.selectSignature(animationCollisionSignature, splitItems.length - 2);
        }
        return null;
    }
}
//ホバー
class SurfacesHoverProvider {
    addMarkdownItem(label, stringArray, index) {
        if (stringArray.length >= index + 1)
            return label + ": " + stringArray[index];
        else
            return label + ": (設定が必要)";
    }
    addMarkdownImageItem(label, stringArray, index, document) {
        if (stringArray.length >= index + 1) {
            var target = path.dirname(document.fileName) + path.sep + stringArray[index];
            return label + ": [" + stringArray[index] + "](file:///" + target + ")";
        }
        else
            return label + ": (設定が必要)";
    }
    provideHover(document, position, token) {
        var texts = {
            sometimes: "毎秒50%の確率でアニメーション。",
            rarely: "毎秒25%の確率でアニメーション",
            random: "毎秒 (数値)分の1の確率で発生",
            periodic: "(数値)秒おきに定期的に再生",
            always: "常に再生",
            runonce: "切り替わったときに一度だけ再生",
            never: "自動では再生しない",
            "yen-e": "\\eが来たときに再生",
            talk: "バルーンで(数値)文字表示するたびに再生",
            bind: "着せ替えとして扱う",
            overlay: "単純な重ね合わせ合成",
            base: "ベースサーフェスによる置き換え",
            overlayfast: "ベースレイヤが不透明なほど濃く合成",
            replace: "画像置き換え",
            interpolate: "ベースレイヤが透明な程濃く合成",
            asis: "透過を無視して重ねる",
            move: "ベースレイヤの位置をずらす",
            add: "着せ替えとして扱う",
            reduce: "不透明度の乗算",
            insert: "着せ替えグループの挿入",
            start: "指定アニメーションを開始",
            stop: "指定アニメーションを停止",
            alternativestart: "指定アニメーションのいずれかを開始",
            alternativestop: "指定アニメーションのいずれかを終了",
            parallelstart: "指定アニメーションをすべて開始",
            parallelstop: "指定アニメーションをすべて停止",
            rect: "長方形",
            circle: "円形",
            ellipse: "楕円形",
            polygon: "多角形",
            region: "色による領域指定"
        };
        var word_range = document.getWordRangeAtPosition(position);
        var word = document.getText(word_range);
        var line = document.lineAt(position.line).text;
        if (word in texts) {
            return new vscode.Hover(texts[word]);
        }
        //解析して説明しようと試みる
        if (line.match(/^\s*animation[0-9]+\.pattern[0-9]+,/)) {
            //パターンを分離して解析してみる
            var split_items = line.replace(/\s/, "").split(",");
            var match = line.match(/^\s*animation([0-9]+)\.pattern([0-9]+),/);
            var mk = new vscode.MarkdownString();
            mk.appendText("アニメーション パターン\n");
            //mk.appendMarkdown("\n- animation-id: " + match![1]);
            //mk.appendMarkdown("\n- pattern-id: " + match![2]);
            mk.appendText(split_items[0]);
            if (split_items.length >= 2)
                mk.appendMarkdown("\n- 合成方法: " + split_items[1]);
            else
                mk.appendMarkdown("\n- 合成方法: (設定が必要です)");
            //特殊設定類
            if (split_items.length >= 2) {
                if (split_items[1] == "start" || split_items[1] == "stop") {
                    if (split_items.length >= 3)
                        mk.appendMarkdown("\n- アニメーション番号: " + split_items[2]);
                    else
                        mk.appendMarkdown("\n- アニメーション番号: (設定が必要です)");
                    return new vscode.Hover(mk);
                }
                else if (split_items[1] == "start" || split_items[1] == "stop") {
                    return new vscode.Hover(mk);
                }
                else if (split_items[1] == "insert") {
                    if (split_items.length >= 3)
                        mk.appendMarkdown("\n- サーフェス番号: " + split_items[2]);
                    else
                        mk.appendMarkdown("\n- サーフェス番号: (設定が必要です)");
                    return new vscode.Hover(mk);
                }
            }
            //基本合成方法
            if (split_items.length >= 3)
                mk.appendMarkdown("\n- サーフェス番号: " + split_items[2]);
            else
                mk.appendMarkdown("\n- サーフェス番号: (設定が必要です)");
            if (split_items.length >= 4)
                mk.appendMarkdown("\n- ウェイト: " + split_items[3] + "ms");
            else
                mk.appendMarkdown("\n- ウェイト: (設定が必要です)");
            if (split_items.length >= 5)
                mk.appendMarkdown("\n- X座標: " + split_items[4]);
            else
                mk.appendMarkdown("\n- X座標: (設定が必要です)");
            if (split_items.length >= 6)
                mk.appendMarkdown("\n- Y座標: " + split_items[5]);
            else
                mk.appendMarkdown("\n- Y座標: (設定が必要です)");
            return new vscode.Hover(mk);
        }
        else if (line.match(/^\s*animation[0-9]+\.interval,/)) {
            var mk = new vscode.MarkdownString();
            var split_items = line.replace(/\s/, "").split(",");
            mk.appendText("アニメーション インターバル\n");
            mk.appendText(split_items[0]);
            mk.appendMarkdown(this.addMarkdownItem("\n- インターバルタイプ", split_items, 1));
            return new vscode.Hover(mk);
        }
        else if (line.match(/^\s*element[0-9]+,/)) {
            var mk = new vscode.MarkdownString();
            var split_items = line.replace(/\s/, "").split(",");
            mk.appendText("サーフェス エレメント\n");
            mk.appendText(split_items[0]);
            mk.appendMarkdown(this.addMarkdownItem("\n- 合成メソッド", split_items, 1));
            mk.appendMarkdown(this.addMarkdownImageItem("\n- ファイル名", split_items, 2, document));
            mk.appendMarkdown(this.addMarkdownItem("\n- 座標X", split_items, 3));
            mk.appendMarkdown(this.addMarkdownItem("\n- 座標Y", split_items, 4));
            //画像プレビュー
            if (split_items.length > 2) {
                var target = path.dirname(document.fileName) + path.sep + split_items[2];
                mk.appendMarkdown(`  \n![preview](file:///${target} "${split_items[2]}")`);
            }
            return new vscode.Hover(mk);
        }
        else if (line.match(/^\s*collision[0-9]+,/) || line.match(/^\s*animation[0-9]+\.collision[0-9]+,/)) {
            var mk = new vscode.MarkdownString();
            var split_items = line.replace(/\s/, "").split(",");
            mk.appendText("触り判定\n");
            mk.appendText(split_items[0]);
            mk.appendMarkdown(this.addMarkdownItem("\n- 始点X", split_items, 1));
            mk.appendMarkdown(this.addMarkdownItem("\n- 始点Y", split_items, 2));
            mk.appendMarkdown(this.addMarkdownItem("\n- 終点X", split_items, 3));
            mk.appendMarkdown(this.addMarkdownItem("\n- 終点Y", split_items, 4));
            mk.appendMarkdown(this.addMarkdownItem("\n- 判定ID", split_items, 5));
            return new vscode.Hover(mk);
        }
        else if (line.match(/^\s*collisionex[0-9]+,/) || line.match(/^\s*animation[0-9]+\.collisionex[0-9]+,/)) {
            var mk = new vscode.MarkdownString();
            var split_items = line.replace(/\s/, "").split(",");
            mk.appendText("触り判定\n");
            mk.appendText(split_items[0]);
            mk.appendMarkdown(this.addMarkdownItem("\n- 判定ID", split_items, 1));
            if (split_items.length < 3)
                mk.appendMarkdown("\n- 判定タイプ: (設定が必要です)");
            else if (split_items[2] == "rect") {
                mk.appendMarkdown("\n- 判定タイプ: 長方形");
                mk.appendMarkdown(this.addMarkdownItem("\n- 始点X", split_items, 3));
                mk.appendMarkdown(this.addMarkdownItem("\n- 始点Y", split_items, 4));
                mk.appendMarkdown(this.addMarkdownItem("\n- 終点X", split_items, 5));
                mk.appendMarkdown(this.addMarkdownItem("\n- 終点Y", split_items, 6));
            }
            else if (split_items[2] == "circle") {
                mk.appendMarkdown("\n- 判定タイプ: 円形");
                mk.appendMarkdown(this.addMarkdownItem("\n- 中心X", split_items, 3));
                mk.appendMarkdown(this.addMarkdownItem("\n- 中心Y", split_items, 4));
                mk.appendMarkdown(this.addMarkdownItem("\n- 半径", split_items, 5));
            }
            else if (split_items[2] == "ellipse") {
                mk.appendMarkdown("\n- 判定タイプ: 楕円形");
                mk.appendMarkdown(this.addMarkdownItem("\n- 始点X", split_items, 3));
                mk.appendMarkdown(this.addMarkdownItem("\n- 始点Y", split_items, 4));
                mk.appendMarkdown(this.addMarkdownItem("\n- 終点X", split_items, 5));
                mk.appendMarkdown(this.addMarkdownItem("\n- 終点Y", split_items, 6));
            }
            else if (split_items[2] == "polygon") {
                mk.appendMarkdown("\n- 判定タイプ: 多角形");
            }
            else if (split_items[2] == "region") {
                mk.appendMarkdown("\n- 判定タイプ: 色による領域指定");
                mk.appendMarkdown(this.addMarkdownItem("\n- 画像ファイル", split_items, 3));
                mk.appendMarkdown(this.addMarkdownItem("\n- R値", split_items, 4));
                mk.appendMarkdown(this.addMarkdownItem("\n- G値", split_items, 5));
                mk.appendMarkdown(this.addMarkdownItem("\n- B値", split_items, 6));
                mk.appendMarkdown(this.addMarkdownItem("\n- 反転設定", split_items, 7));
            }
            return new vscode.Hover(mk);
        }
        return null;
    }
}
//補完
class SurfacesCompletionItemProvider {
    MakeIntervalItems() {
        var result = [];
        var items = [
            ["sometimes", "毎秒50%の確率", ""],
            ["rarely", "毎秒25%の確率", ""],
            ["random", "毎秒 (数値)分の1の確率", "例:\nrandom,10\n毎秒10分の1の確率"],
            ["periodic", "指定秒数間隔で定期的に再生", "例:\nperiodic,10\n10秒おきに再生"],
            ["always", "常に再生"],
            ["runonce", "切り替わったタイミングで一度だけ"],
            ["never", "自動では再生しない", ""],
            ["yen-e", "\\eが来たときに再生"],
            ["talk", "バルーンで指定文字数を表示するたびに再生", "例:\ntalk,3\n3文字喋るごとに再生"],
            ["bind", "着せ替えとして扱う"]
        ];
        for (var i of items) {
            var ci = new vscode.CompletionItem(i[0]);
            if (i[0] == "sometimes") {
                ci.preselect = true;
            }
            ci.detail = i[1];
            ci.documentation = i[2];
            ci.kind = vscode.CompletionItemKind.Keyword;
            result.push(ci);
        }
        return result;
    }
    MakeMergeMethodItems() {
        var result = [];
        var items = [
            ["overlay", "単純に重ねる", ""],
            ["bind", "着せ替えとして扱う"],
            ["base", "ベースサーフェスによる置き換え", ""],
            ["overlayfast", "ベースレイヤが不透明なほど濃く合成", ""],
            ["replace", "置き換え", ""],
            ["interpolate", "ベースレイヤが透明なほど濃く合成"],
            ["asis", "透過を無視して重ねる"],
            ["move", "ベースレイヤの位置をずらす", ""],
            ["add", "着せ替えとして扱う"],
            ["reduce", "不透明度の乗算", ""],
            ["insert", "着せ替えグループの挿入"],
            ["start", "指定アニメーションを開始", "例:\nstart,10\nanimation10を再生"],
            ["stop", "指定アニメーションを開始", "例:\nstart,10\nanimation10を停止"],
            ["alternativestart", "指定アニメーションのいずれかを開始", "例:\nalternativestart,(10,11,12)\nanimation10,11,12のどれかを再生"],
            ["alternativestop", "指定アニメーションのいずれかを停止", "例:\nalternativesstop,(10,11,12)\nanimation10,11,12のどれかを停止"],
            ["parallelstart", "指定アニメーションをすべて開始", "例:\nparallelstart,(10,11,12)\nanimation10,11,12をすべて再生"],
            ["parallelstop", "指定アニメーションをすべてを停止", "例:\nparallelstop,(10,11,12)\nanimation10,11,12をすべて停止"]
        ];
        for (var i of items) {
            var ci = new vscode.CompletionItem(i[0]);
            if (i[0] == "overlay") {
                ci.preselect = true;
            }
            ci.detail = i[1];
            ci.documentation = i[2];
            ci.kind = vscode.CompletionItemKind.Keyword;
            result.push(ci);
        }
        return result;
    }
    MakeAnimationItems() {
        var result = [];
        var items = [
            ["pattern", "アニメーションパターン", ""],
            ["collision", "アニメーションにつく触り判定", ""],
            ["interval", "アニメーションの発生間隔", ""],
            ["option", "アニメーションの追加設定", ""]
        ];
        for (var i of items) {
            var ci = new vscode.CompletionItem(i[0]);
            ci.detail = i[1];
            ci.documentation = i[2];
            ci.kind = vscode.CompletionItemKind.Keyword;
            result.push(ci);
        }
        return result;
    }
    MakeCollisionItems() {
        var result = [];
        var items = [
            ["rect", "長方形", ""],
            ["circle", "円形", ""],
            ["ellipse", "楕円形", ""],
            ["polygon", "多角形", ""],
            ["region", "色による領域指定", ""]
        ];
        for (var i of items) {
            var ci = new vscode.CompletionItem(i[0]);
            if (i[0] == "rect") {
                ci.preselect = true;
            }
            ci.detail = i[1];
            ci.documentation = i[2];
            ci.kind = vscode.CompletionItemKind.Keyword;
            result.push(ci);
        }
        return result;
    }
    provideCompletionItems(document, position, token) {
        var result = [];
        var line = document.getText(new vscode.Range(document.lineAt(position.line).range.start, position));
        //それまでの内容で何を書こうとしているか推測する
        if (line.match(/animation[0-9]+\.$/) != null) {
            return this.MakeAnimationItems();
        }
        else if (line.match(/interval,$/) || line.match(/interval,[a-z,0-9]+\+$/)) {
            return this.MakeIntervalItems();
        }
        else if (line.match(/element[0-9]+,$/) || line.match(/pattern[0-9]+,$/)) {
            return this.MakeMergeMethodItems();
        }
        else if (line.match(/option\.$/)) {
            var option_background = new vscode.CompletionItem("background");
            result.push(option_background);
            var option_background = new vscode.CompletionItem("exclusive");
            result.push(option_background);
            return result;
        }
        else if (line.match(/collisionex[0-9]+,[^,]*,$/)) {
            return this.MakeCollisionItems();
        }
        return result;
    }
}
//定義ジャンプ
class SurfacesDefinitionProvider {
    static testSurfaceRange(label, surface_id) {
        var parsed_label = label.replace("surface", "").replace(".append", "");
        var sp = parsed_label.split(',');
        var valid = false;
        for (var i = 0; i < sp.length; i++) {
            var item = sp[i];
            var cancel_mode = false;
            var found = false;
            if (item[0] == '!') {
                //キャンセル部分
                cancel_mode = true;
                item = item.substr(1);
            }
            if (item.indexOf('-') >= 0) {
                //範囲指定
                var range = item.split('-');
                if (range.length == 2) {
                    if (range[0] <= range[1] && Number(range[0]) <= surface_id && Number(range[1]) >= surface_id) {
                        found = true;
                    }
                    else if (Number(range[1]) <= surface_id && Number(range[0]) >= surface_id) {
                        found = true;
                    }
                }
            }
            else {
                //範囲指定なし
                if (Number(item) == surface_id)
                    found = true;
            }
            if (found) {
                //見つかった
                if (cancel_mode) {
                    //除外条件に含まれているなら、必ず無効
                    return false;
                }
                else {
                    valid = true;
                }
            }
        }
        return valid;
    }
    provideDefinition(document, position, token) {
        var word_range = document.getWordRangeAtPosition(position);
        var word = document.getText(word_range);
        var line = document.lineAt(position.line).text;
        var surface_found = false;
        if (line.match(/^\s*animation[0-9]+\.pattern[0-9]+,/)) {
            //start, stop など特殊なモノへの対応
            //var splitItems = line.replace(/\s/, "").split(",");
            //animationのsurface指定を探す
            var splitItems = line.split(',');
            if (splitItems.length == 3) {
                if (splitItems[0].length + splitItems[1].length + 2 <= position.character) {
                    surface_found = true;
                }
            }
            else if (splitItems.length > 3) {
                if (splitItems[0].length + splitItems[1].length + 2 <= position.character &&
                    splitItems[0].length + splitItems[1].length + splitItems[2].length + 3 > position.character) {
                    surface_found = true;
                }
            }
        }
        if (!surface_found) {
            return null;
        }
        var surface_id = Number(word);
        if (surface_id == null) {
            return null;
        }
        //検索
        var resultLocations = [];
        for (var i = 0; i < document.lineCount; i++) {
            var testLine = document.lineAt(i);
            var line = testLine.text;
            if (line.match(/^\s*surface/)) {
                if (SurfacesDefinitionProvider.testSurfaceRange(line, surface_id)) {
                    var loc = new vscode.Location(document.uri, testLine.range);
                    resultLocations.push(loc);
                }
            }
        }
        return resultLocations;
    }
}
//呼び出し階層の表示機能
class SurfaceCallHierarchyProvider {
    prepareCallHierarchy(document, position, token) {
        //今のlineがsurfaces?
        var currentLine = position.line;
        while (currentLine >= 0) {
            var testLine = document.lineAt(currentLine);
            var line = testLine.text;
            if (line.match(/^\s*surface/)) {
                //surfaceブレスを確認
                var result = new vscode.CallHierarchyItem(vscode.SymbolKind.Class, line, "surface definition", document.uri, testLine.range, testLine.range);
                return result;
            }
            currentLine--;
        }
        return [];
    }
    provideCallHierarchyIncomingCalls(item, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const document = yield vscode.workspace.openTextDocument(item.uri);
            if (item.kind == vscode.SymbolKind.Class) {
                //アニメーションパターン列挙
                var currentLine = item.range.start.line;
                var items = [];
                var surfaceSet = new Set();
                while (true) {
                    var testLine = document.lineAt(currentLine);
                    var line = testLine.text;
                    if (line.match(/^\s*animation[0-9]+\.pattern[0-9]+,/)) {
                        //パターンを分離して解析してみる
                        var split_items = line.replace(/\s/, "").split(",");
                        if (split_items.length > 2) {
                            if (!surfaceSet.has(split_items[2])) {
                                surfaceSet.add(split_items[2]);
                                var hItem = new vscode.CallHierarchyItem(vscode.SymbolKind.Method, `${split_items[2]}`, "animation.pattern", item.uri, testLine.range, testLine.range);
                                items.push(new vscode.CallHierarchyIncomingCall(hItem, [testLine.range]));
                            }
                        }
                    }
                    if (line.match("}")) {
                        break;
                    }
                    currentLine++;
                }
                return items;
            }
            else if (item.kind == vscode.SymbolKind.Method) {
                //サーフェス番号を得る
                var surface_id = Number.parseInt(item.name); // Number.parseInt(item.name.substring("surface".length));
                var items = [];
                for (var i = 0; i < document.lineCount; i++) {
                    var testLine = document.lineAt(i);
                    var line = testLine.text;
                    if (line.match(/^\s*surface/)) {
                        if (SurfacesDefinitionProvider.testSurfaceRange(line, surface_id)) {
                            var hItem = new vscode.CallHierarchyItem(vscode.SymbolKind.Class, line, "surface definition", document.uri, testLine.range, testLine.range);
                            items.push(new vscode.CallHierarchyIncomingCall(hItem, [testLine.range]));
                        }
                    }
                }
                return items;
            }
            return [];
        });
    }
    provideCallHierarchyOutgoingCalls(item, token) {
        return __awaiter(this, void 0, void 0, function* () {
            return [];
        });
    }
}
//ドキュメントアウトライン
class SurfaceOutlineProvider {
    provideDocumentSymbols(document, token) {
        const resultItems = [];
        let currentSurface = null;
        let result = "";
        //直前のコメントを取得
        function FetchComment(inputLine) {
            for (let i = inputLine.lineNumber - 1; i >= 0; i--) {
                const line = document.lineAt(i);
                if (line.isEmptyOrWhitespace) {
                    //空行ならパス
                    continue;
                }
                const match = line.text.match(/^\s*\/\/+(.+)/);
                if (match) {
                    const comment = match[1];
                    if (!comment) {
                        //コメントが空ならパス
                        continue;
                    }
                    result = comment;
                    continue;
                }
                //一致しなくなったら終わり（一番上の行を持ってくる）
                return result;
            }
            return "";
        }
        function CurrentSurfaceAnimation(title, line) {
            if (currentSurface) {
                if (title in currentSurface.animations) {
                    const anim = currentSurface.animations[title];
                    anim.range = new vscode.Range(anim.range.start, line.range.end);
                    return anim;
                }
                else {
                    //新規でアニメーションを作成する場合、直前の行がコメントっぽければコメントを一言程度表示する
                    const newAnimation = new vscode.DocumentSymbol(title, FetchComment(line), vscode.SymbolKind.Struct, line.range, line.range);
                    currentSurface.info.children.push(newAnimation);
                    currentSurface.animations[title] = newAnimation;
                    return newAnimation;
                }
            }
            throw new Error('not found');
        }
        //各行を分析していく
        for (let i = 0; i < document.lineCount; i++) {
            if (token.isCancellationRequested) {
                return [];
            }
            const line = document.lineAt(i);
            if (line.text.match(/^\s*surface(.append)?[0-9]+/)) {
                var sym = new vscode.DocumentSymbol(line.text, FetchComment(line), vscode.SymbolKind.Class, line.range, line.range);
                if (currentSurface) {
                    currentSurface.info.range = new vscode.Range(currentSurface.info.range.start, document.lineAt(i - 1).range.end);
                }
                currentSurface = {
                    info: sym,
                    animations: {}
                };
                resultItems.push(currentSurface);
            }
            else if (line.text.match(/^\s*element[0-9]+,/)) {
                if (currentSurface) {
                    var splitItems = line.text.replace(/\s/, "").split(",");
                    if (splitItems.length >= 3) {
                        var sym = new vscode.DocumentSymbol(splitItems[0], splitItems[2], vscode.SymbolKind.File, line.range, line.range);
                        currentSurface.info.children.push(sym);
                    }
                }
            }
            else if (line.text.match(/^\s*animation[0-9]+\.interval,/)) {
                if (currentSurface) {
                    var splitItems = line.text.replace(/\s/, "").split(",");
                    if (splitItems.length >= 1) {
                        var animTitles = splitItems[0].split(".");
                        var sym = new vscode.DocumentSymbol(splitItems[0].substring(animTitles[0].length + 1), splitItems[1], vscode.SymbolKind.Event, line.range, line.range);
                        CurrentSurfaceAnimation(animTitles[0], line).children.push(sym);
                    }
                }
            }
            else if (line.text.match(/^\s*animation[0-9]+\.option,/)) {
                if (currentSurface) {
                    var splitItems = line.text.replace(/\s/, "").split(",");
                    if (splitItems.length >= 1) {
                        var animTitles = splitItems[0].split(".");
                        var sym = new vscode.DocumentSymbol(splitItems[0].substring(animTitles[0].length + 1), splitItems[1], vscode.SymbolKind.Property, line.range, line.range);
                        CurrentSurfaceAnimation(animTitles[0], line).children.push(sym);
                    }
                }
            }
            else if (line.text.match(/^\s*animation[0-9]+\.pattern[0-9]+,/)) {
                if (currentSurface) {
                    var splitItems = line.text.replace(/\s/, "").split(",");
                    if (splitItems.length >= 3) {
                        var animTitles = splitItems[0].split(".");
                        var sym = new vscode.DocumentSymbol(splitItems[0].substring(animTitles[0].length + 1), "surface" + splitItems[2], vscode.SymbolKind.Method, line.range, line.range);
                        CurrentSurfaceAnimation(animTitles[0], line).children.push(sym);
                    }
                }
            }
            else if (line.text.match(/^\s*animation[0-9]+\.collision[0-9]+,/)) {
                if (currentSurface) {
                    var splitItems = line.text.replace(/\s/, "").split(",");
                    if (splitItems.length >= 6) {
                        var animTitles = splitItems[0].split(".");
                        var sym = new vscode.DocumentSymbol(splitItems[0].substring(animTitles[0].length + 1), splitItems[5], vscode.SymbolKind.Variable, line.range, line.range);
                        CurrentSurfaceAnimation(animTitles[0], line).children.push(sym);
                    }
                }
            }
            else if (line.text.match(/^\s*animation[0-9]+\.collisionex[0-9]+,/)) {
                if (currentSurface) {
                    var splitItems = line.text.replace(/\s/, "").split(",");
                    if (splitItems.length >= 2) {
                        var animTitles = splitItems[0].split(".");
                        var sym = new vscode.DocumentSymbol(splitItems[0].substring(animTitles[0].length + 1), splitItems[1], vscode.SymbolKind.Variable, line.range, line.range);
                        CurrentSurfaceAnimation(animTitles[0], line).children.push(sym);
                    }
                }
            }
            else if (line.text.match(/^\s*collision[0-9]+,/)) {
                if (currentSurface) {
                    var splitItems = line.text.replace(/\s/, "").split(",");
                    if (splitItems.length >= 6) {
                        var sym = new vscode.DocumentSymbol(splitItems[0], splitItems[5], vscode.SymbolKind.Variable, line.range, line.range);
                        currentSurface.info.children.push(sym);
                    }
                }
            }
            else if (line.text.match(/^\s*collisionex[0-9]+,/)) {
                if (currentSurface) {
                    var splitItems = line.text.replace(/\s/, "").split(",");
                    if (splitItems.length >= 2) {
                        var sym = new vscode.DocumentSymbol(splitItems[0], splitItems[1], vscode.SymbolKind.Variable, line.range, line.range);
                        currentSurface.info.children.push(sym);
                    }
                }
            }
        }
        return resultItems.map(o => o.info);
    }
}
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    context.subscriptions.push(vscode.languages.registerHoverProvider('surfaces', new SurfacesHoverProvider()));
    context.subscriptions.push(vscode.languages.registerCompletionItemProvider('surfaces', new SurfacesCompletionItemProvider(), ',', '.', '+'));
    context.subscriptions.push(vscode.languages.registerSignatureHelpProvider('surfaces', new SurfacesSignatureHelpProvider(), ","));
    context.subscriptions.push(vscode.languages.registerDefinitionProvider('surfaces', new SurfacesDefinitionProvider()));
    context.subscriptions.push(vscode.languages.registerCallHierarchyProvider('surfaces', new SurfaceCallHierarchyProvider()));
    context.subscriptions.push(vscode.languages.registerDocumentSymbolProvider('surfaces', new SurfaceOutlineProvider()));
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map