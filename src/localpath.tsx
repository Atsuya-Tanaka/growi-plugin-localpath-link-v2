// 読み込み必須
import type { Plugin } from 'unified';
import { visit } from 'unist-util-visit';

// 追加のライブラリ
import classNames from 'classnames';

//cssの読み込み
import './localpath.css'

//useState使う
import React from 'react';

declare const growiFacade: {
  react: typeof React,
};

// 足りないプロパティを追加
interface GrowiNode extends Node {
  node: { [key: string]: string };
  name: string;
  type: string;
  attributes: { [key: string]: string };
  children: GrowiNode[];
  value: string;
  properties: { [key: string]: string };
}

// Reactコンポーネントの定義
export const localPathComponent = (A: React.FunctionComponent<any>): React.FunctionComponent<any> => {
  return ({ children, href, ...props }) => {
    if ('data-lpath' in props) {                  // 'data-lpath'属性を持つものに対して処理
      try {
        const { react } = growiFacade;
        const { useState } = react;
        const [status, setStatus] = useState("yetCopied");
        const statusClassNames = {
          'copyValue': true,
          'copiedTooltip': status === "copied",
        };
        let childrenSub;                              // テキストコンテンツが空の場合、'data-lpath'を代入する
        if (props.node.children.length === 0) {
          childrenSub = props['data-lpath'];
        }
        if ('data-copyoff' in props) {                // 'data-copyoff'属性がある場合、クリックしてもコピーしない
          return (
            <A
              href={"file://" + props['data-lpath']}
            >
              {children || childrenSub}
            </A>
          );
        }
        else {
          return (
            <a                                            // A だとonMouseLeaveが発火しない
              href={"file://" + props['data-lpath']}
              onClick={() => { copyToClipboard(props['data-lpath']); setStatus('copied'); }}
              onMouseLeave={() => setStatus('yetCopied')}
              className={classNames(statusClassNames)}
            >
              {children || childrenSub}
            </a>
          );
        }

      }
      catch {
        return (                                         // エラーが出たら、最低限初期表示にする
          <A
            href
          >
            {children}
          </A>
        );
      }
    }
    else {                                                  // $lpath()以外で生まれた<a>タグにはなにもしない
      return (
        <A
          href={props.node.properties.href}
        >
          {children}
        </A>
      );
    }
  };
};

function copyToClipboard(argStr:string)
{
  if(navigator.clipboard)
    return navigator.clipboard.writeText(argStr);
}
