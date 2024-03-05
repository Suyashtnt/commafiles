// deno-fmt-ignore-file
// deno-lint-ignore-file
// This code was bundled using `deno bundle` and it's not recommended to edit it manually

function escapeRegExp(e) {
    return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function escapeSelector(e) {
    const t = e.length;
    let r = -1;
    let s;
    let n = "";
    const o = e.charCodeAt(0);
    while(++r < t){
        s = e.charCodeAt(r);
        0 !== s ? n += 37 !== s ? 44 !== s ? s >= 1 && s <= 31 || 127 === s || 0 === r && s >= 48 && s <= 57 || 1 === r && s >= 48 && s <= 57 && 45 === o ? `\\${s.toString(16)} ` : (0 !== r || 1 !== t || 45 !== s) && (s >= 128 || 45 === s || 95 === s || s >= 48 && s <= 57 || s >= 65 && s <= 90 || s >= 97 && s <= 122) ? e.charAt(r) : `\\${e.charAt(r)}` : "\\," : "\\%" : n += "�";
    }
    return n;
}
function toArray(e = []) {
    return Array.isArray(e) ? e : [
        e
    ];
}
function isString(e) {
    return "string" === typeof e;
}
function clearIdenticalEntries(e) {
    return e.filter(([t, r], s)=>{
        if (t.startsWith("$$")) return false;
        for(let n = s - 1; n >= 0; n--)if (e[n][0] === t && e[n][1] === r) return false;
        return true;
    });
}
function entriesToCss(e) {
    return null == e ? "" : clearIdenticalEntries(e).map(([e, t])=>null != t ? `${e}:${t};` : void 0).filter(Boolean).join("");
}
const s = /[\w\u00A0-\uFFFF-_:%-?]/;
function isValidSelector(e = "") {
    return s.test(e);
}
Object.defineProperty;
Object.defineProperty;
const c = new Set;
function warnOnce(e) {
    if (!c.has(e)) {
        console.warn("[unocss]", e);
        c.add(e);
    }
}
const l = /[\\:]?[\s'"`;{}]+/g;
function definePreset(e) {
    return e;
}
Object.defineProperty;
const o = /\/\/#\s*sourceMappingURL=.*\n?/g;
function removeSourceMap(r) {
    return r.includes("sourceMappingURL=") ? r.replace(o, "") : r;
}
const s1 = /(?:[\w&:[\]-]|\[\S+=\S+\])+\[\\?['"]?\S+?['"]\]\]?[\w:-]*/g;
const a = /\[(\\\W|[\w-])+:[^\s:]*?("\S+?"|'\S+?'|`\S+?`|[^\s:]+?)[^\s:]*?\)?\]/g;
const e = /^\[(\\\W|[\w-])+:['"]?\S+?['"]?\]$/;
function splitCodeWithArbitraryVariants(o) {
    const n = [];
    for (const r of o.matchAll(a))o[r.index - 1]?.match(/^[\s'"`]/) && n.push(r[0]);
    for (const r of o.matchAll(s1))n.push(r[0]);
    o.split(l).forEach((r)=>{
        isValidSelector(r) && !e.test(r) && n.push(r);
    });
    return n;
}
const n = {
    name: "@unocss/extractor-arbitrary-variants",
    order: 0,
    extract ({ code: r }) {
        return splitCodeWithArbitraryVariants(removeSourceMap(r));
    }
};
function getBracket(t, n, e) {
    if ("" === t) return;
    const r = t.length;
    let o = 0;
    let s = false;
    let c = 0;
    for(let a = 0; a < r; a++)switch(t[a]){
        case n:
            if (!s) {
                s = true;
                c = a;
            }
            o++;
            break;
        case e:
            --o;
            if (o < 0) return;
            if (0 === o) return [
                t.slice(c, a + 1),
                t.slice(a + 1),
                t.slice(0, c)
            ];
            break;
    }
}
function getStringComponent(n, e, r, o) {
    if ("" === n) return;
    isString(o) && (o = [
        o
    ]);
    if (0 === o.length) return;
    const s = n.length;
    let c = 0;
    for(let t = 0; t < s; t++)switch(n[t]){
        case e:
            c++;
            break;
        case r:
            if (--c < 0) return;
            break;
        default:
            for (const e of o){
                const r = e.length;
                if (r && e === n.slice(t, t + r) && 0 === c) {
                    if (0 === t || t === s - r) return;
                    return [
                        n.slice(0, t),
                        n.slice(t + r)
                    ];
                }
            }
    }
    return [
        n,
        ""
    ];
}
function getStringComponents(t, n, e) {
    e = e ?? 10;
    const r = [];
    let o = 0;
    while("" !== t){
        if (++o > e) return;
        const s = getStringComponent(t, "(", ")", n);
        if (!s) return;
        const [c, a] = s;
        r.push(c);
        t = a;
    }
    if (r.length > 0) return r;
}
const e1 = [
    "hsl",
    "hsla",
    "hwb",
    "lab",
    "lch",
    "oklab",
    "oklch",
    "rgb",
    "rgba"
];
const r = [
    "%alpha",
    "<alpha-value>"
];
const o1 = new RegExp(r.map((t)=>escapeRegExp(t)).join("|"));
function parseCssColor(t = "") {
    const n = parseColor(t);
    if (null == n || false === n) return;
    const { type: r, components: o, alpha: s } = n;
    const c = r.toLowerCase();
    return 0 === o.length || [
        "rgba",
        "hsla"
    ].includes(c) && null == s || e1.includes(c) && ![
        1,
        3
    ].includes(o.length) ? void 0 : {
        type: c,
        components: o.map((t)=>"string" === typeof t ? t.trim() : t),
        alpha: "string" === typeof s ? s.trim() : s
    };
}
function colorOpacityToString(t) {
    const n = t.alpha ?? 1;
    return "string" === typeof n && r.includes(n) ? 1 : n;
}
function colorToString(t, n) {
    if ("string" === typeof t) return t.replace(o1, `${n ?? 1}`);
    const { components: r } = t;
    let { alpha: s, type: c } = t;
    s = n ?? s;
    c = c.toLowerCase();
    if ([
        "hsla",
        "hsl",
        "rgba",
        "rgb"
    ].includes(c)) return `${c.replace("a", "")}a(${r.join(",")}${null == s ? "" : `,${s}`})`;
    s = null == s ? "" : ` / ${s}`;
    return e1.includes(c) ? `${c}(${r.join(" ")}${s})` : `color(${c} ${r.join(" ")}${s})`;
}
function parseColor(t) {
    if (!t) return;
    let n = parseHexColor(t);
    if (null != n) return n;
    n = cssColorKeyword(t);
    if (null != n) return n;
    n = parseCssCommaColorFunction(t);
    if (null != n) return n;
    n = parseCssSpaceColorFunction(t);
    if (null != n) return n;
    n = parseCssColorFunction(t);
    return null != n ? n : void 0;
}
function parseHexColor(t) {
    const [, n] = t.match(/^#([\da-f]+)$/i) || [];
    if (n) switch(n.length){
        case 3:
        case 4:
            const t1 = Array.from(n, (t)=>Number.parseInt(t, 16)).map((t)=>t << 4 | t);
            return {
                type: "rgb",
                components: t1.slice(0, 3),
                alpha: 3 === n.length ? void 0 : Math.round(t1[3] / 255 * 100) / 100
            };
        case 6:
        case 8:
            const e = Number.parseInt(n, 16);
            return {
                type: "rgb",
                components: 6 === n.length ? [
                    e >> 16 & 255,
                    e >> 8 & 255,
                    255 & e
                ] : [
                    e >> 24 & 255,
                    e >> 16 & 255,
                    e >> 8 & 255
                ],
                alpha: 6 === n.length ? void 0 : Math.round((255 & e) / 255 * 100) / 100
            };
    }
}
function cssColorKeyword(t) {
    const n = {
        rebeccapurple: [
            102,
            51,
            153,
            1
        ]
    }[t];
    if (null != n) return {
        type: "rgb",
        components: n.slice(0, 3),
        alpha: n[3]
    };
}
function parseCssCommaColorFunction(t) {
    const n = t.match(/^(rgb|rgba|hsl|hsla)\((.+)\)$/i);
    if (!n) return;
    const [, e, r] = n;
    const o = getStringComponents(r, ",", 5);
    if (o) {
        if ([
            3,
            4
        ].includes(o.length)) return {
            type: e,
            components: o.slice(0, 3),
            alpha: o[3]
        };
        if (1 !== o.length) return false;
    }
}
const s2 = new RegExp(`^(${e1.join("|")})\\((.+)\\)$`, "i");
function parseCssSpaceColorFunction(t) {
    const n = t.match(s2);
    if (!n) return;
    const [, e, r] = n;
    const o = parseCssSpaceColorValues(`${e} ${r}`);
    if (o) {
        const { alpha: t, components: [n, ...e] } = o;
        return {
            type: n,
            components: e,
            alpha: t
        };
    }
}
function parseCssColorFunction(t) {
    const n = t.match(/^color\((.+)\)$/);
    if (!n) return;
    const e = parseCssSpaceColorValues(n[1]);
    if (e) {
        const { alpha: t, components: [n, ...r] } = e;
        return {
            type: n,
            components: r,
            alpha: t
        };
    }
}
function parseCssSpaceColorValues(t) {
    const n = getStringComponents(t, " ");
    if (!n) return;
    let e = n.length;
    if ("/" === n[e - 2]) return {
        components: n.slice(0, e - 2),
        alpha: n[e - 1]
    };
    if (null != n[e - 2] && (n[e - 2].endsWith("/") || n[e - 1].startsWith("/"))) {
        const t = n.splice(e - 2);
        n.push(t.join(" "));
        --e;
    }
    const r = getStringComponents(n[e - 1], "/", 2);
    if (!r) return;
    if (1 === r.length || "" === r[r.length - 1]) return {
        components: n
    };
    const o = r.pop();
    n[e - 1] = r.join("/");
    return {
        components: n,
        alpha: o
    };
}
function createValueHandler(t) {
    const handler = function(n) {
        const e = this.__options?.sequence || [];
        this.__options.sequence = [];
        for (const r of e){
            const e = t[r](n);
            if (null != e) return e;
        }
    };
    function addProcessor(t, n) {
        t.__options || (t.__options = {
            sequence: []
        });
        t.__options.sequence.push(n);
        return t;
    }
    for (const n of Object.keys(t))Object.defineProperty(handler, n, {
        enumerable: true,
        get () {
            return addProcessor(this, n);
        }
    });
    return handler;
}
function variantMatcher(t, e) {
    let r;
    return {
        name: t,
        match (o, s) {
            r || (r = new RegExp(`^${escapeRegExp(t)}(?:${s.generator.config.separators.join("|")})`));
            const c = o.match(r);
            if (c) return {
                matcher: o.slice(c[0].length),
                handle: (t, n)=>n({
                        ...t,
                        ...e(t)
                    })
            };
        },
        autocomplete: `${t}:`
    };
}
function variantParentMatcher(t, e) {
    let r;
    return {
        name: t,
        match (o, s) {
            r || (r = new RegExp(`^${escapeRegExp(t)}(?:${s.generator.config.separators.join("|")})`));
            const c = o.match(r);
            if (c) return {
                matcher: o.slice(c[0].length),
                handle: (t, n)=>n({
                        ...t,
                        parent: `${t.parent ? `${t.parent} $$ ` : ""}${e}`
                    })
            };
        },
        autocomplete: `${t}:`
    };
}
function variantGetBracket(t, n, e) {
    if (n.startsWith(`${t}[`)) {
        const [r, o] = getBracket(n.slice(t.length), "[", "]") ?? [];
        if (r && o) {
            for (const t of e)if (o.startsWith(t)) return [
                r,
                o.slice(t.length),
                t
            ];
            return [
                r,
                o,
                ""
            ];
        }
    }
}
function variantGetParameter(t, n, e) {
    if (n.startsWith(t)) {
        const r = variantGetBracket(t, n, e);
        if (r) {
            const [t = "", n = r[1]] = variantGetParameter("/", r[1], e) ?? [];
            return [
                r[0],
                n,
                t
            ];
        }
        for (const r of e.filter((t)=>"/" !== t)){
            const e = n.indexOf(r, t.length);
            if (-1 !== e) {
                const o = n.indexOf("/", t.length);
                const s = -1 === o || e <= o;
                return [
                    n.slice(t.length, s ? e : o),
                    n.slice(e + r.length),
                    s ? "" : n.slice(o + 1, e)
                ];
            }
        }
    }
}
const a1 = {
    l: [
        "-left"
    ],
    r: [
        "-right"
    ],
    t: [
        "-top"
    ],
    b: [
        "-bottom"
    ],
    s: [
        "-inline-start"
    ],
    e: [
        "-inline-end"
    ],
    x: [
        "-left",
        "-right"
    ],
    y: [
        "-top",
        "-bottom"
    ],
    "": [
        ""
    ],
    bs: [
        "-block-start"
    ],
    be: [
        "-block-end"
    ],
    is: [
        "-inline-start"
    ],
    ie: [
        "-inline-end"
    ],
    block: [
        "-block-start",
        "-block-end"
    ],
    inline: [
        "-inline-start",
        "-inline-end"
    ]
};
const c1 = {
    ...a1,
    s: [
        "-inset-inline-start"
    ],
    start: [
        "-inset-inline-start"
    ],
    e: [
        "-inset-inline-end"
    ],
    end: [
        "-inset-inline-end"
    ],
    bs: [
        "-inset-block-start"
    ],
    be: [
        "-inset-block-end"
    ],
    is: [
        "-inset-inline-start"
    ],
    ie: [
        "-inset-inline-end"
    ],
    block: [
        "-inset-block-start",
        "-inset-block-end"
    ],
    inline: [
        "-inset-inline-start",
        "-inset-inline-end"
    ]
};
const l1 = {
    l: [
        "-top-left",
        "-bottom-left"
    ],
    r: [
        "-top-right",
        "-bottom-right"
    ],
    t: [
        "-top-left",
        "-top-right"
    ],
    b: [
        "-bottom-left",
        "-bottom-right"
    ],
    tl: [
        "-top-left"
    ],
    lt: [
        "-top-left"
    ],
    tr: [
        "-top-right"
    ],
    rt: [
        "-top-right"
    ],
    bl: [
        "-bottom-left"
    ],
    lb: [
        "-bottom-left"
    ],
    br: [
        "-bottom-right"
    ],
    rb: [
        "-bottom-right"
    ],
    "": [
        ""
    ],
    bs: [
        "-start-start",
        "-start-end"
    ],
    be: [
        "-end-start",
        "-end-end"
    ],
    s: [
        "-end-start",
        "-start-start"
    ],
    is: [
        "-end-start",
        "-start-start"
    ],
    e: [
        "-start-end",
        "-end-end"
    ],
    ie: [
        "-start-end",
        "-end-end"
    ],
    ss: [
        "-start-start"
    ],
    "bs-is": [
        "-start-start"
    ],
    "is-bs": [
        "-start-start"
    ],
    se: [
        "-start-end"
    ],
    "bs-ie": [
        "-start-end"
    ],
    "ie-bs": [
        "-start-end"
    ],
    es: [
        "-end-start"
    ],
    "be-is": [
        "-end-start"
    ],
    "is-be": [
        "-end-start"
    ],
    ee: [
        "-end-end"
    ],
    "be-ie": [
        "-end-end"
    ],
    "ie-be": [
        "-end-end"
    ]
};
const u = {
    x: [
        "-x"
    ],
    y: [
        "-y"
    ],
    z: [
        "-z"
    ],
    "": [
        "-x",
        "-y"
    ]
};
const p = [
    "top",
    "top center",
    "top left",
    "top right",
    "bottom",
    "bottom center",
    "bottom left",
    "bottom right",
    "left",
    "left center",
    "left top",
    "left bottom",
    "right",
    "right center",
    "right top",
    "right bottom",
    "center",
    "center top",
    "center bottom",
    "center left",
    "center right",
    "center center"
];
const f = Object.assign({}, ...p.map((t)=>({
        [t.replace(/ /, "-")]: t
    })), ...p.map((t)=>({
        [t.replace(/\b(\w)\w+/g, "$1").replace(/ /, "")]: t
    })));
const b = [
    "inherit",
    "initial",
    "revert",
    "revert-layer",
    "unset"
];
const d = /^(-?\d*(?:\.\d+)?)(px|pt|pc|%|r?(?:em|ex|lh|cap|ch|ic)|(?:[sld]?v|cq)(?:[whib]|min|max)|in|cm|mm|rpx)?$/i;
const m = /^(-?\d*(?:\.\d+)?)$/i;
const h = /^(px)$/i;
const g = [
    "color",
    "border-color",
    "background-color",
    "flex-grow",
    "flex",
    "flex-shrink",
    "caret-color",
    "font",
    "gap",
    "opacity",
    "visibility",
    "z-index",
    "font-weight",
    "zoom",
    "text-shadow",
    "transform",
    "box-shadow",
    "background-position",
    "left",
    "right",
    "top",
    "bottom",
    "object-position",
    "max-height",
    "min-height",
    "max-width",
    "min-width",
    "height",
    "width",
    "border-width",
    "margin",
    "padding",
    "outline-width",
    "outline-offset",
    "font-size",
    "line-height",
    "text-indent",
    "vertical-align",
    "border-spacing",
    "letter-spacing",
    "word-spacing",
    "stroke",
    "filter",
    "backdrop-filter",
    "fill",
    "mask",
    "mask-size",
    "mask-border",
    "clip-path",
    "clip",
    "border-radius"
];
function round(t) {
    return t.toFixed(10).replace(/\.0+$/, "").replace(/(\.\d+?)0+$/, "$1");
}
function numberWithUnit(t) {
    const e = t.match(d);
    if (!e) return;
    const [, r, n] = e;
    const o = Number.parseFloat(r);
    return n && !Number.isNaN(o) ? `${round(o)}${n}` : void 0;
}
function auto(t) {
    if ("auto" === t || "a" === t) return "auto";
}
function rem(t) {
    if (t.match(h)) return `1${t}`;
    const e = t.match(d);
    if (!e) return;
    const [, r, n] = e;
    const o = Number.parseFloat(r);
    return Number.isNaN(o) ? void 0 : 0 === o ? "0" : n ? `${round(o)}${n}` : `${round(o / 4)}rem`;
}
function px(t) {
    if (t.match(h)) return `1${t}`;
    const e = t.match(d);
    if (!e) return;
    const [, r, n] = e;
    const o = Number.parseFloat(r);
    return Number.isNaN(o) ? void 0 : 0 === o ? "0" : n ? `${round(o)}${n}` : `${round(o)}px`;
}
function number(t) {
    if (!m.test(t)) return;
    const e = Number.parseFloat(t);
    return Number.isNaN(e) ? void 0 : round(e);
}
function percent(t) {
    t.endsWith("%") && (t = t.slice(0, -1));
    if (!m.test(t)) return;
    const e = Number.parseFloat(t);
    return Number.isNaN(e) ? void 0 : `${round(e / 100)}`;
}
function fraction(t) {
    if ("full" === t) return "100%";
    const [e, r] = t.split("/");
    const n = Number.parseFloat(e) / Number.parseFloat(r);
    return Number.isNaN(n) ? void 0 : 0 === n ? "0" : `${round(100 * n)}%`;
}
const $ = /^\[(color|length|position|quoted|string):/i;
function bracketWithType(t, e) {
    if (t && t.startsWith("[") && t.endsWith("]")) {
        let r;
        let n;
        const o = t.match($);
        if (o) {
            e || (n = o[1]);
            r = t.slice(o[0].length, -1);
        } else r = t.slice(1, -1);
        if (!r) return;
        if ('=""' === r) return;
        r.startsWith("--") && (r = `var(${r})`);
        let i = 0;
        for (const t of r)if ("[" === t) i += 1;
        else if ("]" === t) {
            i -= 1;
            if (i < 0) return;
        }
        if (i) return;
        switch(n){
            case "string":
                return r.replace(/(^|[^\\])_/g, "$1 ").replace(/\\_/g, "_");
            case "quoted":
                return r.replace(/(^|[^\\])_/g, "$1 ").replace(/\\_/g, "_").replace(/(["\\])/g, "\\$1").replace(/^(.+)$/, '"$1"');
        }
        return r.replace(/(url\(.*?\))/g, (t)=>t.replace(/_/g, "\\_")).replace(/(^|[^\\])_/g, "$1 ").replace(/\\_/g, "_").replace(/(?:calc|clamp|max|min)\((.*)/g, (t)=>{
            const e = [];
            return t.replace(/var\((--.+?)[,)]/g, (t, r)=>{
                e.push(r);
                return t.replace(r, "--un-calc");
            }).replace(/(-?\d*\.?\d(?!\b-\d.+[,)](?![^+\-/*])\D)(?:%|[a-z]+)?|\))([+\-/*])/g, "$1 $2 ").replace(/--un-calc/g, ()=>e.shift());
        });
    }
}
function bracket(t) {
    return bracketWithType(t);
}
function bracketOfColor(t) {
    return bracketWithType(t, "color");
}
function bracketOfLength(t) {
    return bracketWithType(t, "length");
}
function bracketOfPosition(t) {
    return bracketWithType(t, "position");
}
function cssvar(t) {
    if (t.match(/^\$[^\s'"`;{}]/)) return `var(--${escapeSelector(t.slice(1))})`;
}
function time(t) {
    const e = t.match(/^(-?[0-9.]+)(s|ms)?$/i);
    if (!e) return;
    const [, r, n] = e;
    const o = Number.parseFloat(r);
    return Number.isNaN(o) ? void 0 : 0 !== o || n ? n ? `${round(o)}${n}` : `${round(o)}ms` : "0s";
}
function degree(t) {
    const e = t.match(/^(-?[0-9.]+)(deg|rad|grad|turn)?$/i);
    if (!e) return;
    const [, r, n] = e;
    const o = Number.parseFloat(r);
    return Number.isNaN(o) ? void 0 : 0 === o ? "0" : n ? `${round(o)}${n}` : `${round(o)}deg`;
}
function global(t) {
    if (b.includes(t)) return t;
}
function properties(t) {
    if (t.split(",").every((t)=>g.includes(t))) return t;
}
function position(t) {
    if ([
        "top",
        "left",
        "right",
        "bottom",
        "center"
    ].includes(t)) return t;
}
const k = {
    __proto__: null,
    auto: auto,
    bracket: bracket,
    bracketOfColor: bracketOfColor,
    bracketOfLength: bracketOfLength,
    bracketOfPosition: bracketOfPosition,
    cssvar: cssvar,
    degree: degree,
    fraction: fraction,
    global: global,
    number: number,
    numberWithUnit: numberWithUnit,
    percent: percent,
    position: position,
    properties: properties,
    px: px,
    rem: rem,
    time: time
};
const v = createValueHandler(k);
const N = v;
const x = "$$mini-no-negative";
function directionSize(t) {
    return ([e, r, n], { theme: o })=>{
        const i = o.spacing?.[n || "DEFAULT"] ?? N.bracket.cssvar.global.auto.fraction.rem(n);
        if (null != i) return a1[r].map((e)=>[
                `${t}${e}`,
                i
            ]);
    };
}
function getThemeColor(t, e) {
    let r = t.colors;
    let n = -1;
    for (const t of e){
        n += 1;
        if (r && "string" !== typeof r) {
            const o = e.slice(n).join("-").replace(/(-[a-z])/g, (t)=>t.slice(1).toUpperCase());
            if (r[o]) return r[o];
            if (r[t]) {
                r = r[t];
                continue;
            }
        }
        return;
    }
    return r;
}
function splitShorthand(t, e) {
    const r = t.split(/(?:\/|:)/);
    return r[0] === `[${e}` ? [
        r.slice(0, 2).join(":"),
        r[2]
    ] : r;
}
function parseColor1(t, r) {
    const [n, o] = splitShorthand(t, "color");
    const i = n.replace(/([a-z])([0-9])/g, "$1-$2").split(/-/g);
    const [s] = i;
    if (!s) return;
    let a;
    const c = N.bracketOfColor(n);
    const l = c || n;
    if (N.numberWithUnit(l)) return;
    l.match(/^#[\da-fA-F]+/g) ? a = l : l.match(/^hex-[\da-fA-F]+/g) ? a = `#${l.slice(4)}` : n.startsWith("$") && (a = N.cssvar(n));
    a = a || c;
    if (!a) {
        const t = getThemeColor(r, [
            n
        ]);
        "string" === typeof t && (a = t);
    }
    let u = "DEFAULT";
    if (!a) {
        let t;
        const [e] = i.slice(-1);
        if (e.match(/^\d+$/)) {
            u = e;
            t = getThemeColor(r, i.slice(0, -1));
            a = t && "string" !== typeof t ? t[u] : void 0;
        } else {
            t = getThemeColor(r, i);
            if (!t && i.length <= 2) {
                [, u = u] = i;
                t = getThemeColor(r, [
                    s
                ]);
            }
            "string" === typeof t ? a = t : u && t && (a = t[u]);
        }
    }
    return {
        opacity: o,
        name: s,
        no: u,
        color: a,
        cssColor: parseCssColor(a),
        alpha: N.bracket.cssvar.percent(o ?? "")
    };
}
function colorResolver(t, e, o) {
    return ([, i], { theme: s })=>{
        const a = parseColor1(i, s);
        if (!a) return;
        const { alpha: c, color: l, cssColor: u } = a;
        const p = {};
        if (u) if (null != c) p[t] = colorToString(u, c);
        else {
            p[`--un-${e}-opacity`] = colorOpacityToString(u);
            p[t] = colorToString(u, `var(--un-${e}-opacity)`);
        }
        else l && (p[t] = colorToString(l, c));
        return false !== o?.(p) ? p : void 0;
    };
}
function colorableShadows(t, n) {
    const i = [];
    t = toArray(t);
    for(let s = 0; s < t.length; s++){
        const a = getStringComponents(t[s], " ", 6);
        if (!a || a.length < 3) return t;
        const c = parseCssColor(a.pop());
        if (null == c) return t;
        i.push(`${a.join(" ")} var(${n}, ${colorToString(c)})`);
    }
    return i;
}
function hasParseableColor(t, e) {
    return null != t && !!parseColor1(t, e)?.color;
}
function resolveBreakpoints({ theme: t, generator: e }) {
    let r;
    e.userConfig && e.userConfig.theme && (r = e.userConfig.theme.breakpoints);
    r || (r = t.breakpoints);
    return r;
}
function resolveVerticalBreakpoints({ theme: t, generator: e }) {
    let r;
    e.userConfig && e.userConfig.theme && (r = e.userConfig.theme.verticalBreakpoints);
    r || (r = t.verticalBreakpoints);
    return r;
}
function makeGlobalStaticRules(t, e) {
    return b.map((r)=>[
            `${t}-${r}`,
            {
                [e ?? t]: r
            }
        ]);
}
const f1 = {
    inherit: "inherit",
    current: "currentColor",
    transparent: "transparent",
    black: "#000",
    white: "#fff",
    rose: {
        50: "#fff1f2",
        100: "#ffe4e6",
        200: "#fecdd3",
        300: "#fda4af",
        400: "#fb7185",
        500: "#f43f5e",
        600: "#e11d48",
        700: "#be123c",
        800: "#9f1239",
        900: "#881337",
        950: "#4c0519"
    },
    pink: {
        50: "#fdf2f8",
        100: "#fce7f3",
        200: "#fbcfe8",
        300: "#f9a8d4",
        400: "#f472b6",
        500: "#ec4899",
        600: "#db2777",
        700: "#be185d",
        800: "#9d174d",
        900: "#831843",
        950: "#500724"
    },
    fuchsia: {
        50: "#fdf4ff",
        100: "#fae8ff",
        200: "#f5d0fe",
        300: "#f0abfc",
        400: "#e879f9",
        500: "#d946ef",
        600: "#c026d3",
        700: "#a21caf",
        800: "#86198f",
        900: "#701a75",
        950: "#4a044e"
    },
    purple: {
        50: "#faf5ff",
        100: "#f3e8ff",
        200: "#e9d5ff",
        300: "#d8b4fe",
        400: "#c084fc",
        500: "#a855f7",
        600: "#9333ea",
        700: "#7e22ce",
        800: "#6b21a8",
        900: "#581c87",
        950: "#3b0764"
    },
    violet: {
        50: "#f5f3ff",
        100: "#ede9fe",
        200: "#ddd6fe",
        300: "#c4b5fd",
        400: "#a78bfa",
        500: "#8b5cf6",
        600: "#7c3aed",
        700: "#6d28d9",
        800: "#5b21b6",
        900: "#4c1d95",
        950: "#2e1065"
    },
    indigo: {
        50: "#eef2ff",
        100: "#e0e7ff",
        200: "#c7d2fe",
        300: "#a5b4fc",
        400: "#818cf8",
        500: "#6366f1",
        600: "#4f46e5",
        700: "#4338ca",
        800: "#3730a3",
        900: "#312e81",
        950: "#1e1b4b"
    },
    blue: {
        50: "#eff6ff",
        100: "#dbeafe",
        200: "#bfdbfe",
        300: "#93c5fd",
        400: "#60a5fa",
        500: "#3b82f6",
        600: "#2563eb",
        700: "#1d4ed8",
        800: "#1e40af",
        900: "#1e3a8a",
        950: "#172554"
    },
    sky: {
        50: "#f0f9ff",
        100: "#e0f2fe",
        200: "#bae6fd",
        300: "#7dd3fc",
        400: "#38bdf8",
        500: "#0ea5e9",
        600: "#0284c7",
        700: "#0369a1",
        800: "#075985",
        900: "#0c4a6e",
        950: "#082f49"
    },
    cyan: {
        50: "#ecfeff",
        100: "#cffafe",
        200: "#a5f3fc",
        300: "#67e8f9",
        400: "#22d3ee",
        500: "#06b6d4",
        600: "#0891b2",
        700: "#0e7490",
        800: "#155e75",
        900: "#164e63",
        950: "#083344"
    },
    teal: {
        50: "#f0fdfa",
        100: "#ccfbf1",
        200: "#99f6e4",
        300: "#5eead4",
        400: "#2dd4bf",
        500: "#14b8a6",
        600: "#0d9488",
        700: "#0f766e",
        800: "#115e59",
        900: "#134e4a",
        950: "#042f2e"
    },
    emerald: {
        50: "#ecfdf5",
        100: "#d1fae5",
        200: "#a7f3d0",
        300: "#6ee7b7",
        400: "#34d399",
        500: "#10b981",
        600: "#059669",
        700: "#047857",
        800: "#065f46",
        900: "#064e3b",
        950: "#022c22"
    },
    green: {
        50: "#f0fdf4",
        100: "#dcfce7",
        200: "#bbf7d0",
        300: "#86efac",
        400: "#4ade80",
        500: "#22c55e",
        600: "#16a34a",
        700: "#15803d",
        800: "#166534",
        900: "#14532d",
        950: "#052e16"
    },
    lime: {
        50: "#f7fee7",
        100: "#ecfccb",
        200: "#d9f99d",
        300: "#bef264",
        400: "#a3e635",
        500: "#84cc16",
        600: "#65a30d",
        700: "#4d7c0f",
        800: "#3f6212",
        900: "#365314",
        950: "#1a2e05"
    },
    yellow: {
        50: "#fefce8",
        100: "#fef9c3",
        200: "#fef08a",
        300: "#fde047",
        400: "#facc15",
        500: "#eab308",
        600: "#ca8a04",
        700: "#a16207",
        800: "#854d0e",
        900: "#713f12",
        950: "#422006"
    },
    amber: {
        50: "#fffbeb",
        100: "#fef3c7",
        200: "#fde68a",
        300: "#fcd34d",
        400: "#fbbf24",
        500: "#f59e0b",
        600: "#d97706",
        700: "#b45309",
        800: "#92400e",
        900: "#78350f",
        950: "#451a03"
    },
    orange: {
        50: "#fff7ed",
        100: "#ffedd5",
        200: "#fed7aa",
        300: "#fdba74",
        400: "#fb923c",
        500: "#f97316",
        600: "#ea580c",
        700: "#c2410c",
        800: "#9a3412",
        900: "#7c2d12",
        950: "#431407"
    },
    red: {
        50: "#fef2f2",
        100: "#fee2e2",
        200: "#fecaca",
        300: "#fca5a5",
        400: "#f87171",
        500: "#ef4444",
        600: "#dc2626",
        700: "#b91c1c",
        800: "#991b1b",
        900: "#7f1d1d",
        950: "#450a0a"
    },
    gray: {
        50: "#f9fafb",
        100: "#f3f4f6",
        200: "#e5e7eb",
        300: "#d1d5db",
        400: "#9ca3af",
        500: "#6b7280",
        600: "#4b5563",
        700: "#374151",
        800: "#1f2937",
        900: "#111827",
        950: "#030712"
    },
    slate: {
        50: "#f8fafc",
        100: "#f1f5f9",
        200: "#e2e8f0",
        300: "#cbd5e1",
        400: "#94a3b8",
        500: "#64748b",
        600: "#475569",
        700: "#334155",
        800: "#1e293b",
        900: "#0f172a",
        950: "#020617"
    },
    zinc: {
        50: "#fafafa",
        100: "#f4f4f5",
        200: "#e4e4e7",
        300: "#d4d4d8",
        400: "#a1a1aa",
        500: "#71717a",
        600: "#52525b",
        700: "#3f3f46",
        800: "#27272a",
        900: "#18181b",
        950: "#09090b"
    },
    neutral: {
        50: "#fafafa",
        100: "#f5f5f5",
        200: "#e5e5e5",
        300: "#d4d4d4",
        400: "#a3a3a3",
        500: "#737373",
        600: "#525252",
        700: "#404040",
        800: "#262626",
        900: "#171717",
        950: "#0a0a0a"
    },
    stone: {
        50: "#fafaf9",
        100: "#f5f5f4",
        200: "#e7e5e4",
        300: "#d6d3d1",
        400: "#a8a29e",
        500: "#78716c",
        600: "#57534e",
        700: "#44403c",
        800: "#292524",
        900: "#1c1917",
        950: "#0c0a09"
    },
    light: {
        50: "#fdfdfd",
        100: "#fcfcfc",
        200: "#fafafa",
        300: "#f8f9fa",
        400: "#f6f6f6",
        500: "#f2f2f2",
        600: "#f1f3f5",
        700: "#e9ecef",
        800: "#dee2e6",
        900: "#dde1e3",
        950: "#d8dcdf"
    },
    dark: {
        50: "#4a4a4a",
        100: "#3c3c3c",
        200: "#323232",
        300: "#2d2d2d",
        400: "#222222",
        500: "#1f1f1f",
        600: "#1c1c1e",
        700: "#1b1b1b",
        800: "#181818",
        900: "#0f0f0f",
        950: "#080808"
    },
    get lightblue () {
        return this.sky;
    },
    get lightBlue () {
        return this.sky;
    },
    get warmgray () {
        return this.stone;
    },
    get warmGray () {
        return this.stone;
    },
    get truegray () {
        return this.neutral;
    },
    get trueGray () {
        return this.neutral;
    },
    get coolgray () {
        return this.gray;
    },
    get coolGray () {
        return this.gray;
    },
    get bluegray () {
        return this.slate;
    },
    get blueGray () {
        return this.slate;
    }
};
Object.values(f1).forEach((f)=>{
    if ("string" !== typeof f && void 0 !== f) {
        f.DEFAULT = f.DEFAULT || f[400];
        Object.keys(f).forEach((e)=>{
            const a = +e / 100;
            a === Math.round(a) && (f[a] = f[e]);
        });
    }
});
const l2 = [
    "auto",
    "default",
    "none",
    "context-menu",
    "help",
    "pointer",
    "progress",
    "wait",
    "cell",
    "crosshair",
    "text",
    "vertical-text",
    "alias",
    "copy",
    "move",
    "no-drop",
    "not-allowed",
    "grab",
    "grabbing",
    "all-scroll",
    "col-resize",
    "row-resize",
    "n-resize",
    "e-resize",
    "s-resize",
    "w-resize",
    "ne-resize",
    "nw-resize",
    "se-resize",
    "sw-resize",
    "ew-resize",
    "ns-resize",
    "nesw-resize",
    "nwse-resize",
    "zoom-in",
    "zoom-out"
];
const c2 = [
    "none",
    "strict",
    "content",
    "size",
    "inline-size",
    "layout",
    "style",
    "paint"
];
const u1 = " ";
const f2 = [
    [
        "inline",
        {
            display: "inline"
        }
    ],
    [
        "block",
        {
            display: "block"
        }
    ],
    [
        "inline-block",
        {
            display: "inline-block"
        }
    ],
    [
        "contents",
        {
            display: "contents"
        }
    ],
    [
        "flow-root",
        {
            display: "flow-root"
        }
    ],
    [
        "list-item",
        {
            display: "list-item"
        }
    ],
    [
        "hidden",
        {
            display: "none"
        }
    ],
    [
        /^display-(.+)$/,
        ([, t])=>({
                display: N.bracket.cssvar.global(t) || t
            })
    ]
];
const p1 = [
    [
        "visible",
        {
            visibility: "visible"
        }
    ],
    [
        "invisible",
        {
            visibility: "hidden"
        }
    ],
    [
        "backface-visible",
        {
            "backface-visibility": "visible"
        }
    ],
    [
        "backface-hidden",
        {
            "backface-visibility": "hidden"
        }
    ],
    ...makeGlobalStaticRules("backface", "backface-visibility")
];
const w = [
    [
        /^cursor-(.+)$/,
        ([, t])=>({
                cursor: N.bracket.cssvar.global(t)
            })
    ],
    ...l2.map((e)=>[
            `cursor-${e}`,
            {
                cursor: e
            }
        ])
];
const d1 = [
    [
        /^contain-(.*)$/,
        ([, t])=>null != N.bracket(t) ? {
                contain: N.bracket(t).split(" ").map((t)=>N.cssvar.fraction(t) ?? t).join(" ")
            } : c2.includes(t) ? {
                contain: t
            } : void 0
    ]
];
const v1 = [
    [
        "pointer-events-auto",
        {
            "pointer-events": "auto"
        }
    ],
    [
        "pointer-events-none",
        {
            "pointer-events": "none"
        }
    ],
    ...makeGlobalStaticRules("pointer-events")
];
const b1 = [
    [
        "resize-x",
        {
            resize: "horizontal"
        }
    ],
    [
        "resize-y",
        {
            resize: "vertical"
        }
    ],
    [
        "resize",
        {
            resize: "both"
        }
    ],
    [
        "resize-none",
        {
            resize: "none"
        }
    ],
    ...makeGlobalStaticRules("resize")
];
const m1 = [
    [
        "select-auto",
        {
            "-webkit-user-select": "auto",
            "user-select": "auto"
        }
    ],
    [
        "select-all",
        {
            "-webkit-user-select": "all",
            "user-select": "all"
        }
    ],
    [
        "select-text",
        {
            "-webkit-user-select": "text",
            "user-select": "text"
        }
    ],
    [
        "select-none",
        {
            "-webkit-user-select": "none",
            "user-select": "none"
        }
    ],
    ...makeGlobalStaticRules("select", "user-select")
];
const h1 = [
    [
        /^(?:whitespace-|ws-)([-\w]+)$/,
        ([, e])=>[
                "normal",
                "nowrap",
                "pre",
                "pre-line",
                "pre-wrap",
                "break-spaces",
                ...b
            ].includes(e) ? {
                "white-space": e
            } : void 0,
        {
            autocomplete: "(whitespace|ws)-(normal|nowrap|pre|pre-line|pre-wrap|break-spaces)"
        }
    ]
];
const g1 = [
    [
        /^intrinsic-size-(.+)$/,
        ([, t])=>({
                "contain-intrinsic-size": N.bracket.cssvar.global.fraction.rem(t)
            }),
        {
            autocomplete: "intrinsic-size-<num>"
        }
    ],
    [
        "content-visibility-visible",
        {
            "content-visibility": "visible"
        }
    ],
    [
        "content-visibility-hidden",
        {
            "content-visibility": "hidden"
        }
    ],
    [
        "content-visibility-auto",
        {
            "content-visibility": "auto"
        }
    ],
    ...makeGlobalStaticRules("content-visibility")
];
const k1 = [
    [
        /^content-(.+)$/,
        ([, t])=>({
                content: N.bracket.cssvar(t)
            })
    ],
    [
        "content-empty",
        {
            content: '""'
        }
    ],
    [
        "content-none",
        {
            content: "none"
        }
    ]
];
const y = [
    [
        "break-normal",
        {
            "overflow-wrap": "normal",
            "word-break": "normal"
        }
    ],
    [
        "break-words",
        {
            "overflow-wrap": "break-word"
        }
    ],
    [
        "break-all",
        {
            "word-break": "break-all"
        }
    ],
    [
        "break-keep",
        {
            "word-break": "keep-all"
        }
    ],
    [
        "break-anywhere",
        {
            "overflow-wrap": "anywhere"
        }
    ]
];
const x1 = [
    [
        "text-wrap",
        {
            "text-wrap": "wrap"
        }
    ],
    [
        "text-nowrap",
        {
            "text-wrap": "nowrap"
        }
    ],
    [
        "text-balance",
        {
            "text-wrap": "balance"
        }
    ]
];
const z = [
    [
        "truncate",
        {
            overflow: "hidden",
            "text-overflow": "ellipsis",
            "white-space": "nowrap"
        }
    ],
    [
        "text-truncate",
        {
            overflow: "hidden",
            "text-overflow": "ellipsis",
            "white-space": "nowrap"
        }
    ],
    [
        "text-ellipsis",
        {
            "text-overflow": "ellipsis"
        }
    ],
    [
        "text-clip",
        {
            "text-overflow": "clip"
        }
    ]
];
const $1 = [
    [
        "case-upper",
        {
            "text-transform": "uppercase"
        }
    ],
    [
        "case-lower",
        {
            "text-transform": "lowercase"
        }
    ],
    [
        "case-capital",
        {
            "text-transform": "capitalize"
        }
    ],
    [
        "case-normal",
        {
            "text-transform": "none"
        }
    ],
    ...makeGlobalStaticRules("case", "text-transform")
];
const j = [
    [
        "italic",
        {
            "font-style": "italic"
        }
    ],
    [
        "not-italic",
        {
            "font-style": "normal"
        }
    ],
    [
        "font-italic",
        {
            "font-style": "italic"
        }
    ],
    [
        "font-not-italic",
        {
            "font-style": "normal"
        }
    ],
    [
        "oblique",
        {
            "font-style": "oblique"
        }
    ],
    [
        "not-oblique",
        {
            "font-style": "normal"
        }
    ],
    [
        "font-oblique",
        {
            "font-style": "oblique"
        }
    ],
    [
        "font-not-oblique",
        {
            "font-style": "normal"
        }
    ]
];
const S = [
    [
        "antialiased",
        {
            "-webkit-font-smoothing": "antialiased",
            "-moz-osx-font-smoothing": "grayscale"
        }
    ],
    [
        "subpixel-antialiased",
        {
            "-webkit-font-smoothing": "auto",
            "-moz-osx-font-smoothing": "auto"
        }
    ]
];
const q = {
    "--un-ring-inset": u1,
    "--un-ring-offset-width": "0px",
    "--un-ring-offset-color": "#fff",
    "--un-ring-width": "0px",
    "--un-ring-color": "rgba(147,197,253,0.5)",
    "--un-shadow": "0 0 rgba(0,0,0,0)"
};
const W = [
    [
        /^ring(?:-(.+))?$/,
        ([, t], { theme: n })=>{
            const a = n.ringWidth?.[t || "DEFAULT"] ?? N.px(t || "1");
            if (a) return {
                "--un-ring-width": a,
                "--un-ring-offset-shadow": "var(--un-ring-inset) 0 0 0 var(--un-ring-offset-width) var(--un-ring-offset-color)",
                "--un-ring-shadow": "var(--un-ring-inset) 0 0 0 calc(var(--un-ring-width) + var(--un-ring-offset-width)) var(--un-ring-color)",
                "box-shadow": "var(--un-ring-offset-shadow), var(--un-ring-shadow), var(--un-shadow)"
            };
        },
        {
            autocomplete: "ring-$ringWidth"
        }
    ],
    [
        /^ring-(?:width-|size-)(.+)$/,
        ([, t], { theme: n })=>({
                "--un-ring-width": n.lineWidth?.[t] ?? N.bracket.cssvar.px(t)
            }),
        {
            autocomplete: "ring-(width|size)-$lineWidth"
        }
    ],
    [
        "ring-offset",
        {
            "--un-ring-offset-width": "1px"
        }
    ],
    [
        /^ring-offset-(?:width-|size-)?(.+)$/,
        ([, t], { theme: n })=>({
                "--un-ring-offset-width": n.lineWidth?.[t] ?? N.bracket.cssvar.px(t)
            }),
        {
            autocomplete: "ring-offset-(width|size)-$lineWidth"
        }
    ],
    [
        /^ring-(.+)$/,
        colorResolver("--un-ring-color", "ring"),
        {
            autocomplete: "ring-$colors"
        }
    ],
    [
        /^ring-op(?:acity)?-?(.+)$/,
        ([, t])=>({
                "--un-ring-opacity": N.bracket.percent.cssvar(t)
            }),
        {
            autocomplete: "ring-(op|opacity)-<percent>"
        }
    ],
    [
        /^ring-offset-(.+)$/,
        colorResolver("--un-ring-offset-color", "ring-offset"),
        {
            autocomplete: "ring-offset-$colors"
        }
    ],
    [
        /^ring-offset-op(?:acity)?-?(.+)$/,
        ([, t])=>({
                "--un-ring-offset-opacity": N.bracket.percent.cssvar(t)
            }),
        {
            autocomplete: "ring-offset-(op|opacity)-<percent>"
        }
    ],
    [
        "ring-inset",
        {
            "--un-ring-inset": "inset"
        }
    ]
];
const X = {
    "--un-ring-offset-shadow": "0 0 rgba(0,0,0,0)",
    "--un-ring-shadow": "0 0 rgba(0,0,0,0)",
    "--un-shadow-inset": u1,
    "--un-shadow": "0 0 rgba(0,0,0,0)"
};
const Y = [
    [
        /^shadow(?:-(.+))?$/,
        (t, n)=>{
            const [, o] = t;
            const { theme: i } = n;
            const l = i.boxShadow?.[o || "DEFAULT"];
            const c = o ? N.bracket.cssvar(o) : void 0;
            return null == l && null == c || hasParseableColor(c, i) ? colorResolver("--un-shadow-color", "shadow")(t, n) : {
                "--un-shadow": colorableShadows(l || c, "--un-shadow-color").join(","),
                "box-shadow": "var(--un-ring-offset-shadow), var(--un-ring-shadow), var(--un-shadow)"
            };
        },
        {
            autocomplete: [
                "shadow-$colors",
                "shadow-$boxShadow"
            ]
        }
    ],
    [
        /^shadow-op(?:acity)?-?(.+)$/,
        ([, t])=>({
                "--un-shadow-opacity": N.bracket.percent.cssvar(t)
            }),
        {
            autocomplete: "shadow-(op|opacity)-<percent>"
        }
    ],
    [
        "shadow-inset",
        {
            "--un-shadow-inset": "inset"
        }
    ]
];
const T = [
    "translate",
    "rotate",
    "scale"
];
const Z = [
    "translateX(var(--un-translate-x))",
    "translateY(var(--un-translate-y))",
    "translateZ(var(--un-translate-z))",
    "rotate(var(--un-rotate))",
    "rotateX(var(--un-rotate-x))",
    "rotateY(var(--un-rotate-y))",
    "rotateZ(var(--un-rotate-z))",
    "skewX(var(--un-skew-x))",
    "skewY(var(--un-skew-y))",
    "scaleX(var(--un-scale-x))",
    "scaleY(var(--un-scale-y))",
    "scaleZ(var(--un-scale-z))"
].join(" ");
const R = [
    "translate3d(var(--un-translate-x), var(--un-translate-y), var(--un-translate-z))",
    "rotate(var(--un-rotate))",
    "rotateX(var(--un-rotate-x))",
    "rotateY(var(--un-rotate-y))",
    "rotateZ(var(--un-rotate-z))",
    "skewX(var(--un-skew-x))",
    "skewY(var(--un-skew-y))",
    "scaleX(var(--un-scale-x))",
    "scaleY(var(--un-scale-y))",
    "scaleZ(var(--un-scale-z))"
].join(" ");
const U = {
    "--un-rotate": 0,
    "--un-rotate-x": 0,
    "--un-rotate-y": 0,
    "--un-rotate-z": 0,
    "--un-scale-x": 1,
    "--un-scale-y": 1,
    "--un-scale-z": 1,
    "--un-skew-x": 0,
    "--un-skew-y": 0,
    "--un-translate-x": 0,
    "--un-translate-y": 0,
    "--un-translate-z": 0
};
const A = [
    [
        /^(?:transform-)?origin-(.+)$/,
        ([, t])=>({
                "transform-origin": f[t] ?? N.bracket.cssvar(t)
            }),
        {
            autocomplete: [
                `transform-origin-(${Object.keys(f).join("|")})`,
                `origin-(${Object.keys(f).join("|")})`
            ]
        }
    ],
    [
        /^(?:transform-)?perspect(?:ive)?-(.+)$/,
        ([, t])=>{
            const n = N.bracket.cssvar.px.numberWithUnit(t);
            if (null != n) return {
                "-webkit-perspective": n,
                perspective: n
            };
        }
    ],
    [
        /^(?:transform-)?perspect(?:ive)?-origin-(.+)$/,
        ([, t])=>{
            const n = N.bracket.cssvar(t) ?? (t.length >= 3 ? f[t] : void 0);
            if (null != n) return {
                "-webkit-perspective-origin": n,
                "perspective-origin": n
            };
        }
    ],
    [
        /^(?:transform-)?translate-()(.+)$/,
        handleTranslate
    ],
    [
        /^(?:transform-)?translate-([xyz])-(.+)$/,
        handleTranslate
    ],
    [
        /^(?:transform-)?rotate-()(.+)$/,
        handleRotate
    ],
    [
        /^(?:transform-)?rotate-([xyz])-(.+)$/,
        handleRotate
    ],
    [
        /^(?:transform-)?skew-()(.+)$/,
        handleSkew
    ],
    [
        /^(?:transform-)?skew-([xy])-(.+)$/,
        handleSkew,
        {
            autocomplete: [
                "transform-skew-(x|y)-<percent>"
            ]
        }
    ],
    [
        /^(?:transform-)?scale-()(.+)$/,
        handleScale
    ],
    [
        /^(?:transform-)?scale-([xyz])-(.+)$/,
        handleScale,
        {
            autocomplete: [
                `transform-(${T.join("|")})-<percent>`,
                `transform-(${T.join("|")})-(x|y|z)-<percent>`
            ]
        }
    ],
    [
        /^(?:transform-)?preserve-3d$/,
        ()=>({
                "transform-style": "preserve-3d"
            })
    ],
    [
        /^(?:transform-)?preserve-flat$/,
        ()=>({
                "transform-style": "flat"
            })
    ],
    [
        "transform",
        {
            transform: Z
        }
    ],
    [
        "transform-cpu",
        {
            transform: Z
        }
    ],
    [
        "transform-gpu",
        {
            transform: R
        }
    ],
    [
        "transform-none",
        {
            transform: "none"
        }
    ],
    ...makeGlobalStaticRules("transform")
];
function handleTranslate([, t, n], { theme: a }) {
    const r = a.spacing?.[n] ?? N.bracket.cssvar.fraction.rem(n);
    if (null != r) return [
        ...u[t].map((e)=>[
                `--un-translate${e}`,
                r
            ]),
        [
            "transform",
            Z
        ]
    ];
}
function handleScale([, t, n]) {
    const a = N.bracket.cssvar.fraction.percent(n);
    if (null != a) return [
        ...u[t].map((e)=>[
                `--un-scale${e}`,
                a
            ]),
        [
            "transform",
            Z
        ]
    ];
}
function handleRotate([, t = "", n]) {
    const a = N.bracket.cssvar.degree(n);
    if (null != a) return t ? {
        "--un-rotate": 0,
        [`--un-rotate-${t}`]: a,
        transform: Z
    } : {
        "--un-rotate-x": 0,
        "--un-rotate-y": 0,
        "--un-rotate-z": 0,
        "--un-rotate": a,
        transform: Z
    };
}
function handleSkew([, t, n]) {
    const a = N.bracket.cssvar.degree(n);
    if (null != a) return [
        ...u[t].map((e)=>[
                `--un-skew${e}`,
                a
            ]),
        [
            "transform",
            Z
        ]
    ];
}
const x2 = {
    sans: [
        "ui-sans-serif",
        "system-ui",
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        '"Noto Sans"',
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
        '"Noto Color Emoji"'
    ].join(","),
    serif: [
        "ui-serif",
        "Georgia",
        "Cambria",
        '"Times New Roman"',
        "Times",
        "serif"
    ].join(","),
    mono: [
        "ui-monospace",
        "SFMono-Regular",
        "Menlo",
        "Monaco",
        "Consolas",
        '"Liberation Mono"',
        '"Courier New"',
        "monospace"
    ].join(",")
};
const m2 = {
    xs: [
        "0.75rem",
        "1rem"
    ],
    sm: [
        "0.875rem",
        "1.25rem"
    ],
    base: [
        "1rem",
        "1.5rem"
    ],
    lg: [
        "1.125rem",
        "1.75rem"
    ],
    xl: [
        "1.25rem",
        "1.75rem"
    ],
    "2xl": [
        "1.5rem",
        "2rem"
    ],
    "3xl": [
        "1.875rem",
        "2.25rem"
    ],
    "4xl": [
        "2.25rem",
        "2.5rem"
    ],
    "5xl": [
        "3rem",
        "1"
    ],
    "6xl": [
        "3.75rem",
        "1"
    ],
    "7xl": [
        "4.5rem",
        "1"
    ],
    "8xl": [
        "6rem",
        "1"
    ],
    "9xl": [
        "8rem",
        "1"
    ]
};
const s3 = {
    DEFAULT: "1.5rem",
    xs: "0.5rem",
    sm: "1rem",
    md: "1.5rem",
    lg: "2rem",
    xl: "2.5rem",
    "2xl": "3rem",
    "3xl": "4rem"
};
const t = {
    DEFAULT: "1.5rem",
    none: "0",
    sm: "thin",
    md: "medium",
    lg: "thick"
};
const i = {
    DEFAULT: [
        "0 0 1px rgba(0,0,0,0.2)",
        "0 0 1px rgba(1,0,5,0.1)"
    ],
    none: "0 0 rgba(0,0,0,0)",
    sm: "1px 1px 3px rgba(36,37,47,0.25)",
    md: [
        "0 1px 2px rgba(30,29,39,0.19)",
        "1px 2px 4px rgba(54,64,147,0.18)"
    ],
    lg: [
        "3px 3px 6px rgba(0,0,0,0.26)",
        "0 0 5px rgba(15,3,86,0.22)"
    ],
    xl: [
        "1px 1px 3px rgba(0,0,0,0.29)",
        "2px 4px 7px rgba(73,64,125,0.35)"
    ]
};
const a2 = {
    none: "1",
    tight: "1.25",
    snug: "1.375",
    normal: "1.5",
    relaxed: "1.625",
    loose: "2"
};
const p2 = {
    tighter: "-0.05em",
    tight: "-0.025em",
    normal: "0em",
    wide: "0.025em",
    wider: "0.05em",
    widest: "0.1em"
};
const l3 = {
    thin: "100",
    extralight: "200",
    light: "300",
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
    extrabold: "800",
    black: "900"
};
const c3 = p2;
const g2 = {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px"
};
const b2 = {
    ...g2
};
const d2 = {
    DEFAULT: "1px",
    none: "0"
};
const u2 = {
    DEFAULT: "1rem",
    none: "0",
    xs: "0.75rem",
    sm: "0.875rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
    "5xl": "3rem",
    "6xl": "3.75rem",
    "7xl": "4.5rem",
    "8xl": "6rem",
    "9xl": "8rem"
};
const h2 = {
    DEFAULT: "150ms",
    none: "0s",
    75: "75ms",
    100: "100ms",
    150: "150ms",
    200: "200ms",
    300: "300ms",
    500: "500ms",
    700: "700ms",
    1e3: "1000ms"
};
const w1 = {
    DEFAULT: "0.25rem",
    none: "0",
    sm: "0.125rem",
    md: "0.375rem",
    lg: "0.5rem",
    xl: "0.75rem",
    "2xl": "1rem",
    "3xl": "1.5rem",
    full: "9999px"
};
const S1 = {
    DEFAULT: [
        "var(--un-shadow-inset) 0 1px 3px 0 rgba(0,0,0,0.1)",
        "var(--un-shadow-inset) 0 1px 2px -1px rgba(0,0,0,0.1)"
    ],
    none: "0 0 rgba(0,0,0,0)",
    sm: "var(--un-shadow-inset) 0 1px 2px 0 rgba(0,0,0,0.05)",
    md: [
        "var(--un-shadow-inset) 0 4px 6px -1px rgba(0,0,0,0.1)",
        "var(--un-shadow-inset) 0 2px 4px -2px rgba(0,0,0,0.1)"
    ],
    lg: [
        "var(--un-shadow-inset) 0 10px 15px -3px rgba(0,0,0,0.1)",
        "var(--un-shadow-inset) 0 4px 6px -4px rgba(0,0,0,0.1)"
    ],
    xl: [
        "var(--un-shadow-inset) 0 20px 25px -5px rgba(0,0,0,0.1)",
        "var(--un-shadow-inset) 0 8px 10px -6px rgba(0,0,0,0.1)"
    ],
    "2xl": "var(--un-shadow-inset) 0 25px 50px -12px rgba(0,0,0,0.25)",
    inner: "inset 0 2px 4px 0 rgba(0,0,0,0.05)"
};
const v2 = {
    DEFAULT: "cubic-bezier(0.4, 0, 0.2, 1)",
    linear: "linear",
    in: "cubic-bezier(0.4, 0, 1, 1)",
    out: "cubic-bezier(0, 0, 0.2, 1)",
    "in-out": "cubic-bezier(0.4, 0, 0.2, 1)"
};
const E = {
    DEFAULT: "1px",
    none: "0"
};
const f3 = {
    auto: "auto"
};
const F = {
    DEFAULT: "8px",
    0: "0",
    sm: "4px",
    md: "12px",
    lg: "16px",
    xl: "24px",
    "2xl": "40px",
    "3xl": "64px"
};
const U1 = {
    DEFAULT: [
        "0 1px 2px rgba(0,0,0,0.1)",
        "0 1px 1px rgba(0,0,0,0.06)"
    ],
    sm: "0 1px 1px rgba(0,0,0,0.05)",
    md: [
        "0 4px 3px rgba(0,0,0,0.07)",
        "0 2px 2px rgba(0,0,0,0.06)"
    ],
    lg: [
        "0 10px 8px rgba(0,0,0,0.04)",
        "0 4px 3px rgba(0,0,0,0.1)"
    ],
    xl: [
        "0 20px 13px rgba(0,0,0,0.03)",
        "0 8px 5px rgba(0,0,0,0.08)"
    ],
    "2xl": "0 25px 25px rgba(0,0,0,0.15)",
    none: "0 0 rgba(0,0,0,0)"
};
const A1 = {
    xs: "20rem",
    sm: "24rem",
    md: "28rem",
    lg: "32rem",
    xl: "36rem",
    "2xl": "42rem",
    "3xl": "48rem",
    "4xl": "56rem",
    "5xl": "64rem",
    "6xl": "72rem",
    "7xl": "80rem",
    prose: "65ch"
};
const T1 = {
    auto: "auto",
    ...A1,
    screen: "100vw"
};
const L = {
    none: "none",
    ...A1,
    screen: "100vw"
};
const j1 = {
    auto: "auto",
    ...A1,
    screen: "100vh"
};
const z1 = {
    none: "none",
    ...A1,
    screen: "100vh"
};
const D = Object.fromEntries(Object.entries(A1).map(([e, r])=>[
        e,
        `(min-width: ${r})`
    ]));
const k2 = {
    ...U,
    ...X,
    ...q
};
const I = {
    width: T1,
    height: j1,
    maxWidth: L,
    maxHeight: z1,
    minWidth: L,
    minHeight: z1,
    inlineSize: T1,
    blockSize: j1,
    maxInlineSize: L,
    maxBlockSize: z1,
    minInlineSize: L,
    minBlockSize: z1,
    colors: f1,
    fontFamily: x2,
    fontSize: m2,
    fontWeight: l3,
    breakpoints: g2,
    verticalBreakpoints: b2,
    borderRadius: w1,
    lineHeight: a2,
    letterSpacing: p2,
    wordSpacing: c3,
    boxShadow: S1,
    textIndent: s3,
    textShadow: i,
    textStrokeWidth: t,
    blur: F,
    dropShadow: U1,
    easing: v2,
    lineWidth: d2,
    spacing: u2,
    duration: h2,
    ringWidth: E,
    preflightBase: k2,
    containers: D,
    zIndex: f3
};
const ae = {
    mid: "middle",
    base: "baseline",
    btm: "bottom",
    baseline: "baseline",
    top: "top",
    start: "top",
    middle: "middle",
    bottom: "bottom",
    end: "bottom",
    "text-top": "text-top",
    "text-bottom": "text-bottom",
    sub: "sub",
    super: "super",
    ...Object.fromEntries(b.map((e)=>[
            e,
            e
        ]))
};
const le = [
    [
        /^(?:vertical|align|v)-([-\w]+%?)$/,
        ([, e])=>({
                "vertical-align": ae[e] ?? N.numberWithUnit(e)
            }),
        {
            autocomplete: [
                `(vertical|align|v)-(${Object.keys(ae).join("|")})`,
                "(vertical|align|v)-<percentage>"
            ]
        }
    ]
];
const ce = [
    "center",
    "left",
    "right",
    "justify",
    "start",
    "end"
].map((e)=>[
        `text-${e}`,
        {
            "text-align": e
        }
    ]);
const de = [
    [
        /^outline-(?:width-|size-)?(.+)$/,
        ([, e], { theme: t })=>({
                "outline-width": t.lineWidth?.[e] ?? N.bracket.cssvar.global.px(e)
            }),
        {
            autocomplete: "outline-(width|size)-<num>"
        }
    ],
    [
        /^outline-(?:color-)?(.+)$/,
        colorResolver("outline-color", "outline-color"),
        {
            autocomplete: "outline-$colors"
        }
    ],
    [
        /^outline-offset-(.+)$/,
        ([, e], { theme: t })=>({
                "outline-offset": t.lineWidth?.[e] ?? N.bracket.cssvar.global.px(e)
            }),
        {
            autocomplete: "outline-(offset)-<num>"
        }
    ],
    [
        "outline",
        {
            "outline-style": "solid"
        }
    ],
    ...[
        "auto",
        "dashed",
        "dotted",
        "double",
        "hidden",
        "solid",
        "groove",
        "ridge",
        "inset",
        "outset",
        ...b
    ].map((e)=>[
            `outline-${e}`,
            {
                "outline-style": e
            }
        ]),
    [
        "outline-none",
        {
            outline: "2px solid transparent",
            "outline-offset": "2px"
        }
    ]
];
const ue = [
    [
        "appearance-none",
        {
            "-webkit-appearance": "none",
            appearance: "none"
        }
    ]
];
function willChangeProperty(e) {
    return N.properties.auto.global(e) ?? ({
        contents: "contents",
        scroll: "scroll-position"
    })[e];
}
const pe = [
    [
        /^will-change-(.+)/,
        ([, e])=>({
                "will-change": willChangeProperty(e)
            })
    ]
];
const me = [
    "solid",
    "dashed",
    "dotted",
    "double",
    "hidden",
    "none",
    "groove",
    "ridge",
    "inset",
    "outset",
    ...b
];
const fe = [
    [
        /^(?:border|b)()(?:-(.+))?$/,
        handlerBorder,
        {
            autocomplete: "(border|b)-<directions>"
        }
    ],
    [
        /^(?:border|b)-([xy])(?:-(.+))?$/,
        handlerBorder
    ],
    [
        /^(?:border|b)-([rltbse])(?:-(.+))?$/,
        handlerBorder
    ],
    [
        /^(?:border|b)-(block|inline)(?:-(.+))?$/,
        handlerBorder
    ],
    [
        /^(?:border|b)-([bi][se])(?:-(.+))?$/,
        handlerBorder
    ],
    [
        /^(?:border|b)-()(?:width|size)-(.+)$/,
        handlerBorderSize,
        {
            autocomplete: [
                "(border|b)-<num>",
                "(border|b)-<directions>-<num>"
            ]
        }
    ],
    [
        /^(?:border|b)-([xy])-(?:width|size)-(.+)$/,
        handlerBorderSize
    ],
    [
        /^(?:border|b)-([rltbse])-(?:width|size)-(.+)$/,
        handlerBorderSize
    ],
    [
        /^(?:border|b)-(block|inline)-(?:width|size)-(.+)$/,
        handlerBorderSize
    ],
    [
        /^(?:border|b)-([bi][se])-(?:width|size)-(.+)$/,
        handlerBorderSize
    ],
    [
        /^(?:border|b)-()(?:color-)?(.+)$/,
        handlerBorderColor,
        {
            autocomplete: [
                "(border|b)-$colors",
                "(border|b)-<directions>-$colors"
            ]
        }
    ],
    [
        /^(?:border|b)-([xy])-(?:color-)?(.+)$/,
        handlerBorderColor
    ],
    [
        /^(?:border|b)-([rltbse])-(?:color-)?(.+)$/,
        handlerBorderColor
    ],
    [
        /^(?:border|b)-(block|inline)-(?:color-)?(.+)$/,
        handlerBorderColor
    ],
    [
        /^(?:border|b)-([bi][se])-(?:color-)?(.+)$/,
        handlerBorderColor
    ],
    [
        /^(?:border|b)-()op(?:acity)?-?(.+)$/,
        handlerBorderOpacity,
        {
            autocomplete: "(border|b)-(op|opacity)-<percent>"
        }
    ],
    [
        /^(?:border|b)-([xy])-op(?:acity)?-?(.+)$/,
        handlerBorderOpacity
    ],
    [
        /^(?:border|b)-([rltbse])-op(?:acity)?-?(.+)$/,
        handlerBorderOpacity
    ],
    [
        /^(?:border|b)-(block|inline)-op(?:acity)?-?(.+)$/,
        handlerBorderOpacity
    ],
    [
        /^(?:border|b)-([bi][se])-op(?:acity)?-?(.+)$/,
        handlerBorderOpacity
    ],
    [
        /^(?:border-|b-)?(?:rounded|rd)()(?:-(.+))?$/,
        handlerRounded,
        {
            autocomplete: [
                "(border|b)-(rounded|rd)",
                "(border|b)-(rounded|rd)-<num>",
                "(rounded|rd)",
                "(rounded|rd)-<num>"
            ]
        }
    ],
    [
        /^(?:border-|b-)?(?:rounded|rd)-([rltbse])(?:-(.+))?$/,
        handlerRounded
    ],
    [
        /^(?:border-|b-)?(?:rounded|rd)-([rltb]{2})(?:-(.+))?$/,
        handlerRounded
    ],
    [
        /^(?:border-|b-)?(?:rounded|rd)-([bise][se])(?:-(.+))?$/,
        handlerRounded
    ],
    [
        /^(?:border-|b-)?(?:rounded|rd)-([bi][se]-[bi][se])(?:-(.+))?$/,
        handlerRounded
    ],
    [
        /^(?:border|b)-(?:style-)?()(.+)$/,
        handlerBorderStyle,
        {
            autocomplete: [
                "(border|b)-style",
                `(border|b)-(${me.join("|")})`,
                "(border|b)-<directions>-style",
                `(border|b)-<directions>-(${me.join("|")})`,
                `(border|b)-<directions>-style-(${me.join("|")})`,
                `(border|b)-style-(${me.join("|")})`
            ]
        }
    ],
    [
        /^(?:border|b)-([xy])-(?:style-)?(.+)$/,
        handlerBorderStyle
    ],
    [
        /^(?:border|b)-([rltbse])-(?:style-)?(.+)$/,
        handlerBorderStyle
    ],
    [
        /^(?:border|b)-(block|inline)-(?:style-)?(.+)$/,
        handlerBorderStyle
    ],
    [
        /^(?:border|b)-([bi][se])-(?:style-)?(.+)$/,
        handlerBorderStyle
    ]
];
function borderColorResolver(e) {
    return ([, t], o)=>{
        const n = parseColor1(t, o);
        if (!n) return;
        const { alpha: r, color: i, cssColor: s } = n;
        return s ? null != r ? {
            [`border${e}-color`]: colorToString(s, r)
        } : "" === e ? {
            "--un-border-opacity": colorOpacityToString(s),
            "border-color": colorToString(s, "var(--un-border-opacity)")
        } : {
            "--un-border-opacity": colorOpacityToString(s),
            [`--un-border${e}-opacity`]: "var(--un-border-opacity)",
            [`border${e}-color`]: colorToString(s, `var(--un-border${e}-opacity)`)
        } : i ? {
            [`border${e}-color`]: colorToString(i, r)
        } : void 0;
    };
}
function handlerBorder(e, t) {
    return handlerBorderSize(e, t);
}
function handlerBorderSize([, e = "", t], { theme: o }) {
    const n = o.lineWidth?.[t || "DEFAULT"] ?? N.bracket.cssvar.global.px(t || "1");
    if (e in a1 && null != n) return a1[e].map((e)=>[
            `border${e}-width`,
            n
        ]);
}
function handlerBorderColor([, e = "", t], { theme: o }) {
    if (e in a1 && hasParseableColor(t, o)) return Object.assign({}, ...a1[e].map((e)=>borderColorResolver(e)([
            "",
            t
        ], o)));
}
function handlerBorderOpacity([, e = "", t]) {
    const o = N.bracket.percent.cssvar(t);
    if (e in a1 && null != o) return a1[e].map((e)=>[
            `--un-border${e}-opacity`,
            o
        ]);
}
function handlerRounded([, e = "", t], { theme: o }) {
    const n = o.borderRadius?.[t || "DEFAULT"] || N.bracket.cssvar.global.fraction.rem(t || "1");
    if (e in l1 && null != n) return l1[e].map((e)=>[
            `border${e}-radius`,
            n
        ]);
}
function handlerBorderStyle([, e = "", t]) {
    if (me.includes(t) && e in a1) return a1[e].map((e)=>[
            `border${e}-style`,
            t
        ]);
}
const be = [
    [
        /^op(?:acity)?-?(.+)$/,
        ([, e])=>({
                opacity: N.bracket.percent.cssvar(e)
            })
    ]
];
const he = [
    [
        /^(?:color|c)-(.+)$/,
        colorResolver("color", "text"),
        {
            autocomplete: "(color|c)-$colors"
        }
    ],
    [
        /^text-(.+)$/,
        colorResolver("color", "text", (e)=>!e.color?.toString().match(d)),
        {
            autocomplete: "text-$colors"
        }
    ],
    [
        /^(?:text|color|c)-(.+)$/,
        ([, e])=>b.includes(e) ? {
                color: e
            } : void 0,
        {
            autocomplete: `(text|color|c)-(${b.join("|")})`
        }
    ],
    [
        /^(?:text|color|c)-op(?:acity)?-?(.+)$/,
        ([, e])=>({
                "--un-text-opacity": N.bracket.percent.cssvar(e)
            }),
        {
            autocomplete: "(text|color|c)-(op|opacity)-<percent>"
        }
    ]
];
const ge = [
    [
        /^bg-(.+)$/,
        colorResolver("background-color", "bg"),
        {
            autocomplete: "bg-$colors"
        }
    ],
    [
        /^bg-op(?:acity)?-?(.+)$/,
        ([, e])=>({
                "--un-bg-opacity": N.bracket.percent.cssvar(e)
            }),
        {
            autocomplete: "bg-(op|opacity)-<percent>"
        }
    ]
];
const $e = [
    [
        /^color-scheme-(\w+)$/,
        ([, e])=>({
                "color-scheme": e
            })
    ]
];
const xe = [
    [
        /^@container(?:\/(\w+))?(?:-(normal))?$/,
        ([, e, t])=>{
            warnOnce("The container query rule is experimental and may not follow semver.");
            return {
                "container-type": t ?? "inline-size",
                "container-name": e
            };
        }
    ]
];
const ye = [
    "solid",
    "double",
    "dotted",
    "dashed",
    "wavy",
    ...b
];
const we = [
    [
        /^(?:decoration-)?(underline|overline|line-through)$/,
        ([, e])=>({
                "text-decoration-line": e
            }),
        {
            autocomplete: "decoration-(underline|overline|line-through)"
        }
    ],
    [
        /^(?:underline|decoration)-(?:size-)?(.+)$/,
        ([, e], { theme: t })=>({
                "text-decoration-thickness": t.lineWidth?.[e] ?? N.bracket.cssvar.global.px(e)
            }),
        {
            autocomplete: "(underline|decoration)-<num>"
        }
    ],
    [
        /^(?:underline|decoration)-(auto|from-font)$/,
        ([, e])=>({
                "text-decoration-thickness": e
            }),
        {
            autocomplete: "(underline|decoration)-(auto|from-font)"
        }
    ],
    [
        /^(?:underline|decoration)-(.+)$/,
        (e, t)=>{
            const o = colorResolver("text-decoration-color", "line")(e, t);
            if (o) return {
                "-webkit-text-decoration-color": o["text-decoration-color"],
                ...o
            };
        },
        {
            autocomplete: "(underline|decoration)-$colors"
        }
    ],
    [
        /^(?:underline|decoration)-op(?:acity)?-?(.+)$/,
        ([, e])=>({
                "--un-line-opacity": N.bracket.percent.cssvar(e)
            }),
        {
            autocomplete: "(underline|decoration)-(op|opacity)-<percent>"
        }
    ],
    [
        /^(?:underline|decoration)-offset-(.+)$/,
        ([, e], { theme: t })=>({
                "text-underline-offset": t.lineWidth?.[e] ?? N.auto.bracket.cssvar.global.px(e)
            }),
        {
            autocomplete: "(underline|decoration)-(offset)-<num>"
        }
    ],
    ...ye.map((e)=>[
            `underline-${e}`,
            {
                "text-decoration-style": e
            }
        ]),
    ...ye.map((e)=>[
            `decoration-${e}`,
            {
                "text-decoration-style": e
            }
        ]),
    [
        "no-underline",
        {
            "text-decoration": "none"
        }
    ],
    [
        "decoration-none",
        {
            "text-decoration": "none"
        }
    ]
];
const ke = {
    all: "all",
    colors: [
        "color",
        "background-color",
        "border-color",
        "outline-color",
        "text-decoration-color",
        "fill",
        "stroke"
    ].join(","),
    none: "none",
    opacity: "opacity",
    shadow: "box-shadow",
    transform: "transform"
};
function transitionProperty(e) {
    return N.properties(e) ?? ke[e];
}
const ve = [
    [
        /^transition(?:-([a-z-]+(?:,[a-z-]+)*))?(?:-(\d+))?$/,
        ([, e, t], { theme: o })=>{
            const n = null != e ? transitionProperty(e) : [
                ke.colors,
                "opacity",
                "box-shadow",
                "transform",
                "filter",
                "backdrop-filter"
            ].join(",");
            if (n) {
                const e = o.duration?.[t || "DEFAULT"] ?? N.time(t || "150");
                return {
                    "transition-property": n,
                    "transition-timing-function": "cubic-bezier(0.4, 0, 0.2, 1)",
                    "transition-duration": e
                };
            }
        },
        {
            autocomplete: `transition-(${Object.keys(ke).join("|")})`
        }
    ],
    [
        /^(?:transition-)?duration-(.+)$/,
        ([, e], { theme: t })=>({
                "transition-duration": t.duration?.[e || "DEFAULT"] ?? N.bracket.cssvar.time(e)
            }),
        {
            autocomplete: [
                "transition-duration-$duration",
                "duration-$duration"
            ]
        }
    ],
    [
        /^(?:transition-)?delay-(.+)$/,
        ([, e], { theme: t })=>({
                "transition-delay": t.duration?.[e || "DEFAULT"] ?? N.bracket.cssvar.time(e)
            }),
        {
            autocomplete: [
                "transition-delay-$duration",
                "delay-$duration"
            ]
        }
    ],
    [
        /^(?:transition-)?ease(?:-(.+))?$/,
        ([, e], { theme: t })=>({
                "transition-timing-function": t.easing?.[e || "DEFAULT"] ?? N.bracket.cssvar(e)
            }),
        {
            autocomplete: [
                "transition-ease-(linear|in|out|in-out|DEFAULT)",
                "ease-(linear|in|out|in-out|DEFAULT)"
            ]
        }
    ],
    [
        /^(?:transition-)?property-(.+)$/,
        ([, e])=>({
                "transition-property": N.bracket.global(e) || transitionProperty(e)
            }),
        {
            autocomplete: [
                `transition-property-(${[
                    ...b,
                    ...Object.keys(ke)
                ].join("|")})`
            ]
        }
    ],
    [
        "transition-none",
        {
            transition: "none"
        }
    ],
    ...makeGlobalStaticRules("transition")
];
const je = [
    [
        "flex",
        {
            display: "flex"
        }
    ],
    [
        "inline-flex",
        {
            display: "inline-flex"
        }
    ],
    [
        "flex-inline",
        {
            display: "inline-flex"
        }
    ],
    [
        /^flex-(.*)$/,
        ([, e])=>({
                flex: null != N.bracket(e) ? N.bracket(e).split(" ").map((e)=>N.cssvar.fraction(e) ?? e).join(" ") : N.cssvar.fraction(e)
            })
    ],
    [
        "flex-1",
        {
            flex: "1 1 0%"
        }
    ],
    [
        "flex-auto",
        {
            flex: "1 1 auto"
        }
    ],
    [
        "flex-initial",
        {
            flex: "0 1 auto"
        }
    ],
    [
        "flex-none",
        {
            flex: "none"
        }
    ],
    [
        /^(?:flex-)?shrink(?:-(.*))?$/,
        ([, e = ""])=>({
                "flex-shrink": N.bracket.cssvar.number(e) ?? 1
            }),
        {
            autocomplete: [
                "flex-shrink-<num>",
                "shrink-<num>"
            ]
        }
    ],
    [
        /^(?:flex-)?grow(?:-(.*))?$/,
        ([, e = ""])=>({
                "flex-grow": N.bracket.cssvar.number(e) ?? 1
            }),
        {
            autocomplete: [
                "flex-grow-<num>",
                "grow-<num>"
            ]
        }
    ],
    [
        /^(?:flex-)?basis-(.+)$/,
        ([, e], { theme: t })=>({
                "flex-basis": t.spacing?.[e] ?? N.bracket.cssvar.auto.fraction.rem(e)
            }),
        {
            autocomplete: [
                "flex-basis-$spacing",
                "basis-$spacing"
            ]
        }
    ],
    [
        "flex-row",
        {
            "flex-direction": "row"
        }
    ],
    [
        "flex-row-reverse",
        {
            "flex-direction": "row-reverse"
        }
    ],
    [
        "flex-col",
        {
            "flex-direction": "column"
        }
    ],
    [
        "flex-col-reverse",
        {
            "flex-direction": "column-reverse"
        }
    ],
    [
        "flex-wrap",
        {
            "flex-wrap": "wrap"
        }
    ],
    [
        "flex-wrap-reverse",
        {
            "flex-wrap": "wrap-reverse"
        }
    ],
    [
        "flex-nowrap",
        {
            "flex-wrap": "nowrap"
        }
    ]
];
function handleLineHeight(e, t) {
    return t.lineHeight?.[e] || N.bracket.cssvar.global.rem(e);
}
const ze = [
    [
        /^text-(.+)$/,
        ([, e = "base"], { theme: t })=>{
            const [o, n] = splitShorthand(e, "length");
            const r = toArray(t.fontSize?.[o]);
            const i = n ? handleLineHeight(n, t) : void 0;
            if (r?.[0]) {
                const [e, t] = r;
                return {
                    "font-size": e,
                    "line-height": i ?? t ?? "1"
                };
            }
            const s = N.bracketOfLength.rem(o);
            return i && s ? {
                "font-size": s,
                "line-height": i
            } : {
                "font-size": N.bracketOfLength.rem(e)
            };
        },
        {
            autocomplete: "text-$fontSize"
        }
    ],
    [
        /^(?:text|font)-size-(.+)$/,
        ([, e], { theme: t })=>{
            const o = toArray(t.fontSize?.[e]);
            const n = o?.[0] ?? N.bracket.cssvar.global.rem(e);
            if (null != n) return {
                "font-size": n
            };
        },
        {
            autocomplete: "text-size-$fontSize"
        }
    ],
    [
        /^(?:font|fw)-?([^-]+)$/,
        ([, e], { theme: t })=>({
                "font-weight": t.fontWeight?.[e] || N.bracket.global.number(e)
            }),
        {
            autocomplete: [
                "(font|fw)-(100|200|300|400|500|600|700|800|900)",
                "(font|fw)-$fontWeight"
            ]
        }
    ],
    [
        /^(?:font-)?(?:leading|lh|line-height)-(.+)$/,
        ([, e], { theme: t })=>({
                "line-height": handleLineHeight(e, t)
            }),
        {
            autocomplete: "(leading|lh|line-height)-$lineHeight"
        }
    ],
    [
        "font-synthesis-weight",
        {
            "font-synthesis": "weight"
        }
    ],
    [
        "font-synthesis-style",
        {
            "font-synthesis": "style"
        }
    ],
    [
        "font-synthesis-small-caps",
        {
            "font-synthesis": "small-caps"
        }
    ],
    [
        "font-synthesis-none",
        {
            "font-synthesis": "none"
        }
    ],
    [
        /^font-synthesis-(.+)$/,
        ([, e])=>({
                "font-synthesis": N.bracket.cssvar.global(e)
            })
    ],
    [
        /^(?:font-)?tracking-(.+)$/,
        ([, e], { theme: t })=>({
                "letter-spacing": t.letterSpacing?.[e] || N.bracket.cssvar.global.rem(e)
            }),
        {
            autocomplete: "tracking-$letterSpacing"
        }
    ],
    [
        /^(?:font-)?word-spacing-(.+)$/,
        ([, e], { theme: t })=>({
                "word-spacing": t.wordSpacing?.[e] || N.bracket.cssvar.global.rem(e)
            }),
        {
            autocomplete: "word-spacing-$wordSpacing"
        }
    ],
    [
        /^font-(.+)$/,
        ([, e], { theme: t })=>({
                "font-family": t.fontFamily?.[e] || N.bracket.cssvar.global(e)
            }),
        {
            autocomplete: "font-$fontFamily"
        }
    ]
];
const Se = [
    [
        /^tab(?:-(.+))?$/,
        ([, e])=>{
            const t = N.bracket.cssvar.global.number(e || "4");
            if (null != t) return {
                "-moz-tab-size": t,
                "-o-tab-size": t,
                "tab-size": t
            };
        }
    ]
];
const Be = [
    [
        /^indent(?:-(.+))?$/,
        ([, e], { theme: t })=>({
                "text-indent": t.textIndent?.[e || "DEFAULT"] || N.bracket.cssvar.global.fraction.rem(e)
            }),
        {
            autocomplete: "indent-$textIndent"
        }
    ]
];
const Ce = [
    [
        /^text-stroke(?:-(.+))?$/,
        ([, e], { theme: t })=>({
                "-webkit-text-stroke-width": t.textStrokeWidth?.[e || "DEFAULT"] || N.bracket.cssvar.px(e)
            }),
        {
            autocomplete: "text-stroke-$textStrokeWidth"
        }
    ],
    [
        /^text-stroke-(.+)$/,
        colorResolver("-webkit-text-stroke-color", "text-stroke"),
        {
            autocomplete: "text-stroke-$colors"
        }
    ],
    [
        /^text-stroke-op(?:acity)?-?(.+)$/,
        ([, e])=>({
                "--un-text-stroke-opacity": N.bracket.percent.cssvar(e)
            }),
        {
            autocomplete: "text-stroke-(op|opacity)-<percent>"
        }
    ]
];
const We = [
    [
        /^text-shadow(?:-(.+))?$/,
        ([, e], { theme: t })=>{
            const o = t.textShadow?.[e || "DEFAULT"];
            return null != o ? {
                "--un-text-shadow": colorableShadows(o, "--un-text-shadow-color").join(","),
                "text-shadow": "var(--un-text-shadow)"
            } : {
                "text-shadow": N.bracket.cssvar.global(e)
            };
        },
        {
            autocomplete: "text-shadow-$textShadow"
        }
    ],
    [
        /^text-shadow-color-(.+)$/,
        colorResolver("--un-text-shadow-color", "text-shadow"),
        {
            autocomplete: "text-shadow-color-$colors"
        }
    ],
    [
        /^text-shadow-color-op(?:acity)?-?(.+)$/,
        ([, e])=>({
                "--un-text-shadow-opacity": N.bracket.percent.cssvar(e)
            }),
        {
            autocomplete: "text-shadow-color-(op|opacity)-<percent>"
        }
    ]
];
const Ie = {
    "": "",
    x: "column-",
    y: "row-"
};
function handleGap([, e = "", t], { theme: o }) {
    const n = o.spacing?.[t] ?? N.bracket.cssvar.global.rem(t);
    if (null != n) return {
        [`${Ie[e]}gap`]: n
    };
}
const Ue = [
    [
        /^(?:flex-|grid-)?gap-?()(.+)$/,
        handleGap,
        {
            autocomplete: [
                "gap-$spacing",
                "gap-<num>"
            ]
        }
    ],
    [
        /^(?:flex-|grid-)?gap-([xy])-?(.+)$/,
        handleGap,
        {
            autocomplete: [
                "gap-(x|y)-$spacing",
                "gap-(x|y)-<num>"
            ]
        }
    ]
];
function rowCol(e) {
    return e.replace("col", "column");
}
function rowColTheme(e) {
    return "r" === e[0] ? "Row" : "Column";
}
function autoDirection(e, t, o) {
    const n = t[`gridAuto${rowColTheme(e)}`]?.[o];
    if (null != n) return n;
    switch(o){
        case "min":
            return "min-content";
        case "max":
            return "max-content";
        case "fr":
            return "minmax(0,1fr)";
    }
    return N.bracket.cssvar.auto.rem(o);
}
const Te = [
    [
        "grid",
        {
            display: "grid"
        }
    ],
    [
        "inline-grid",
        {
            display: "inline-grid"
        }
    ],
    [
        /^(?:grid-)?(row|col)-(.+)$/,
        ([, e, t], { theme: o })=>({
                [`grid-${rowCol(e)}`]: o[`grid${rowColTheme(e)}`]?.[t] ?? N.bracket.cssvar.auto(t)
            })
    ],
    [
        /^(?:grid-)?(row|col)-span-(.+)$/,
        ([, e, t])=>{
            if ("full" === t) return {
                [`grid-${rowCol(e)}`]: "1/-1"
            };
            const o = N.bracket.number(t);
            return null != o ? {
                [`grid-${rowCol(e)}`]: `span ${o}/span ${o}`
            } : void 0;
        },
        {
            autocomplete: [
                "grid-(row|col)-span-<num>",
                "(row|col)-span-<num>"
            ]
        }
    ],
    [
        /^(?:grid-)?(row|col)-start-(.+)$/,
        ([, e, t])=>({
                [`grid-${rowCol(e)}-start`]: N.bracket.cssvar(t) ?? t
            })
    ],
    [
        /^(?:grid-)?(row|col)-end-(.+)$/,
        ([, e, t])=>({
                [`grid-${rowCol(e)}-end`]: N.bracket.cssvar(t) ?? t
            }),
        {
            autocomplete: [
                "grid-(row|col)-(start|end)-<num>"
            ]
        }
    ],
    [
        /^(?:grid-)?auto-(rows|cols)-(.+)$/,
        ([, e, t], { theme: o })=>({
                [`grid-auto-${rowCol(e)}`]: autoDirection(e, o, t)
            }),
        {
            autocomplete: [
                "grid-auto-(rows|cols)-<num>"
            ]
        }
    ],
    [
        /^(?:grid-auto-flow|auto-flow|grid-flow)-(.+)$/,
        ([, e])=>({
                "grid-auto-flow": N.bracket.cssvar(e)
            })
    ],
    [
        /^(?:grid-auto-flow|auto-flow|grid-flow)-(row|col|dense|row-dense|col-dense)$/,
        ([, e])=>({
                "grid-auto-flow": rowCol(e).replace("-", " ")
            }),
        {
            autocomplete: [
                "(grid-auto-flow|auto-flow|grid-flow)-(row|col|dense|row-dense|col-dense)"
            ]
        }
    ],
    [
        /^grid-(rows|cols)-(.+)$/,
        ([, e, t], { theme: o })=>({
                [`grid-template-${rowCol(e)}`]: o[`gridTemplate${rowColTheme(e)}`]?.[t] ?? N.bracket.cssvar(t)
            })
    ],
    [
        /^grid-(rows|cols)-minmax-([\w.-]+)$/,
        ([, e, t])=>({
                [`grid-template-${rowCol(e)}`]: `repeat(auto-fill,minmax(${t},1fr))`
            })
    ],
    [
        /^grid-(rows|cols)-(\d+)$/,
        ([, e, t])=>({
                [`grid-template-${rowCol(e)}`]: `repeat(${t},minmax(0,1fr))`
            }),
        {
            autocomplete: [
                "grid-(rows|cols)-<num>",
                "grid-(rows|cols)-none"
            ]
        }
    ],
    [
        /^grid-area(s)?-(.+)$/,
        ([, e, t])=>null != e ? {
                "grid-template-areas": N.cssvar(t) ?? t.split("-").map((e)=>`"${N.bracket(e)}"`).join(" ")
            } : {
                "grid-area": N.bracket.cssvar(t)
            }
    ],
    [
        "grid-rows-none",
        {
            "grid-template-rows": "none"
        }
    ],
    [
        "grid-cols-none",
        {
            "grid-template-columns": "none"
        }
    ]
];
const Le = [
    "auto",
    "hidden",
    "clip",
    "visible",
    "scroll",
    "overlay",
    ...b
];
const Ve = [
    [
        /^(?:overflow|of)-(.+)$/,
        ([, e])=>Le.includes(e) ? {
                overflow: e
            } : void 0,
        {
            autocomplete: [
                `(overflow|of)-(${Le.join("|")})`,
                `(overflow|of)-(x|y)-(${Le.join("|")})`
            ]
        }
    ],
    [
        /^(?:overflow|of)-([xy])-(.+)$/,
        ([, e, t])=>Le.includes(t) ? {
                [`overflow-${e}`]: t
            } : void 0
    ]
];
const Re = [
    [
        /^(?:position-|pos-)?(relative|absolute|fixed|sticky)$/,
        ([, e])=>({
                position: e
            }),
        {
            autocomplete: [
                "(position|pos)-<position>",
                "(position|pos)-<globalKeyword>",
                "<position>"
            ]
        }
    ],
    [
        /^(?:position-|pos-)([-\w]+)$/,
        ([, e])=>b.includes(e) ? {
                position: e
            } : void 0
    ],
    [
        /^(?:position-|pos-)?(static)$/,
        ([, e])=>({
                position: e
            })
    ]
];
const Ae = [
    [
        "justify-start",
        {
            "justify-content": "flex-start"
        }
    ],
    [
        "justify-end",
        {
            "justify-content": "flex-end"
        }
    ],
    [
        "justify-center",
        {
            "justify-content": "center"
        }
    ],
    [
        "justify-between",
        {
            "justify-content": "space-between"
        }
    ],
    [
        "justify-around",
        {
            "justify-content": "space-around"
        }
    ],
    [
        "justify-evenly",
        {
            "justify-content": "space-evenly"
        }
    ],
    [
        "justify-stretch",
        {
            "justify-content": "stretch"
        }
    ],
    ...makeGlobalStaticRules("justify", "justify-content"),
    [
        "justify-items-start",
        {
            "justify-items": "start"
        }
    ],
    [
        "justify-items-end",
        {
            "justify-items": "end"
        }
    ],
    [
        "justify-items-center",
        {
            "justify-items": "center"
        }
    ],
    [
        "justify-items-stretch",
        {
            "justify-items": "stretch"
        }
    ],
    ...makeGlobalStaticRules("justify-items"),
    [
        "justify-self-auto",
        {
            "justify-self": "auto"
        }
    ],
    [
        "justify-self-start",
        {
            "justify-self": "start"
        }
    ],
    [
        "justify-self-end",
        {
            "justify-self": "end"
        }
    ],
    [
        "justify-self-center",
        {
            "justify-self": "center"
        }
    ],
    [
        "justify-self-stretch",
        {
            "justify-self": "stretch"
        }
    ],
    ...makeGlobalStaticRules("justify-self")
];
const Ee = [
    [
        /^order-(.+)$/,
        ([, e])=>({
                order: N.bracket.cssvar.number(e)
            })
    ],
    [
        "order-first",
        {
            order: "-9999"
        }
    ],
    [
        "order-last",
        {
            order: "9999"
        }
    ],
    [
        "order-none",
        {
            order: "0"
        }
    ]
];
const Oe = [
    [
        "content-center",
        {
            "align-content": "center"
        }
    ],
    [
        "content-start",
        {
            "align-content": "flex-start"
        }
    ],
    [
        "content-end",
        {
            "align-content": "flex-end"
        }
    ],
    [
        "content-between",
        {
            "align-content": "space-between"
        }
    ],
    [
        "content-around",
        {
            "align-content": "space-around"
        }
    ],
    [
        "content-evenly",
        {
            "align-content": "space-evenly"
        }
    ],
    ...makeGlobalStaticRules("content", "align-content"),
    [
        "items-start",
        {
            "align-items": "flex-start"
        }
    ],
    [
        "items-end",
        {
            "align-items": "flex-end"
        }
    ],
    [
        "items-center",
        {
            "align-items": "center"
        }
    ],
    [
        "items-baseline",
        {
            "align-items": "baseline"
        }
    ],
    [
        "items-stretch",
        {
            "align-items": "stretch"
        }
    ],
    ...makeGlobalStaticRules("items", "align-items"),
    [
        "self-auto",
        {
            "align-self": "auto"
        }
    ],
    [
        "self-start",
        {
            "align-self": "flex-start"
        }
    ],
    [
        "self-end",
        {
            "align-self": "flex-end"
        }
    ],
    [
        "self-center",
        {
            "align-self": "center"
        }
    ],
    [
        "self-stretch",
        {
            "align-self": "stretch"
        }
    ],
    [
        "self-baseline",
        {
            "align-self": "baseline"
        }
    ],
    ...makeGlobalStaticRules("self", "align-self")
];
const De = [
    [
        "place-content-center",
        {
            "place-content": "center"
        }
    ],
    [
        "place-content-start",
        {
            "place-content": "start"
        }
    ],
    [
        "place-content-end",
        {
            "place-content": "end"
        }
    ],
    [
        "place-content-between",
        {
            "place-content": "space-between"
        }
    ],
    [
        "place-content-around",
        {
            "place-content": "space-around"
        }
    ],
    [
        "place-content-evenly",
        {
            "place-content": "space-evenly"
        }
    ],
    [
        "place-content-stretch",
        {
            "place-content": "stretch"
        }
    ],
    ...makeGlobalStaticRules("place-content"),
    [
        "place-items-start",
        {
            "place-items": "start"
        }
    ],
    [
        "place-items-end",
        {
            "place-items": "end"
        }
    ],
    [
        "place-items-center",
        {
            "place-items": "center"
        }
    ],
    [
        "place-items-stretch",
        {
            "place-items": "stretch"
        }
    ],
    ...makeGlobalStaticRules("place-items"),
    [
        "place-self-auto",
        {
            "place-self": "auto"
        }
    ],
    [
        "place-self-start",
        {
            "place-self": "start"
        }
    ],
    [
        "place-self-end",
        {
            "place-self": "end"
        }
    ],
    [
        "place-self-center",
        {
            "place-self": "center"
        }
    ],
    [
        "place-self-stretch",
        {
            "place-self": "stretch"
        }
    ],
    ...makeGlobalStaticRules("place-self")
];
const Fe = [
    ...Ae,
    ...Oe
].flatMap(([e, t])=>[
        [
            `flex-${e}`,
            t
        ],
        [
            `grid-${e}`,
            t
        ]
    ]);
function handleInsetValue(e, { theme: t }) {
    return t.spacing?.[e] ?? N.bracket.cssvar.global.auto.fraction.rem(e);
}
function handleInsetValues([, e, t], o) {
    const n = handleInsetValue(t, o);
    if (null != n && e in c1) return c1[e].map((e)=>[
            e.slice(1),
            n
        ]);
}
const He = [
    [
        /^(?:position-|pos-)?inset-(.+)$/,
        ([, e], t)=>({
                inset: handleInsetValue(e, t)
            }),
        {
            autocomplete: [
                "(position|pos)-inset-<directions>-$spacing",
                "(position|pos)-inset-(block|inline)-$spacing",
                "(position|pos)-inset-(bs|be|is|ie)-$spacing",
                "(position|pos)-(top|left|right|bottom)-$spacing"
            ]
        }
    ],
    [
        /^(?:position-|pos-)?(start|end)-(.+)$/,
        handleInsetValues
    ],
    [
        /^(?:position-|pos-)?inset-([xy])-(.+)$/,
        handleInsetValues
    ],
    [
        /^(?:position-|pos-)?inset-([rltbse])-(.+)$/,
        handleInsetValues
    ],
    [
        /^(?:position-|pos-)?inset-(block|inline)-(.+)$/,
        handleInsetValues
    ],
    [
        /^(?:position-|pos-)?inset-([bi][se])-(.+)$/,
        handleInsetValues
    ],
    [
        /^(?:position-|pos-)?(top|left|right|bottom)-(.+)$/,
        ([, e, t], o)=>({
                [e]: handleInsetValue(t, o)
            })
    ]
];
const Pe = [
    [
        "float-left",
        {
            float: "left"
        }
    ],
    [
        "float-right",
        {
            float: "right"
        }
    ],
    [
        "float-none",
        {
            float: "none"
        }
    ],
    ...makeGlobalStaticRules("float"),
    [
        "clear-left",
        {
            clear: "left"
        }
    ],
    [
        "clear-right",
        {
            clear: "right"
        }
    ],
    [
        "clear-both",
        {
            clear: "both"
        }
    ],
    [
        "clear-none",
        {
            clear: "none"
        }
    ],
    ...makeGlobalStaticRules("clear")
];
const qe = [
    [
        /^(?:position-|pos-)?z([\d.]+)$/,
        ([, e])=>({
                "z-index": N.number(e)
            })
    ],
    [
        /^(?:position-|pos-)?z-(.+)$/,
        ([, e], { theme: t })=>({
                "z-index": t.zIndex?.[e] ?? N.bracket.cssvar.global.auto.number(e)
            }),
        {
            autocomplete: "z-<num>"
        }
    ]
];
const _e = [
    [
        "box-border",
        {
            "box-sizing": "border-box"
        }
    ],
    [
        "box-content",
        {
            "box-sizing": "content-box"
        }
    ],
    ...makeGlobalStaticRules("box", "box-sizing")
];
const Ne = {
    h: "height",
    w: "width",
    inline: "inline-size",
    block: "block-size"
};
function getPropName(e, t) {
    return `${e || ""}${Ne[t]}`;
}
function getSizeValue(e, t, o, n) {
    const r = getPropName(e, t).replace(/-(\w)/g, (e, t)=>t.toUpperCase());
    const i = o[r]?.[n];
    if (null != i) return i;
    switch(n){
        case "fit":
        case "max":
        case "min":
            return `${n}-content`;
    }
    return N.bracket.cssvar.global.auto.fraction.rem(n);
}
const Ge = [
    [
        /^(?:size-)?(min-|max-)?([wh])-?(.+)$/,
        ([, e, t, o], { theme: n })=>({
                [getPropName(e, t)]: getSizeValue(e, t, n, o)
            })
    ],
    [
        /^(?:size-)?(min-|max-)?(block|inline)-(.+)$/,
        ([, e, t, o], { theme: n })=>({
                [getPropName(e, t)]: getSizeValue(e, t, n, o)
            }),
        {
            autocomplete: [
                "(w|h)-$width|height|maxWidth|maxHeight|minWidth|minHeight|inlineSize|blockSize|maxInlineSize|maxBlockSize|minInlineSize|minBlockSize",
                "(block|inline)-$width|height|maxWidth|maxHeight|minWidth|minHeight|inlineSize|blockSize|maxInlineSize|maxBlockSize|minInlineSize|minBlockSize",
                "(max|min)-(w|h|block|inline)",
                "(max|min)-(w|h|block|inline)-$width|height|maxWidth|maxHeight|minWidth|minHeight|inlineSize|blockSize|maxInlineSize|maxBlockSize|minInlineSize|minBlockSize",
                "(w|h)-full",
                "(max|min)-(w|h)-full"
            ]
        }
    ],
    [
        /^(?:size-)?(min-|max-)?(h)-screen-(.+)$/,
        ([, e, t, o], n)=>({
                [getPropName(e, t)]: resolveVerticalBreakpoints(n)?.[o]
            })
    ],
    [
        /^(?:size-)?(min-|max-)?(w)-screen-(.+)$/,
        ([, e, t, o], n)=>({
                [getPropName(e, t)]: resolveBreakpoints(n)?.[o]
            }),
        {
            autocomplete: [
                "(w|h)-screen",
                "(min|max)-(w|h)-screen",
                "h-screen-$verticalBreakpoints",
                "(min|max)-h-screen-$verticalBreakpoints",
                "w-screen-$breakpoints",
                "(min|max)-w-screen-$breakpoints"
            ]
        }
    ]
];
function getAspectRatio(e) {
    if (/^\d+\/\d+$/.test(e)) return e;
    switch(e){
        case "square":
            return "1/1";
        case "video":
            return "16/9";
    }
    return N.bracket.cssvar.global.auto.number(e);
}
const Me = [
    [
        /^(?:size-)?aspect-(?:ratio-)?(.+)$/,
        ([, e])=>({
                "aspect-ratio": getAspectRatio(e)
            }),
        {
            autocomplete: [
                "aspect-(square|video|ratio)",
                "aspect-ratio-(square|video)"
            ]
        }
    ]
];
const Ke = [
    [
        /^pa?()-?(-?.+)$/,
        directionSize("padding"),
        {
            autocomplete: [
                "(m|p)<num>",
                "(m|p)-<num>"
            ]
        }
    ],
    [
        /^p-?xy()()$/,
        directionSize("padding"),
        {
            autocomplete: "(m|p)-(xy)"
        }
    ],
    [
        /^p-?([xy])(?:-?(-?.+))?$/,
        directionSize("padding")
    ],
    [
        /^p-?([rltbse])(?:-?(-?.+))?$/,
        directionSize("padding"),
        {
            autocomplete: "(m|p)<directions>-<num>"
        }
    ],
    [
        /^p-(block|inline)(?:-(-?.+))?$/,
        directionSize("padding"),
        {
            autocomplete: "(m|p)-(block|inline)-<num>"
        }
    ],
    [
        /^p-?([bi][se])(?:-?(-?.+))?$/,
        directionSize("padding"),
        {
            autocomplete: "(m|p)-(bs|be|is|ie)-<num>"
        }
    ]
];
const Je = [
    [
        /^ma?()-?(-?.+)$/,
        directionSize("margin")
    ],
    [
        /^m-?xy()()$/,
        directionSize("margin")
    ],
    [
        /^m-?([xy])(?:-?(-?.+))?$/,
        directionSize("margin")
    ],
    [
        /^m-?([rltbse])(?:-?(-?.+))?$/,
        directionSize("margin")
    ],
    [
        /^m-(block|inline)(?:-(-?.+))?$/,
        directionSize("margin")
    ],
    [
        /^m-?([bi][se])(?:-?(-?.+))?$/,
        directionSize("margin")
    ]
];
const Qe = {
    backface: "backface-visibility",
    break: "word-break",
    case: "text-transform",
    content: "align-content",
    fw: "font-weight",
    items: "align-items",
    justify: "justify-content",
    select: "user-select",
    self: "align-self",
    vertical: "vertical-align",
    visible: "visibility",
    whitespace: "white-space",
    ws: "white-space"
};
const Xe = [
    [
        /^(.+?)-(\$.+)$/,
        ([, e, t])=>{
            const o = Qe[e];
            if (o) return {
                [o]: N.cssvar(t)
            };
        }
    ]
];
const Ye = [
    [
        /^\[(.*)\]$/,
        ([e, t])=>{
            if (!t.includes(":")) return;
            const [o, ...n] = t.split(":");
            const r = n.join(":");
            if (!isURI(t) && o.match(/^[a-z-]+$/) && isValidCSSBody(r)) {
                const e = N.bracket(`[${r}]`);
                if (e) return {
                    [o]: e
                };
            }
        }
    ]
];
function isValidCSSBody(e) {
    let t = 0;
    function findUntil(o) {
        while(t < e.length){
            t += 1;
            const n = e[t];
            if (n === o) return true;
        }
        return false;
    }
    for(t = 0; t < e.length; t++){
        const o = e[t];
        if ("\"`'".includes(o)) {
            if (!findUntil(o)) return false;
        } else if ("(" === o) {
            if (!findUntil(")")) return false;
        } else if ("[]{}:".includes(o)) return false;
    }
    return true;
}
function isURI(e) {
    if (!e.includes("://")) return false;
    try {
        return "" !== new URL(e).host;
    } catch (e) {
        return false;
    }
}
const Ze = [
    [
        /^(where|\?)$/,
        (e, { constructCSS: t, generator: o })=>{
            if ("dev" === o.userConfig.envMode) return `@keyframes __un_qm{0%{box-shadow:inset 4px 4px #ff1e90, inset -4px -4px #ff1e90}100%{box-shadow:inset 8px 8px #3399ff, inset -8px -8px #3399ff}}\n${t({
                animation: "__un_qm 0.5s ease-in-out alternate infinite"
            })}`;
        }
    ]
];
const et = [
    [
        /^fill-(.+)$/,
        colorResolver("fill", "fill"),
        {
            autocomplete: "fill-$colors"
        }
    ],
    [
        /^fill-op(?:acity)?-?(.+)$/,
        ([, e])=>({
                "--un-fill-opacity": N.bracket.percent.cssvar(e)
            }),
        {
            autocomplete: "fill-(op|opacity)-<percent>"
        }
    ],
    [
        "fill-none",
        {
            fill: "none"
        }
    ],
    [
        /^stroke-(?:width-|size-)?(.+)$/,
        ([, e], { theme: t })=>({
                "stroke-width": t.lineWidth?.[e] ?? N.bracket.cssvar.fraction.px.number(e)
            }),
        {
            autocomplete: [
                "stroke-width-$lineWidth",
                "stroke-size-$lineWidth"
            ]
        }
    ],
    [
        /^stroke-dash-(.+)$/,
        ([, e])=>({
                "stroke-dasharray": N.bracket.cssvar.number(e)
            }),
        {
            autocomplete: "stroke-dash-<num>"
        }
    ],
    [
        /^stroke-offset-(.+)$/,
        ([, e], { theme: t })=>({
                "stroke-dashoffset": t.lineWidth?.[e] ?? N.bracket.cssvar.px.numberWithUnit(e)
            }),
        {
            autocomplete: "stroke-offset-$lineWidth"
        }
    ],
    [
        /^stroke-(.+)$/,
        colorResolver("stroke", "stroke"),
        {
            autocomplete: "stroke-$colors"
        }
    ],
    [
        /^stroke-op(?:acity)?-?(.+)$/,
        ([, e])=>({
                "--un-stroke-opacity": N.bracket.percent.cssvar(e)
            }),
        {
            autocomplete: "stroke-(op|opacity)-<percent>"
        }
    ],
    [
        "stroke-cap-square",
        {
            "stroke-linecap": "square"
        }
    ],
    [
        "stroke-cap-round",
        {
            "stroke-linecap": "round"
        }
    ],
    [
        "stroke-cap-auto",
        {
            "stroke-linecap": "butt"
        }
    ],
    [
        "stroke-join-arcs",
        {
            "stroke-linejoin": "arcs"
        }
    ],
    [
        "stroke-join-bevel",
        {
            "stroke-linejoin": "bevel"
        }
    ],
    [
        "stroke-join-clip",
        {
            "stroke-linejoin": "miter-clip"
        }
    ],
    [
        "stroke-join-round",
        {
            "stroke-linejoin": "round"
        }
    ],
    [
        "stroke-join-auto",
        {
            "stroke-linejoin": "miter"
        }
    ],
    [
        "stroke-none",
        {
            stroke: "none"
        }
    ]
];
const tt = [
    Xe,
    Ye,
    Ke,
    Je,
    f2,
    be,
    ge,
    $e,
    et,
    fe,
    g1,
    k1,
    ze,
    Se,
    Be,
    z,
    we,
    Ce,
    We,
    $1,
    ce,
    he,
    j,
    S,
    Y,
    W,
    je,
    Te,
    Ue,
    Re,
    Ge,
    Me,
    w,
    p1,
    v1,
    b1,
    le,
    m1,
    h1,
    y,
    Ve,
    de,
    ue,
    Ee,
    Ae,
    Oe,
    De,
    Fe,
    He,
    Pe,
    qe,
    _e,
    ve,
    A,
    pe,
    xe,
    d1,
    x1,
    Ze
].flat(1);
const h3 = {
    name: "aria",
    match (e, r) {
        const n = variantGetParameter("aria-", e, r.generator.config.separators);
        if (n) {
            const [t, e] = n;
            const a = N.bracket(t) ?? r.theme.aria?.[t] ?? "";
            if (a) return {
                matcher: e,
                selector: (t)=>`${t}[aria-${a}]`
            };
        }
    }
};
function calcMaxWidthBySize(t) {
    const e = t.match(/^-?[0-9]+\.?[0-9]*/)?.[0] || "";
    const r = t.slice(e.length);
    if ("px" === r) {
        const n = Number.parseFloat(e) - .1;
        return Number.isNaN(n) ? t : `${n}${r}`;
    }
    return `calc(${t} - 0.1px)`;
}
function variantBreakpoints() {
    const t = {};
    return {
        name: "breakpoints",
        match (e, r) {
            const n = Object.entries(resolveBreakpoints(r) ?? {}).map(([t, e], r)=>[
                    t,
                    e,
                    r
                ]);
            for (const [a, s, o] of n){
                t[a] || (t[a] = new RegExp(`^((?:([al]t-|[<~]|max-))?${a}(?:${r.generator.config.separators.join("|")}))`));
                const c = e.match(t[a]);
                if (!c) continue;
                const [, i] = c;
                const l = e.slice(i.length);
                if ("container" === l) continue;
                const p = i.startsWith("lt-") || i.startsWith("<") || i.startsWith("max-");
                const f = i.startsWith("at-") || i.startsWith("~");
                let h = 1e3;
                if (p) {
                    h -= o + 1;
                    return {
                        matcher: l,
                        handle: (t, e)=>e({
                                ...t,
                                parent: `${t.parent ? `${t.parent} $$ ` : ""}@media (max-width: ${calcMaxWidthBySize(s)})`,
                                parentOrder: h
                            })
                    };
                }
                h += o + 1;
                return f && o < n.length - 1 ? {
                    matcher: l,
                    handle: (t, e)=>e({
                            ...t,
                            parent: `${t.parent ? `${t.parent} $$ ` : ""}@media (min-width: ${s}) and (max-width: ${calcMaxWidthBySize(n[o + 1][1])})`,
                            parentOrder: h
                        })
                } : {
                    matcher: l,
                    handle: (t, e)=>e({
                            ...t,
                            parent: `${t.parent ? `${t.parent} $$ ` : ""}@media (min-width: ${s})`,
                            parentOrder: h
                        })
                };
            }
        },
        multiPass: true,
        autocomplete: "(at-|lt-|max-|)$breakpoints:"
    };
}
function scopeMatcher(t, r) {
    return {
        name: `combinator:${t}`,
        match (n, a) {
            if (!n.startsWith(t)) return;
            const s = a.generator.config.separators;
            let c = variantGetBracket(`${t}-`, n, s);
            if (!c) {
                for (const e of s)if (n.startsWith(`${t}${e}`)) {
                    c = [
                        "",
                        n.slice(t.length + e.length)
                    ];
                    break;
                }
                if (!c) return;
            }
            let i = N.bracket(c[0]) ?? "";
            "" === i && (i = "*");
            return {
                matcher: c[1],
                selector: (t)=>`${t}${r}${i}`
            };
        },
        multiPass: true
    };
}
const u3 = [
    scopeMatcher("all", " "),
    scopeMatcher("children", ">"),
    scopeMatcher("next", "+"),
    scopeMatcher("sibling", "+"),
    scopeMatcher("siblings", "~")
];
const m3 = {
    name: "@",
    match (e, r) {
        if (e.startsWith("@container")) return;
        const n = variantGetParameter("@", e, r.generator.config.separators);
        if (n) {
            const [t, e, a] = n;
            const s = N.bracket(t);
            let c;
            if (s) {
                const t = N.numberWithUnit(s);
                t && (c = `(min-width: ${t})`);
            } else c = r.theme.containers?.[t] ?? "";
            if (c) {
                warnOnce("The container query variant is experimental and may not follow semver.");
                return {
                    matcher: e,
                    handle: (t, e)=>e({
                            ...t,
                            parent: `${t.parent ? `${t.parent} $$ ` : ""}@container${a ? ` ${a} ` : " "}${c}`
                        })
                };
            }
        }
    },
    multiPass: true
};
function variantColorsMediaOrClass(t = {}) {
    if ("class" === t?.dark || "object" === typeof t.dark) {
        const { dark: e = ".dark", light: n = ".light" } = "string" === typeof t.dark ? {} : t.dark;
        return [
            variantMatcher("dark", (t)=>({
                    prefix: `${e} $$ ${t.prefix}`
                })),
            variantMatcher("light", (t)=>({
                    prefix: `${n} $$ ${t.prefix}`
                }))
        ];
    }
    return [
        variantParentMatcher("dark", "@media (prefers-color-scheme: dark)"),
        variantParentMatcher("light", "@media (prefers-color-scheme: light)")
    ];
}
const $2 = {
    name: "data",
    match (e, r) {
        const n = variantGetParameter("data-", e, r.generator.config.separators);
        if (n) {
            const [t, e] = n;
            const a = N.bracket(t) ?? r.theme.data?.[t] ?? "";
            if (a) return {
                matcher: e,
                selector: (t)=>`${t}[data-${a}]`
            };
        }
    }
};
const d3 = {
    name: "group-data",
    match (e, r) {
        const n = variantGetParameter("group-data-", e, r.generator.config.separators);
        if (n) {
            const [t, e] = n;
            const a = N.bracket(t) ?? r.theme.data?.[t] ?? "";
            if (a) return {
                matcher: `group-[[data-${a}]]:${e}`
            };
        }
    }
};
const g3 = [
    variantMatcher("rtl", (t)=>({
            prefix: `[dir="rtl"] $$ ${t.prefix}`
        })),
    variantMatcher("ltr", (t)=>({
            prefix: `[dir="ltr"] $$ ${t.prefix}`
        }))
];
const b3 = {
    name: "selector",
    match (t, r) {
        const n = variantGetBracket("selector-", t, r.generator.config.separators);
        if (n) {
            const [t, e] = n;
            const r = N.bracket(t);
            if (r) return {
                matcher: e,
                selector: ()=>r
            };
        }
    }
};
const k3 = {
    name: "layer",
    match (e, r) {
        const n = variantGetParameter("layer-", e, r.generator.config.separators);
        if (n) {
            const [t, e] = n;
            const r = N.bracket(t) ?? t;
            if (r) return {
                matcher: e,
                handle: (t, e)=>e({
                        ...t,
                        parent: `${t.parent ? `${t.parent} $$ ` : ""}@layer ${r}`
                    })
            };
        }
    }
};
const x3 = {
    name: "uno-layer",
    match (e, r) {
        const n = variantGetParameter("uno-layer-", e, r.generator.config.separators);
        if (n) {
            const [t, e] = n;
            const r = N.bracket(t) ?? t;
            if (r) return {
                matcher: e,
                layer: r
            };
        }
    }
};
const v3 = {
    name: "scope",
    match (t, r) {
        const n = variantGetBracket("scope-", t, r.generator.config.separators);
        if (n) {
            const [t, e] = n;
            const r = N.bracket(t);
            if (r) return {
                matcher: e,
                selector: (t)=>`${r} $$ ${t}`
            };
        }
    }
};
const y1 = {
    name: "variables",
    match (t, e) {
        if (!t.startsWith("[")) return;
        const [r, n] = getBracket(t, "[", "]") ?? [];
        if (!(r && n)) return;
        let s;
        for (const t of e.generator.config.separators)if (n.startsWith(t)) {
            s = n.slice(t.length);
            break;
        }
        if (null == s) return;
        const c = N.bracket(r) ?? "";
        const i = c.startsWith("@");
        return i || c.includes("&") ? {
            matcher: s,
            handle (t, e) {
                const r = i ? {
                    parent: `${t.parent ? `${t.parent} $$ ` : ""}${c}`
                } : {
                    selector: c.replace(/&/g, t.selector)
                };
                return e({
                    ...t,
                    ...r
                });
            }
        } : void 0;
    },
    multiPass: true
};
const w2 = /[0-9.]+(?:[a-z]+|%)?/;
const j2 = [
    /opacity|color|flex/
];
function negateFunctions(t) {
    const e = t.match(/^(calc|clamp|max|min)\s*(\(.*)/);
    if (e) {
        const [t, r] = getStringComponent(e[2], "(", ")", " ") ?? [];
        if (t) return `calc(${e[1]}${t} * -1)${r ? ` ${r}` : ""}`;
    }
}
const P = {
    name: "negative",
    match (t) {
        if (t.startsWith("-")) return {
            matcher: t.slice(1),
            body: (t)=>{
                if (t.find((t)=>t[0] === x)) return;
                let e = false;
                t.forEach((t)=>{
                    const r = t[1]?.toString();
                    if (!r || "0" === r) return;
                    if (j2.some((e)=>t[0].match(e))) return;
                    const n = negateFunctions(r);
                    if (n) {
                        t[1] = n;
                        e = true;
                    } else if (w2.test(r)) {
                        t[1] = r.replace(w2, (t)=>`-${t}`);
                        e = true;
                    }
                });
                return e ? t : [];
            }
        };
    }
};
function variantImportant() {
    let t;
    return {
        name: "important",
        match (e, r) {
            t || (t = new RegExp(`^(important(?:${r.generator.config.separators.join("|")})|!)`));
            let n;
            const a = e.match(t);
            a ? n = e.slice(a[0].length) : e.endsWith("!") && (n = e.slice(0, -1));
            if (n) return {
                matcher: n,
                body: (t)=>{
                    t.forEach((t)=>{
                        t[1] && (t[1] += " !important");
                    });
                    return t;
                }
            };
        }
    };
}
const W1 = variantParentMatcher("print", "@media print");
const C = {
    name: "media",
    match (e, r) {
        const n = variantGetParameter("media-", e, r.generator.config.separators);
        if (n) {
            const [t, e] = n;
            let a = N.bracket(t) ?? "";
            "" === a && (a = r.theme.media?.[t] ?? "");
            if (a) return {
                matcher: e,
                handle: (t, e)=>e({
                        ...t,
                        parent: `${t.parent ? `${t.parent} $$ ` : ""}@media ${a}`
                    })
            };
        }
    },
    multiPass: true
};
const E1 = {
    name: "supports",
    match (e, r) {
        const n = variantGetParameter("supports-", e, r.generator.config.separators);
        if (n) {
            const [t, e] = n;
            let a = N.bracket(t) ?? "";
            "" === a && (a = r.theme.supports?.[t] ?? "");
            if (a) return {
                matcher: e,
                handle: (t, e)=>e({
                        ...t,
                        parent: `${t.parent ? `${t.parent} $$ ` : ""}@supports ${a}`
                    })
            };
        }
    },
    multiPass: true
};
const M = Object.fromEntries([
    [
        "first-letter",
        "::first-letter"
    ],
    [
        "first-line",
        "::first-line"
    ],
    "any-link",
    "link",
    "visited",
    "target",
    [
        "open",
        "[open]"
    ],
    "default",
    "checked",
    "indeterminate",
    "placeholder-shown",
    "autofill",
    "optional",
    "required",
    "valid",
    "invalid",
    "in-range",
    "out-of-range",
    "read-only",
    "read-write",
    "empty",
    "focus-within",
    "hover",
    "focus",
    "focus-visible",
    "active",
    "enabled",
    "disabled",
    "root",
    "empty",
    [
        "even-of-type",
        ":nth-of-type(even)"
    ],
    [
        "even",
        ":nth-child(even)"
    ],
    [
        "odd-of-type",
        ":nth-of-type(odd)"
    ],
    [
        "odd",
        ":nth-child(odd)"
    ],
    "first-of-type",
    [
        "first",
        ":first-child"
    ],
    "last-of-type",
    [
        "last",
        ":last-child"
    ],
    "only-child",
    "only-of-type",
    [
        "backdrop-element",
        "::backdrop"
    ],
    [
        "placeholder",
        "::placeholder"
    ],
    [
        "before",
        "::before"
    ],
    [
        "after",
        "::after"
    ],
    [
        "selection",
        "::selection"
    ],
    [
        "marker",
        "::marker"
    ],
    [
        "file",
        "::file-selector-button"
    ]
].map((t)=>Array.isArray(t) ? t : [
        t,
        `:${t}`
    ]));
const O = Object.keys(M);
const R1 = Object.fromEntries([
    [
        "backdrop",
        "::backdrop"
    ]
].map((t)=>Array.isArray(t) ? t : [
        t,
        `:${t}`
    ]));
const A2 = Object.keys(R1);
const B = [
    "not",
    "is",
    "where",
    "has"
];
const z2 = Object.entries(M).filter(([, t])=>!t.startsWith("::")).map(([t])=>t).sort((t, e)=>e.length - t.length).join("|");
const F1 = Object.entries(R1).filter(([, t])=>!t.startsWith("::")).map(([t])=>t).sort((t, e)=>e.length - t.length).join("|");
const S2 = B.join("|");
function taggedPseudoClassMatcher(t, r, n) {
    const a = new RegExp(`^(${escapeRegExp(r)}:)(\\S+)${escapeRegExp(n)}\\1`);
    let s;
    let c;
    let i;
    let h;
    const matchBracket = (n)=>{
        const a = variantGetBracket(`${t}-`, n, []);
        if (!a) return;
        const [c, i] = a;
        const l = N.bracket(c);
        if (null == l) return;
        const p = i.split(s, 1)?.[0] ?? "";
        const h = `${r}${escapeSelector(p)}`;
        return [
            p,
            n.slice(n.length - (i.length - p.length - 1)),
            l.includes("&") ? l.replace(/&/g, h) : `${h}${l}`
        ];
    };
    const matchPseudo = (t)=>{
        const e = t.match(c) || t.match(i);
        if (!e) return;
        const [n, a, s] = e;
        const o = e[3] ?? "";
        let l = M[s] || R1[s] || `:${s}`;
        a && (l = `:${a}(${l})`);
        return [
            o,
            t.slice(n.length),
            `${r}${escapeSelector(o)}${l}`,
            s
        ];
    };
    const matchPseudoVar = (t)=>{
        const e = t.match(h);
        if (!e) return;
        const [n, a, s] = e;
        const o = e[3] ?? "";
        const c = `:${a}(${s})`;
        return [
            o,
            t.slice(n.length),
            `${r}${escapeSelector(o)}${c}`
        ];
    };
    return {
        name: `pseudo:${t}`,
        match (e, r) {
            if (!(s && c && i)) {
                s = new RegExp(`(?:${r.generator.config.separators.join("|")})`);
                c = new RegExp(`^${t}-(?:(?:(${S2})-)?(${z2}))(?:(/\\w+))?(?:${r.generator.config.separators.join("|")})`);
                i = new RegExp(`^${t}-(?:(?:(${S2})-)?(${F1}))(?:(/\\w+))?(?:${r.generator.config.separators.filter((t)=>"-" !== t).join("|")})`);
                h = new RegExp(`^${t}-(?:(${S2})-)?\\[(.+)\\](?:(/\\w+))?(?:${r.generator.config.separators.filter((t)=>"-" !== t).join("|")})`);
            }
            if (!e.startsWith(t)) return;
            const o = matchBracket(e) || matchPseudo(e) || matchPseudoVar(e);
            if (!o) return;
            const [p, f, u, m = ""] = o;
            "" !== p && warnOnce("The labeled variant is experimental and may not follow semver.");
            return {
                matcher: f,
                handle: (t, e)=>e({
                        ...t,
                        prefix: `${u}${n}${t.prefix}`.replace(a, "$1$2:"),
                        sort: O.indexOf(m) ?? A2.indexOf(m)
                    })
            };
        },
        multiPass: true
    };
}
const T2 = [
    "::-webkit-resizer",
    "::-webkit-scrollbar",
    "::-webkit-scrollbar-button",
    "::-webkit-scrollbar-corner",
    "::-webkit-scrollbar-thumb",
    "::-webkit-scrollbar-track",
    "::-webkit-scrollbar-track-piece",
    "::file-selector-button"
];
const N1 = Object.entries(M).map(([t])=>t).sort((t, e)=>e.length - t.length).join("|");
const I1 = Object.entries(R1).map(([t])=>t).sort((t, e)=>e.length - t.length).join("|");
function variantPseudoClassesAndElements() {
    let t;
    let e;
    return {
        name: "pseudo",
        match (r, n) {
            if (!(t && t)) {
                t = new RegExp(`^(${N1})(?:${n.generator.config.separators.join("|")})`);
                e = new RegExp(`^(${I1})(?:${n.generator.config.separators.filter((t)=>"-" !== t).join("|")})`);
            }
            const a = r.match(t) || r.match(e);
            if (a) {
                const t = M[a[1]] || R1[a[1]] || `:${a[1]}`;
                let e = O.indexOf(a[1]);
                -1 === e && (e = A2.indexOf(a[1]));
                -1 === e && (e = void 0);
                return {
                    matcher: r.slice(a[0].length),
                    handle: (r, n)=>{
                        const a = t.startsWith("::") && !T2.includes(t) ? {
                            pseudo: `${r.pseudo}${t}`
                        } : {
                            selector: `${r.selector}${t}`
                        };
                        return n({
                            ...r,
                            ...a,
                            sort: e,
                            noMerge: true
                        });
                    }
                };
            }
        },
        multiPass: true,
        autocomplete: `(${N1}|${I1}):`
    };
}
function variantPseudoClassFunctions() {
    let t;
    let e;
    let r;
    return {
        match (n, s) {
            if (!(t && e)) {
                t = new RegExp(`^(${S2})-(${z2})(?:${s.generator.config.separators.join("|")})`);
                e = new RegExp(`^(${S2})-(${F1})(?:${s.generator.config.separators.filter((t)=>"-" !== t).join("|")})`);
                r = new RegExp(`^(${S2})-(\\[.+\\])(?:${s.generator.config.separators.filter((t)=>"-" !== t).join("|")})`);
            }
            const c = n.match(t) || n.match(e) || n.match(r);
            if (c) {
                const t = c[1];
                const e = getBracket(c[2], "[", "]");
                const r = e ? N.bracket(c[2]) : M[c[2]] || R1[c[2]] || `:${c[2]}`;
                return {
                    matcher: n.slice(c[0].length),
                    selector: (e)=>`${e}:${t}(${r})`
                };
            }
        },
        multiPass: true,
        autocomplete: `(${S2})-(${z2}|${F1}):`
    };
}
function variantTaggedPseudoClasses(t = {}) {
    const e = !!t?.attributifyPseudo;
    return [
        taggedPseudoClassMatcher("group", e ? '[group=""]' : ".group", " "),
        taggedPseudoClassMatcher("peer", e ? '[peer=""]' : ".peer", "~"),
        taggedPseudoClassMatcher("parent", e ? '[parent=""]' : ".parent", ">"),
        taggedPseudoClassMatcher("previous", e ? '[previous=""]' : ".previous", "+")
    ];
}
const q1 = /(part-\[(.+)]:)(.+)/;
const U2 = {
    match (t) {
        const e = t.match(q1);
        if (e) {
            const r = `part(${e[2]})`;
            return {
                matcher: t.slice(e[1].length),
                selector: (t)=>`${t}::${r}`
            };
        }
    },
    multiPass: true
};
function variants(t) {
    return [
        h3,
        $2,
        k3,
        b3,
        x3,
        P,
        variantImportant(),
        E1,
        W1,
        C,
        variantBreakpoints(),
        ...u3,
        variantPseudoClassesAndElements(),
        variantPseudoClassFunctions(),
        ...variantTaggedPseudoClasses(t),
        U2,
        ...variantColorsMediaOrClass(t),
        ...g3,
        v3,
        m3,
        y1,
        d3
    ];
}
const n1 = [
    {
        layer: "preflights",
        getCSS (t) {
            if (t.theme.preflightBase) {
                const o = entriesToCss(Object.entries(t.theme.preflightBase));
                const s = toArray(t.theme.preflightRoot ?? [
                    "*,::before,::after",
                    "::backdrop"
                ]);
                return s.map((r)=>`${r}{${o}}`).join("");
            }
        }
    }
];
const l4 = {
    position: [
        "relative",
        "absolute",
        "fixed",
        "sticky",
        "static"
    ],
    globalKeyword: b
};
const m4 = definePreset((r = {})=>{
    r.dark = r.dark ?? "class";
    r.attributifyPseudo = r.attributifyPseudo ?? false;
    r.preflight = r.preflight ?? true;
    r.variablePrefix = r.variablePrefix ?? "un-";
    return {
        name: "@unocss/preset-mini",
        theme: I,
        rules: tt,
        variants: variants(r),
        options: r,
        prefix: r.prefix,
        postprocess: VarPrefixPostprocessor(r.variablePrefix),
        preflights: r.preflight ? normalizePreflights(n1, r.variablePrefix) : [],
        extractorDefault: false === r.arbitraryVariants ? void 0 : n,
        autocomplete: {
            shorthands: l4
        }
    };
});
function VarPrefixPostprocessor(r) {
    if ("un-" !== r) return (e)=>{
        e.entries.forEach((e)=>{
            e[0] = e[0].replace(/^--un-/, `--${r}`);
            "string" === typeof e[1] && (e[1] = e[1].replace(/var\(--un-/g, `var(--${r}`));
        });
    };
}
function normalizePreflights(r, e) {
    return "un-" !== e ? r.map((r)=>({
            ...r,
            getCSS: (()=>async (t)=>{
                    const o = await r.getCSS(t);
                    if (o) return o.replace(/--un-/g, `--${e}`);
                })()
        })) : r;
}
const Y1 = [
    [
        /^(?:animate-)?keyframes-(.+)$/,
        ([, t], { theme: e })=>{
            const r = e.animation?.keyframes?.[t];
            if (r) return [
                `@keyframes ${t}${r}`,
                {
                    animation: t
                }
            ];
        },
        {
            autocomplete: [
                "animate-keyframes-$animation.keyframes",
                "keyframes-$animation.keyframes"
            ]
        }
    ],
    [
        /^animate-(.+)$/,
        ([, t], { theme: e })=>{
            const r = e.animation?.keyframes?.[t];
            if (r) {
                const o = e.animation?.durations?.[t] ?? "1s";
                const a = e.animation?.timingFns?.[t] ?? "linear";
                const n = e.animation?.counts?.[t] ?? 1;
                const i = e.animation?.properties?.[t];
                return [
                    `@keyframes ${t}${r}`,
                    {
                        animation: `${t} ${o} ${a} ${n}`,
                        ...i
                    }
                ];
            }
            return {
                animation: N.bracket.cssvar(t)
            };
        },
        {
            autocomplete: "animate-$animation.keyframes"
        }
    ],
    [
        /^animate-name-(.+)/,
        ([, t])=>({
                "animation-name": N.bracket.cssvar(t) ?? t
            })
    ],
    [
        /^animate-duration-(.+)$/,
        ([, t], { theme: e })=>({
                "animation-duration": e.duration?.[t || "DEFAULT"] ?? N.bracket.cssvar.time(t)
            }),
        {
            autocomplete: [
                "animate-duration",
                "animate-duration-$duration"
            ]
        }
    ],
    [
        /^animate-delay-(.+)$/,
        ([, t], { theme: e })=>({
                "animation-delay": e.duration?.[t || "DEFAULT"] ?? N.bracket.cssvar.time(t)
            }),
        {
            autocomplete: [
                "animate-delay",
                "animate-delay-$duration"
            ]
        }
    ],
    [
        /^animate-ease(?:-(.+))?$/,
        ([, t], { theme: e })=>({
                "animation-timing-function": e.easing?.[t || "DEFAULT"] ?? N.bracket.cssvar(t)
            }),
        {
            autocomplete: [
                "animate-ease",
                "animate-ease-$easing"
            ]
        }
    ],
    [
        /^animate-(fill-mode-|fill-|mode-)?(.+)$/,
        ([, t, e])=>[
                "none",
                "forwards",
                "backwards",
                "both",
                t ? b : []
            ].includes(e) ? {
                "animation-fill-mode": e
            } : void 0,
        {
            autocomplete: [
                "animate-(fill|mode|fill-mode)",
                "animate-(fill|mode|fill-mode)-(none|forwards|backwards|both|inherit|initial|revert|revert-layer|unset)",
                "animate-(none|forwards|backwards|both|inherit|initial|revert|revert-layer|unset)"
            ]
        }
    ],
    [
        /^animate-(direction-)?(.+)$/,
        ([, t, e])=>[
                "normal",
                "reverse",
                "alternate",
                "alternate-reverse",
                t ? b : []
            ].includes(e) ? {
                "animation-direction": e
            } : void 0,
        {
            autocomplete: [
                "animate-direction",
                "animate-direction-(normal|reverse|alternate|alternate-reverse|inherit|initial|revert|revert-layer|unset)",
                "animate-(normal|reverse|alternate|alternate-reverse|inherit|initial|revert|revert-layer|unset)"
            ]
        }
    ],
    [
        /^animate-(?:iteration-count-|iteration-|count-)(.+)$/,
        ([, t])=>({
                "animation-iteration-count": N.bracket.cssvar(t) ?? t.replace(/\-/g, ",")
            }),
        {
            autocomplete: [
                "animate-(iteration|count|iteration-count)",
                "animate-(iteration|count|iteration-count)-<num>"
            ]
        }
    ],
    [
        /^animate-(play-state-|play-|state-)?(.+)$/,
        ([, t, e])=>[
                "paused",
                "running",
                t ? b : []
            ].includes(e) ? {
                "animation-play-state": e
            } : void 0,
        {
            autocomplete: [
                "animate-(play|state|play-state)",
                "animate-(play|state|play-state)-(paused|running|inherit|initial|revert|revert-layer|unset)",
                "animate-(paused|running|inherit|initial|revert|revert-layer|unset)"
            ]
        }
    ],
    [
        "animate-none",
        {
            animation: "none"
        }
    ],
    ...makeGlobalStaticRules("animate", "animation")
];
function bgGradientToValue(t) {
    return t ? colorToString(t, 0) : "rgba(255,255,255,0)";
}
function bgGradientColorValue(t, e, r, o) {
    return e ? colorToString(e, null != o ? o : `var(--un-${t}-opacity, ${colorOpacityToString(e)})`) : colorToString(r, o);
}
function bgGradientColorResolver() {
    return ([, t, e], { theme: r })=>{
        const o = parseColor1(e, r);
        if (!o) return;
        const { alpha: a, color: n, cssColor: i } = o;
        if (!n) return;
        const c = bgGradientColorValue(t, i, n, a);
        switch(t){
            case "from":
                return {
                    "--un-gradient-from-position": "0%",
                    "--un-gradient-from": `${c} var(--un-gradient-from-position)`,
                    "--un-gradient-to-position": "100%",
                    "--un-gradient-to": `${bgGradientToValue(i)} var(--un-gradient-to-position)`,
                    "--un-gradient-stops": "var(--un-gradient-from), var(--un-gradient-to)"
                };
            case "via":
                return {
                    "--un-gradient-via-position": "50%",
                    "--un-gradient-to": bgGradientToValue(i),
                    "--un-gradient-stops": `var(--un-gradient-from), ${c} var(--un-gradient-via-position), var(--un-gradient-to)`
                };
            case "to":
                return {
                    "--un-gradient-to-position": "100%",
                    "--un-gradient-to": `${c} var(--un-gradient-to-position)`
                };
        }
    };
}
function bgGradientPositionResolver() {
    return ([, t, e])=>({
            [`--un-gradient-${t}-position`]: 100 * Number(N.bracket.cssvar.percent(e)) + "%"
        });
}
const _ = /^\[url\(.+\)\]$/;
const F2 = /^\[length:.+\]$/;
const D1 = /^\[position:.+\]$/;
const E2 = [
    [
        /^bg-(.+)$/,
        ([, t])=>_.test(t) ? {
                "--un-url": N.bracket(t),
                "background-image": "var(--un-url)"
            } : F2.test(t) && null != N.bracketOfLength(t) ? {
                "background-size": N.bracketOfLength(t).split(" ").map((t)=>N.fraction.auto.px.cssvar(t) ?? t).join(" ")
            } : D1.test(t) && null != N.bracketOfPosition(t) ? {
                "background-position": N.bracketOfPosition(t).split(" ").map((t)=>N.position.fraction.auto.px.cssvar(t) ?? t).join(" ")
            } : void 0
    ],
    [
        /^bg-gradient-(.+)$/,
        ([, t])=>({
                "--un-gradient": N.bracket(t)
            }),
        {
            autocomplete: [
                "bg-gradient",
                "bg-gradient-(from|to|via)",
                "bg-gradient-(from|to|via)-$colors",
                "bg-gradient-(from|to|via)-(op|opacity)",
                "bg-gradient-(from|to|via)-(op|opacity)-<percent>"
            ]
        }
    ],
    [
        /^(?:bg-gradient-)?stops-(\[.+\])$/,
        ([, t])=>({
                "--un-gradient-stops": N.bracket(t)
            })
    ],
    [
        /^(?:bg-gradient-)?(from)-(.+)$/,
        bgGradientColorResolver()
    ],
    [
        /^(?:bg-gradient-)?(via)-(.+)$/,
        bgGradientColorResolver()
    ],
    [
        /^(?:bg-gradient-)?(to)-(.+)$/,
        bgGradientColorResolver()
    ],
    [
        /^(?:bg-gradient-)?(from|via|to)-op(?:acity)?-?(.+)$/,
        ([, t, e])=>({
                [`--un-${t}-opacity`]: N.bracket.percent(e)
            })
    ],
    [
        /^(from|via|to)-([\d\.]+)%$/,
        bgGradientPositionResolver()
    ],
    [
        /^bg-gradient-((?:repeating-)?(?:linear|radial|conic))$/,
        ([, t])=>({
                "background-image": `${t}-gradient(var(--un-gradient, var(--un-gradient-stops, rgba(255, 255, 255, 0))))`
            }),
        {
            autocomplete: [
                "bg-gradient-repeating",
                "bg-gradient-(linear|radial|conic)",
                "bg-gradient-repeating-(linear|radial|conic)"
            ]
        }
    ],
    [
        /^bg-gradient-to-([rltb]{1,2})$/,
        ([, t])=>{
            if (t in f) return {
                "--un-gradient-shape": `to ${f[t]}`,
                "--un-gradient": "var(--un-gradient-shape), var(--un-gradient-stops)",
                "background-image": "linear-gradient(var(--un-gradient))"
            };
        },
        {
            autocomplete: `bg-gradient-to-(${Object.keys(f).filter((t)=>t.length <= 2 && Array.from(t).every((t)=>"rltb".includes(t))).join("|")})`
        }
    ],
    [
        /^(?:bg-gradient-)?shape-(.+)$/,
        ([, t])=>{
            const e = t in f ? `to ${f[t]}` : N.bracket(t);
            if (null != e) return {
                "--un-gradient-shape": e,
                "--un-gradient": "var(--un-gradient-shape), var(--un-gradient-stops)"
            };
        },
        {
            autocomplete: [
                "bg-gradient-shape",
                `bg-gradient-shape-(${Object.keys(f).join("|")})`,
                `shape-(${Object.keys(f).join("|")})`
            ]
        }
    ],
    [
        "bg-none",
        {
            "background-image": "none"
        }
    ],
    [
        "box-decoration-slice",
        {
            "box-decoration-break": "slice"
        }
    ],
    [
        "box-decoration-clone",
        {
            "box-decoration-break": "clone"
        }
    ],
    ...makeGlobalStaticRules("box-decoration", "box-decoration-break"),
    [
        "bg-auto",
        {
            "background-size": "auto"
        }
    ],
    [
        "bg-cover",
        {
            "background-size": "cover"
        }
    ],
    [
        "bg-contain",
        {
            "background-size": "contain"
        }
    ],
    [
        "bg-fixed",
        {
            "background-attachment": "fixed"
        }
    ],
    [
        "bg-local",
        {
            "background-attachment": "local"
        }
    ],
    [
        "bg-scroll",
        {
            "background-attachment": "scroll"
        }
    ],
    [
        "bg-clip-border",
        {
            "-webkit-background-clip": "border-box",
            "background-clip": "border-box"
        }
    ],
    [
        "bg-clip-content",
        {
            "-webkit-background-clip": "content-box",
            "background-clip": "content-box"
        }
    ],
    [
        "bg-clip-padding",
        {
            "-webkit-background-clip": "padding-box",
            "background-clip": "padding-box"
        }
    ],
    [
        "bg-clip-text",
        {
            "-webkit-background-clip": "text",
            "background-clip": "text"
        }
    ],
    ...b.map((t)=>[
            `bg-clip-${t}`,
            {
                "-webkit-background-clip": t,
                "background-clip": t
            }
        ]),
    [
        /^bg-([-\w]{3,})$/,
        ([, t])=>({
                "background-position": f[t]
            })
    ],
    [
        "bg-repeat",
        {
            "background-repeat": "repeat"
        }
    ],
    [
        "bg-no-repeat",
        {
            "background-repeat": "no-repeat"
        }
    ],
    [
        "bg-repeat-x",
        {
            "background-repeat": "repeat-x"
        }
    ],
    [
        "bg-repeat-y",
        {
            "background-repeat": "repeat-y"
        }
    ],
    [
        "bg-repeat-round",
        {
            "background-repeat": "round"
        }
    ],
    [
        "bg-repeat-space",
        {
            "background-repeat": "space"
        }
    ],
    ...makeGlobalStaticRules("bg-repeat", "background-repeat"),
    [
        "bg-origin-border",
        {
            "background-origin": "border-box"
        }
    ],
    [
        "bg-origin-padding",
        {
            "background-origin": "padding-box"
        }
    ],
    [
        "bg-origin-content",
        {
            "background-origin": "content-box"
        }
    ],
    ...makeGlobalStaticRules("bg-origin", "background-origin")
];
const O1 = {
    disc: "disc",
    circle: "circle",
    square: "square",
    decimal: "decimal",
    "zero-decimal": "decimal-leading-zero",
    greek: "lower-greek",
    roman: "lower-roman",
    "upper-roman": "upper-roman",
    alpha: "lower-alpha",
    "upper-alpha": "upper-alpha",
    latin: "lower-latin",
    "upper-latin": "upper-latin"
};
const S3 = [
    [
        /^list-(.+?)(?:-(outside|inside))?$/,
        ([, t, e])=>{
            const r = O1[t];
            if (r) return e ? {
                "list-style-position": e,
                "list-style-type": r
            } : {
                "list-style-type": r
            };
        },
        {
            autocomplete: [
                `list-(${Object.keys(O1).join("|")})`,
                `list-(${Object.keys(O1).join("|")})-(outside|inside)`
            ]
        }
    ],
    [
        "list-outside",
        {
            "list-style-position": "outside"
        }
    ],
    [
        "list-inside",
        {
            "list-style-position": "inside"
        }
    ],
    [
        "list-none",
        {
            "list-style-type": "none"
        }
    ],
    [
        /^list-image-(.+)$/,
        ([, t])=>{
            if (/^\[url\(.+\)\]$/.test(t)) return {
                "list-style-image": N.bracket(t)
            };
        }
    ],
    [
        "list-image-none",
        {
            "list-style-image": "none"
        }
    ],
    ...makeGlobalStaticRules("list", "list-style-type")
];
const W2 = [
    [
        /^accent-(.+)$/,
        colorResolver("accent-color", "accent"),
        {
            autocomplete: "accent-$colors"
        }
    ],
    [
        /^accent-op(?:acity)?-?(.+)$/,
        ([, t])=>({
                "--un-accent-opacity": N.bracket.percent(t)
            }),
        {
            autocomplete: [
                "accent-(op|opacity)",
                "accent-(op|opacity)-<percent>"
            ]
        }
    ]
];
const T3 = [
    [
        /^caret-(.+)$/,
        colorResolver("caret-color", "caret"),
        {
            autocomplete: "caret-$colors"
        }
    ],
    [
        /^caret-op(?:acity)?-?(.+)$/,
        ([, t])=>({
                "--un-caret-opacity": N.bracket.percent(t)
            }),
        {
            autocomplete: [
                "caret-(op|opacity)",
                "caret-(op|opacity)-<percent>"
            ]
        }
    ]
];
const A3 = [
    [
        "image-render-auto",
        {
            "image-rendering": "auto"
        }
    ],
    [
        "image-render-edge",
        {
            "image-rendering": "crisp-edges"
        }
    ],
    [
        "image-render-pixel",
        [
            [
                "-ms-interpolation-mode",
                "nearest-neighbor"
            ],
            [
                "image-rendering",
                "-webkit-optimize-contrast"
            ],
            [
                "image-rendering",
                "-moz-crisp-edges"
            ],
            [
                "image-rendering",
                "-o-pixelated"
            ],
            [
                "image-rendering",
                "pixelated"
            ]
        ]
    ]
];
const G = [
    [
        "overscroll-auto",
        {
            "overscroll-behavior": "auto"
        }
    ],
    [
        "overscroll-contain",
        {
            "overscroll-behavior": "contain"
        }
    ],
    [
        "overscroll-none",
        {
            "overscroll-behavior": "none"
        }
    ],
    ...makeGlobalStaticRules("overscroll", "overscroll-behavior"),
    [
        "overscroll-x-auto",
        {
            "overscroll-behavior-x": "auto"
        }
    ],
    [
        "overscroll-x-contain",
        {
            "overscroll-behavior-x": "contain"
        }
    ],
    [
        "overscroll-x-none",
        {
            "overscroll-behavior-x": "none"
        }
    ],
    ...makeGlobalStaticRules("overscroll-x", "overscroll-behavior-x"),
    [
        "overscroll-y-auto",
        {
            "overscroll-behavior-y": "auto"
        }
    ],
    [
        "overscroll-y-contain",
        {
            "overscroll-behavior-y": "contain"
        }
    ],
    [
        "overscroll-y-none",
        {
            "overscroll-behavior-y": "none"
        }
    ],
    ...makeGlobalStaticRules("overscroll-y", "overscroll-behavior-y")
];
const C1 = [
    [
        "scroll-auto",
        {
            "scroll-behavior": "auto"
        }
    ],
    [
        "scroll-smooth",
        {
            "scroll-behavior": "smooth"
        }
    ],
    ...makeGlobalStaticRules("scroll", "scroll-behavior")
];
const L1 = [
    [
        /^columns-(.+)$/,
        ([, t])=>({
                columns: N.bracket.global.number.auto.numberWithUnit(t)
            }),
        {
            autocomplete: "columns-<num>"
        }
    ],
    [
        "break-before-auto",
        {
            "break-before": "auto"
        }
    ],
    [
        "break-before-avoid",
        {
            "break-before": "avoid"
        }
    ],
    [
        "break-before-all",
        {
            "break-before": "all"
        }
    ],
    [
        "break-before-avoid-page",
        {
            "break-before": "avoid-page"
        }
    ],
    [
        "break-before-page",
        {
            "break-before": "page"
        }
    ],
    [
        "break-before-left",
        {
            "break-before": "left"
        }
    ],
    [
        "break-before-right",
        {
            "break-before": "right"
        }
    ],
    [
        "break-before-column",
        {
            "break-before": "column"
        }
    ],
    ...makeGlobalStaticRules("break-before"),
    [
        "break-inside-auto",
        {
            "break-inside": "auto"
        }
    ],
    [
        "break-inside-avoid",
        {
            "break-inside": "avoid"
        }
    ],
    [
        "break-inside-avoid-page",
        {
            "break-inside": "avoid-page"
        }
    ],
    [
        "break-inside-avoid-column",
        {
            "break-inside": "avoid-column"
        }
    ],
    ...makeGlobalStaticRules("break-inside"),
    [
        "break-after-auto",
        {
            "break-after": "auto"
        }
    ],
    [
        "break-after-avoid",
        {
            "break-after": "avoid"
        }
    ],
    [
        "break-after-all",
        {
            "break-after": "all"
        }
    ],
    [
        "break-after-avoid-page",
        {
            "break-after": "avoid-page"
        }
    ],
    [
        "break-after-page",
        {
            "break-after": "page"
        }
    ],
    [
        "break-after-left",
        {
            "break-after": "left"
        }
    ],
    [
        "break-after-right",
        {
            "break-after": "right"
        }
    ],
    [
        "break-after-column",
        {
            "break-after": "column"
        }
    ],
    ...makeGlobalStaticRules("break-after")
];
const U3 = /@media \(min-width: (.+)\)/;
const R2 = [
    [
        /^__container$/,
        (e, r)=>{
            const { theme: o, variantHandlers: a } = r;
            const n = o.container?.padding;
            let i;
            i = isString(n) ? n : n?.DEFAULT;
            const s = o.container?.maxWidth;
            let c;
            for (const e of a){
                const o = e.handle?.({}, (t)=>t)?.parent;
                if (isString(o)) {
                    const e = o.match(U3)?.[1];
                    if (e) {
                        const o = resolveBreakpoints(r) ?? {};
                        const a = Object.keys(o).find((t)=>o[t] === e);
                        s ? a && (c = s?.[a]) : c = e;
                        a && !isString(n) && (i = n?.[a] ?? i);
                    }
                }
            }
            const l = {
                "max-width": c
            };
            a.length || (l.width = "100%");
            if (o.container?.center) {
                l["margin-left"] = "auto";
                l["margin-right"] = "auto";
            }
            if (n) {
                l["padding-left"] = i;
                l["padding-right"] = i;
            }
            return l;
        },
        {
            internal: true
        }
    ]
];
const V = [
    [
        /^(?:(\w+)[:-])?container$/,
        ([, t], e)=>{
            let r = Object.keys(resolveBreakpoints(e) ?? {});
            if (t) {
                if (!r.includes(t)) return;
                r = r.slice(r.indexOf(t));
            }
            const o = r.map((t)=>`${t}:__container`);
            t || o.unshift("__container");
            return o;
        }
    ]
];
const P1 = {
    "--un-blur": u1,
    "--un-brightness": u1,
    "--un-contrast": u1,
    "--un-drop-shadow": u1,
    "--un-grayscale": u1,
    "--un-hue-rotate": u1,
    "--un-invert": u1,
    "--un-saturate": u1,
    "--un-sepia": u1
};
const q2 = "var(--un-blur) var(--un-brightness) var(--un-contrast) var(--un-drop-shadow) var(--un-grayscale) var(--un-hue-rotate) var(--un-invert) var(--un-saturate) var(--un-sepia)";
const I2 = {
    "--un-backdrop-blur": u1,
    "--un-backdrop-brightness": u1,
    "--un-backdrop-contrast": u1,
    "--un-backdrop-grayscale": u1,
    "--un-backdrop-hue-rotate": u1,
    "--un-backdrop-invert": u1,
    "--un-backdrop-opacity": u1,
    "--un-backdrop-saturate": u1,
    "--un-backdrop-sepia": u1
};
const N2 = "var(--un-backdrop-blur) var(--un-backdrop-brightness) var(--un-backdrop-contrast) var(--un-backdrop-grayscale) var(--un-backdrop-hue-rotate) var(--un-backdrop-invert) var(--un-backdrop-opacity) var(--un-backdrop-saturate) var(--un-backdrop-sepia)";
function percentWithDefault(t) {
    let e = N.bracket.cssvar(t || "");
    if (null != e) return e;
    e = t ? N.percent(t) : "1";
    return null != e && Number.parseFloat(e) <= 1 ? e : void 0;
}
function toFilter(t, e) {
    return ([, r, o], { theme: a })=>{
        const n = e(o, a) ?? ("none" === o ? "0" : "");
        if ("" !== n) return r ? {
            [`--un-${r}${t}`]: `${t}(${n})`,
            "-webkit-backdrop-filter": N2,
            "backdrop-filter": N2
        } : {
            [`--un-${t}`]: `${t}(${n})`,
            filter: q2
        };
    };
}
function dropShadowResolver([, t], { theme: e }) {
    let r = e.dropShadow?.[t || "DEFAULT"];
    if (null != r) {
        const t = colorableShadows(r, "--un-drop-shadow-color");
        return {
            "--un-drop-shadow": `drop-shadow(${t.join(") drop-shadow(")})`,
            filter: q2
        };
    }
    r = N.bracket.cssvar(t);
    if (null != r) return {
        "--un-drop-shadow": `drop-shadow(${r})`,
        filter: q2
    };
}
const B1 = [
    [
        /^(?:(backdrop-)|filter-)?blur(?:-(.+))?$/,
        toFilter("blur", (t, e)=>e.blur?.[t || "DEFAULT"] || N.bracket.cssvar.px(t)),
        {
            autocomplete: [
                "(backdrop|filter)-blur-$blur",
                "blur-$blur",
                "filter-blur"
            ]
        }
    ],
    [
        /^(?:(backdrop-)|filter-)?brightness-(.+)$/,
        toFilter("brightness", (t)=>N.bracket.cssvar.percent(t)),
        {
            autocomplete: [
                "(backdrop|filter)-brightness-<percent>",
                "brightness-<percent>"
            ]
        }
    ],
    [
        /^(?:(backdrop-)|filter-)?contrast-(.+)$/,
        toFilter("contrast", (t)=>N.bracket.cssvar.percent(t)),
        {
            autocomplete: [
                "(backdrop|filter)-contrast-<percent>",
                "contrast-<percent>"
            ]
        }
    ],
    [
        /^(?:filter-)?drop-shadow(?:-(.+))?$/,
        dropShadowResolver,
        {
            autocomplete: [
                "filter-drop",
                "filter-drop-shadow",
                "filter-drop-shadow-color",
                "drop-shadow",
                "drop-shadow-color",
                "filter-drop-shadow-$dropShadow",
                "drop-shadow-$dropShadow",
                "filter-drop-shadow-color-$colors",
                "drop-shadow-color-$colors",
                "filter-drop-shadow-color-(op|opacity)",
                "drop-shadow-color-(op|opacity)",
                "filter-drop-shadow-color-(op|opacity)-<percent>",
                "drop-shadow-color-(op|opacity)-<percent>"
            ]
        }
    ],
    [
        /^(?:filter-)?drop-shadow-color-(.+)$/,
        colorResolver("--un-drop-shadow-color", "drop-shadow")
    ],
    [
        /^(?:filter-)?drop-shadow-color-op(?:acity)?-?(.+)$/,
        ([, t])=>({
                "--un-drop-shadow-opacity": N.bracket.percent(t)
            })
    ],
    [
        /^(?:(backdrop-)|filter-)?grayscale(?:-(.+))?$/,
        toFilter("grayscale", percentWithDefault),
        {
            autocomplete: [
                "(backdrop|filter)-grayscale",
                "(backdrop|filter)-grayscale-<percent>",
                "grayscale-<percent>"
            ]
        }
    ],
    [
        /^(?:(backdrop-)|filter-)?hue-rotate-(.+)$/,
        toFilter("hue-rotate", (t)=>N.bracket.cssvar.degree(t))
    ],
    [
        /^(?:(backdrop-)|filter-)?invert(?:-(.+))?$/,
        toFilter("invert", percentWithDefault),
        {
            autocomplete: [
                "(backdrop|filter)-invert",
                "(backdrop|filter)-invert-<percent>",
                "invert-<percent>"
            ]
        }
    ],
    [
        /^(backdrop-)op(?:acity)-(.+)$/,
        toFilter("opacity", (t)=>N.bracket.cssvar.percent(t)),
        {
            autocomplete: [
                "backdrop-(op|opacity)",
                "backdrop-(op|opacity)-<percent>"
            ]
        }
    ],
    [
        /^(?:(backdrop-)|filter-)?saturate-(.+)$/,
        toFilter("saturate", (t)=>N.bracket.cssvar.percent(t)),
        {
            autocomplete: [
                "(backdrop|filter)-saturate",
                "(backdrop|filter)-saturate-<percent>",
                "saturate-<percent>"
            ]
        }
    ],
    [
        /^(?:(backdrop-)|filter-)?sepia(?:-(.+))?$/,
        toFilter("sepia", percentWithDefault),
        {
            autocomplete: [
                "(backdrop|filter)-sepia",
                "(backdrop|filter)-sepia-<percent>",
                "sepia-<percent>"
            ]
        }
    ],
    [
        "filter",
        {
            filter: q2
        }
    ],
    [
        "backdrop-filter",
        {
            "-webkit-backdrop-filter": N2,
            "backdrop-filter": N2
        }
    ],
    [
        "filter-none",
        {
            filter: "none"
        }
    ],
    [
        "backdrop-filter-none",
        {
            "-webkit-backdrop-filter": "none",
            "backdrop-filter": "none"
        }
    ],
    ...b.map((t)=>[
            `filter-${t}`,
            {
                filter: t
            }
        ]),
    ...b.map((t)=>[
            `backdrop-filter-${t}`,
            {
                "-webkit-backdrop-filter": t,
                "backdrop-filter": t
            }
        ])
];
const H = [
    [
        /^space-?([xy])-?(-?.+)$/,
        handlerSpace,
        {
            autocomplete: [
                "space-(x|y|block|inline)",
                "space-(x|y|block|inline)-reverse",
                "space-(x|y|block|inline)-$spacing"
            ]
        }
    ],
    [
        /^space-?([xy])-reverse$/,
        ([, t])=>({
                [`--un-space-${t}-reverse`]: 1
            })
    ],
    [
        /^space-(block|inline)-(-?.+)$/,
        handlerSpace
    ],
    [
        /^space-(block|inline)-reverse$/,
        ([, t])=>({
                [`--un-space-${t}-reverse`]: 1
            })
    ]
];
function handlerSpace([, t, e], { theme: r }) {
    let o = r.spacing?.[e || "DEFAULT"] ?? N.bracket.cssvar.auto.fraction.rem(e || "1");
    if (null != o) {
        "0" === o && (o = "0px");
        const e = a1[t].map((e)=>{
            const r = `margin${e}`;
            const a = e.endsWith("right") || e.endsWith("bottom") ? `calc(${o} * var(--un-space-${t}-reverse))` : `calc(${o} * calc(1 - var(--un-space-${t}-reverse)))`;
            return [
                r,
                a
            ];
        });
        if (e) return [
            [
                `--un-space-${t}-reverse`,
                0
            ],
            ...e
        ];
    }
}
const J = [
    [
        "uppercase",
        {
            "text-transform": "uppercase"
        }
    ],
    [
        "lowercase",
        {
            "text-transform": "lowercase"
        }
    ],
    [
        "capitalize",
        {
            "text-transform": "capitalize"
        }
    ],
    [
        "normal-case",
        {
            "text-transform": "none"
        }
    ]
];
const M1 = [
    ...[
        "manual",
        "auto",
        "none",
        ...b
    ].map((t)=>[
            `hyphens-${t}`,
            {
                "-webkit-hyphens": t,
                "-ms-hyphens": t,
                hyphens: t
            }
        ])
];
const K = [
    [
        "write-vertical-right",
        {
            "writing-mode": "vertical-rl"
        }
    ],
    [
        "write-vertical-left",
        {
            "writing-mode": "vertical-lr"
        }
    ],
    [
        "write-normal",
        {
            "writing-mode": "horizontal-tb"
        }
    ],
    ...makeGlobalStaticRules("write", "writing-mode")
];
const Q = [
    [
        "write-orient-mixed",
        {
            "text-orientation": "mixed"
        }
    ],
    [
        "write-orient-sideways",
        {
            "text-orientation": "sideways"
        }
    ],
    [
        "write-orient-upright",
        {
            "text-orientation": "upright"
        }
    ],
    ...makeGlobalStaticRules("write-orient", "text-orientation")
];
const Z1 = [
    [
        "sr-only",
        {
            position: "absolute",
            width: "1px",
            height: "1px",
            padding: "0",
            margin: "-1px",
            overflow: "hidden",
            clip: "rect(0,0,0,0)",
            "white-space": "nowrap",
            "border-width": 0
        }
    ],
    [
        "not-sr-only",
        {
            position: "static",
            width: "auto",
            height: "auto",
            padding: "0",
            margin: "0",
            overflow: "visible",
            clip: "auto",
            "white-space": "normal"
        }
    ]
];
const tt1 = [
    [
        "isolate",
        {
            isolation: "isolate"
        }
    ],
    [
        "isolate-auto",
        {
            isolation: "auto"
        }
    ],
    [
        "isolation-auto",
        {
            isolation: "auto"
        }
    ]
];
const et1 = [
    [
        "object-cover",
        {
            "object-fit": "cover"
        }
    ],
    [
        "object-contain",
        {
            "object-fit": "contain"
        }
    ],
    [
        "object-fill",
        {
            "object-fit": "fill"
        }
    ],
    [
        "object-scale-down",
        {
            "object-fit": "scale-down"
        }
    ],
    [
        "object-none",
        {
            "object-fit": "none"
        }
    ],
    [
        /^object-(.+)$/,
        ([, t])=>f[t] ? {
                "object-position": f[t]
            } : null != N.bracketOfPosition(t) ? {
                "object-position": N.bracketOfPosition(t).split(" ").map((t)=>N.position.fraction.auto.px.cssvar(t) ?? t).join(" ")
            } : void 0,
        {
            autocomplete: `object-(${Object.keys(f).join("|")})`
        }
    ]
];
const rt = [
    [
        "bg-blend-multiply",
        {
            "background-blend-mode": "multiply"
        }
    ],
    [
        "bg-blend-screen",
        {
            "background-blend-mode": "screen"
        }
    ],
    [
        "bg-blend-overlay",
        {
            "background-blend-mode": "overlay"
        }
    ],
    [
        "bg-blend-darken",
        {
            "background-blend-mode": "darken"
        }
    ],
    [
        "bg-blend-lighten",
        {
            "background-blend-mode": "lighten"
        }
    ],
    [
        "bg-blend-color-dodge",
        {
            "background-blend-mode": "color-dodge"
        }
    ],
    [
        "bg-blend-color-burn",
        {
            "background-blend-mode": "color-burn"
        }
    ],
    [
        "bg-blend-hard-light",
        {
            "background-blend-mode": "hard-light"
        }
    ],
    [
        "bg-blend-soft-light",
        {
            "background-blend-mode": "soft-light"
        }
    ],
    [
        "bg-blend-difference",
        {
            "background-blend-mode": "difference"
        }
    ],
    [
        "bg-blend-exclusion",
        {
            "background-blend-mode": "exclusion"
        }
    ],
    [
        "bg-blend-hue",
        {
            "background-blend-mode": "hue"
        }
    ],
    [
        "bg-blend-saturation",
        {
            "background-blend-mode": "saturation"
        }
    ],
    [
        "bg-blend-color",
        {
            "background-blend-mode": "color"
        }
    ],
    [
        "bg-blend-luminosity",
        {
            "background-blend-mode": "luminosity"
        }
    ],
    [
        "bg-blend-normal",
        {
            "background-blend-mode": "normal"
        }
    ],
    ...makeGlobalStaticRules("bg-blend", "background-blend")
];
const ot = [
    [
        "mix-blend-multiply",
        {
            "mix-blend-mode": "multiply"
        }
    ],
    [
        "mix-blend-screen",
        {
            "mix-blend-mode": "screen"
        }
    ],
    [
        "mix-blend-overlay",
        {
            "mix-blend-mode": "overlay"
        }
    ],
    [
        "mix-blend-darken",
        {
            "mix-blend-mode": "darken"
        }
    ],
    [
        "mix-blend-lighten",
        {
            "mix-blend-mode": "lighten"
        }
    ],
    [
        "mix-blend-color-dodge",
        {
            "mix-blend-mode": "color-dodge"
        }
    ],
    [
        "mix-blend-color-burn",
        {
            "mix-blend-mode": "color-burn"
        }
    ],
    [
        "mix-blend-hard-light",
        {
            "mix-blend-mode": "hard-light"
        }
    ],
    [
        "mix-blend-soft-light",
        {
            "mix-blend-mode": "soft-light"
        }
    ],
    [
        "mix-blend-difference",
        {
            "mix-blend-mode": "difference"
        }
    ],
    [
        "mix-blend-exclusion",
        {
            "mix-blend-mode": "exclusion"
        }
    ],
    [
        "mix-blend-hue",
        {
            "mix-blend-mode": "hue"
        }
    ],
    [
        "mix-blend-saturation",
        {
            "mix-blend-mode": "saturation"
        }
    ],
    [
        "mix-blend-color",
        {
            "mix-blend-mode": "color"
        }
    ],
    [
        "mix-blend-luminosity",
        {
            "mix-blend-mode": "luminosity"
        }
    ],
    [
        "mix-blend-plus-lighter",
        {
            "mix-blend-mode": "plus-lighter"
        }
    ],
    [
        "mix-blend-normal",
        {
            "mix-blend-mode": "normal"
        }
    ],
    ...makeGlobalStaticRules("mix-blend")
];
const at = {
    "--un-border-spacing-x": 0,
    "--un-border-spacing-y": 0
};
const nt = "var(--un-border-spacing-x) var(--un-border-spacing-y)";
const it = [
    [
        "inline-table",
        {
            display: "inline-table"
        }
    ],
    [
        "table",
        {
            display: "table"
        }
    ],
    [
        "table-caption",
        {
            display: "table-caption"
        }
    ],
    [
        "table-cell",
        {
            display: "table-cell"
        }
    ],
    [
        "table-column",
        {
            display: "table-column"
        }
    ],
    [
        "table-column-group",
        {
            display: "table-column-group"
        }
    ],
    [
        "table-footer-group",
        {
            display: "table-footer-group"
        }
    ],
    [
        "table-header-group",
        {
            display: "table-header-group"
        }
    ],
    [
        "table-row",
        {
            display: "table-row"
        }
    ],
    [
        "table-row-group",
        {
            display: "table-row-group"
        }
    ],
    [
        "border-collapse",
        {
            "border-collapse": "collapse"
        }
    ],
    [
        "border-separate",
        {
            "border-collapse": "separate"
        }
    ],
    [
        /^border-spacing-(.+)$/,
        ([, t], { theme: e })=>{
            const r = e.spacing?.[t] ?? N.bracket.cssvar.global.auto.fraction.rem(t);
            if (null != r) return {
                "--un-border-spacing-x": r,
                "--un-border-spacing-y": r,
                "border-spacing": nt
            };
        },
        {
            autocomplete: [
                "border-spacing",
                "border-spacing-$spacing"
            ]
        }
    ],
    [
        /^border-spacing-([xy])-(.+)$/,
        ([, t, e], { theme: r })=>{
            const o = r.spacing?.[e] ?? N.bracket.cssvar.global.auto.fraction.rem(e);
            if (null != o) return {
                [`--un-border-spacing-${t}`]: o,
                "border-spacing": nt
            };
        },
        {
            autocomplete: [
                "border-spacing-(x|y)",
                "border-spacing-(x|y)-$spacing"
            ]
        }
    ],
    [
        "caption-top",
        {
            "caption-side": "top"
        }
    ],
    [
        "caption-bottom",
        {
            "caption-side": "bottom"
        }
    ],
    [
        "table-auto",
        {
            "table-layout": "auto"
        }
    ],
    [
        "table-fixed",
        {
            "table-layout": "fixed"
        }
    ],
    [
        "table-empty-cells-visible",
        {
            "empty-cells": "show"
        }
    ],
    [
        "table-empty-cells-hidden",
        {
            "empty-cells": "hide"
        }
    ]
];
const st = {
    "bg-blend": "background-blend-mode",
    "bg-clip": "-webkit-background-clip",
    "bg-gradient": "linear-gradient",
    "bg-image": "background-image",
    "bg-origin": "background-origin",
    "bg-position": "background-position",
    "bg-repeat": "background-repeat",
    "bg-size": "background-size",
    "mix-blend": "mix-blend-mode",
    object: "object-fit",
    "object-position": "object-position",
    write: "writing-mode",
    "write-orient": "text-orientation"
};
const ct = [
    [
        /^(.+?)-(\$.+)$/,
        ([, t, e])=>{
            const r = st[t];
            if (r) return {
                [r]: N.cssvar(e)
            };
        }
    ]
];
const lt = [
    [
        /^divide-?([xy])$/,
        handlerDivide,
        {
            autocomplete: [
                "divide-(x|y|block|inline)",
                "divide-(x|y|block|inline)-reverse",
                "divide-(x|y|block|inline)-$lineWidth"
            ]
        }
    ],
    [
        /^divide-?([xy])-?(-?.+)$/,
        handlerDivide
    ],
    [
        /^divide-?([xy])-reverse$/,
        ([, t])=>({
                [`--un-divide-${t}-reverse`]: 1
            })
    ],
    [
        /^divide-(block|inline)$/,
        handlerDivide
    ],
    [
        /^divide-(block|inline)-(-?.+)$/,
        handlerDivide
    ],
    [
        /^divide-(block|inline)-reverse$/,
        ([, t])=>({
                [`--un-divide-${t}-reverse`]: 1
            })
    ],
    [
        /^divide-(.+)$/,
        colorResolver("border-color", "divide"),
        {
            autocomplete: "divide-$colors"
        }
    ],
    [
        /^divide-op(?:acity)?-?(.+)$/,
        ([, t])=>({
                "--un-divide-opacity": N.bracket.percent(t)
            }),
        {
            autocomplete: [
                "divide-(op|opacity)",
                "divide-(op|opacity)-<percent>"
            ]
        }
    ],
    ...me.map((t)=>[
            `divide-${t}`,
            {
                "border-style": t
            }
        ])
];
function handlerDivide([, t, e], { theme: r }) {
    let o = r.lineWidth?.[e || "DEFAULT"] ?? N.bracket.cssvar.px(e || "1");
    if (null != o) {
        "0" === o && (o = "0px");
        const e = a1[t].map((e)=>{
            const r = `border${e}-width`;
            const a = e.endsWith("right") || e.endsWith("bottom") ? `calc(${o} * var(--un-divide-${t}-reverse))` : `calc(${o} * calc(1 - var(--un-divide-${t}-reverse)))`;
            return [
                r,
                a
            ];
        });
        if (e) return [
            [
                `--un-divide-${t}-reverse`,
                0
            ],
            ...e
        ];
    }
}
const dt = [
    [
        /^line-clamp-(\d+)$/,
        ([, t])=>({
                overflow: "hidden",
                display: "-webkit-box",
                "-webkit-box-orient": "vertical",
                "-webkit-line-clamp": t,
                "line-clamp": t
            }),
        {
            autocomplete: [
                "line-clamp",
                "line-clamp-<num>"
            ]
        }
    ],
    ...[
        "none",
        ...b
    ].map((t)=>[
            `line-clamp-${t}`,
            {
                overflow: "visible",
                display: "block",
                "-webkit-box-orient": "horizontal",
                "-webkit-line-clamp": t,
                "line-clamp": t
            }
        ])
];
const pt = {
    "--un-ordinal": u1,
    "--un-slashed-zero": u1,
    "--un-numeric-figure": u1,
    "--un-numeric-spacing": u1,
    "--un-numeric-fraction": u1
};
function toEntries(t) {
    return {
        ...t,
        "font-variant-numeric": "var(--un-ordinal) var(--un-slashed-zero) var(--un-numeric-figure) var(--un-numeric-spacing) var(--un-numeric-fraction)"
    };
}
const mt = [
    [
        /^ordinal$/,
        ()=>toEntries({
                "--un-ordinal": "ordinal"
            }),
        {
            autocomplete: "ordinal"
        }
    ],
    [
        /^slashed-zero$/,
        ()=>toEntries({
                "--un-slashed-zero": "slashed-zero"
            }),
        {
            autocomplete: "slashed-zero"
        }
    ],
    [
        /^lining-nums$/,
        ()=>toEntries({
                "--un-numeric-figure": "lining-nums"
            }),
        {
            autocomplete: "lining-nums"
        }
    ],
    [
        /^oldstyle-nums$/,
        ()=>toEntries({
                "--un-numeric-figure": "oldstyle-nums"
            }),
        {
            autocomplete: "oldstyle-nums"
        }
    ],
    [
        /^proportional-nums$/,
        ()=>toEntries({
                "--un-numeric-spacing": "proportional-nums"
            }),
        {
            autocomplete: "proportional-nums"
        }
    ],
    [
        /^tabular-nums$/,
        ()=>toEntries({
                "--un-numeric-spacing": "tabular-nums"
            }),
        {
            autocomplete: "tabular-nums"
        }
    ],
    [
        /^diagonal-fractions$/,
        ()=>toEntries({
                "--un-numeric-fraction": "diagonal-fractions"
            }),
        {
            autocomplete: "diagonal-fractions"
        }
    ],
    [
        /^stacked-fractions$/,
        ()=>toEntries({
                "--un-numeric-fraction": "stacked-fractions"
            }),
        {
            autocomplete: "stacked-fractions"
        }
    ],
    [
        "normal-nums",
        {
            "font-variant-numeric": "normal"
        }
    ]
];
const ft = {
    "--un-pan-x": u1,
    "--un-pan-y": u1,
    "--un-pinch-zoom": u1
};
const ut = "var(--un-pan-x) var(--un-pan-y) var(--un-pinch-zoom)";
const bt = [
    [
        /^touch-pan-(x|left|right)$/,
        ([, t])=>({
                "--un-pan-x": `pan-${t}`,
                "touch-action": ut
            }),
        {
            autocomplete: [
                "touch-pan",
                "touch-pan-(x|left|right|y|up|down)"
            ]
        }
    ],
    [
        /^touch-pan-(y|up|down)$/,
        ([, t])=>({
                "--un-pan-y": `pan-${t}`,
                "touch-action": ut
            })
    ],
    [
        "touch-pinch-zoom",
        {
            "--un-pinch-zoom": "pinch-zoom",
            "touch-action": ut
        }
    ],
    [
        "touch-auto",
        {
            "touch-action": "auto"
        }
    ],
    [
        "touch-manipulation",
        {
            "touch-action": "manipulation"
        }
    ],
    [
        "touch-none",
        {
            "touch-action": "none"
        }
    ],
    ...makeGlobalStaticRules("touch", "touch-action")
];
const gt = {
    "--un-scroll-snap-strictness": "proximity"
};
const yt = [
    [
        /^snap-(x|y)$/,
        ([, t])=>({
                "scroll-snap-type": `${t} var(--un-scroll-snap-strictness)`
            }),
        {
            autocomplete: "snap-(x|y|both)"
        }
    ],
    [
        /^snap-both$/,
        ()=>({
                "scroll-snap-type": "both var(--un-scroll-snap-strictness)"
            })
    ],
    [
        "snap-mandatory",
        {
            "--un-scroll-snap-strictness": "mandatory"
        }
    ],
    [
        "snap-proximity",
        {
            "--un-scroll-snap-strictness": "proximity"
        }
    ],
    [
        "snap-none",
        {
            "scroll-snap-type": "none"
        }
    ],
    [
        "snap-start",
        {
            "scroll-snap-align": "start"
        }
    ],
    [
        "snap-end",
        {
            "scroll-snap-align": "end"
        }
    ],
    [
        "snap-center",
        {
            "scroll-snap-align": "center"
        }
    ],
    [
        "snap-align-none",
        {
            "scroll-snap-align": "none"
        }
    ],
    [
        "snap-normal",
        {
            "scroll-snap-stop": "normal"
        }
    ],
    [
        "snap-always",
        {
            "scroll-snap-stop": "always"
        }
    ],
    [
        /^scroll-ma?()-?(-?.+)$/,
        directionSize("scroll-margin"),
        {
            autocomplete: [
                "scroll-(m|p|ma|pa|block|inline)",
                "scroll-(m|p|ma|pa|block|inline)-$spacing",
                "scroll-(m|p|ma|pa|block|inline)-(x|y|r|l|t|b|bs|be|is|ie)",
                "scroll-(m|p|ma|pa|block|inline)-(x|y|r|l|t|b|bs|be|is|ie)-$spacing"
            ]
        }
    ],
    [
        /^scroll-m-?([xy])-?(-?.+)$/,
        directionSize("scroll-margin")
    ],
    [
        /^scroll-m-?([rltb])-?(-?.+)$/,
        directionSize("scroll-margin")
    ],
    [
        /^scroll-m-(block|inline)-(-?.+)$/,
        directionSize("scroll-margin")
    ],
    [
        /^scroll-m-?([bi][se])-?(-?.+)$/,
        directionSize("scroll-margin")
    ],
    [
        /^scroll-pa?()-?(-?.+)$/,
        directionSize("scroll-padding")
    ],
    [
        /^scroll-p-?([xy])-?(-?.+)$/,
        directionSize("scroll-padding")
    ],
    [
        /^scroll-p-?([rltb])-?(-?.+)$/,
        directionSize("scroll-padding")
    ],
    [
        /^scroll-p-(block|inline)-(-?.+)$/,
        directionSize("scroll-padding")
    ],
    [
        /^scroll-p-?([bi][se])-?(-?.+)$/,
        directionSize("scroll-padding")
    ]
];
const ht = [
    [
        /^\$ placeholder-(.+)$/,
        colorResolver("color", "placeholder"),
        {
            autocomplete: "placeholder-$colors"
        }
    ],
    [
        /^\$ placeholder-op(?:acity)?-?(.+)$/,
        ([, t])=>({
                "--un-placeholder-opacity": N.bracket.percent(t)
            }),
        {
            autocomplete: [
                "placeholder-(op|opacity)",
                "placeholder-(op|opacity)-<percent>"
            ]
        }
    ]
];
const kt = [
    [
        /^view-transition-([\w_-]+)$/,
        ([, t])=>({
                "view-transition-name": t
            })
    ]
];
const vt = [
    Xe,
    ct,
    Ye,
    R2,
    d1,
    Z1,
    v1,
    p1,
    Re,
    He,
    dt,
    tt1,
    qe,
    Ee,
    Te,
    Pe,
    Je,
    _e,
    f2,
    Me,
    Ge,
    je,
    it,
    A,
    Y1,
    w,
    bt,
    m1,
    b1,
    yt,
    S3,
    ue,
    L1,
    De,
    Oe,
    Ae,
    Ue,
    Fe,
    H,
    lt,
    Ve,
    G,
    C1,
    z,
    h1,
    y,
    fe,
    ge,
    E2,
    et,
    et1,
    Ke,
    ce,
    Be,
    x1,
    le,
    ze,
    $1,
    J,
    j,
    mt,
    he,
    we,
    S,
    Se,
    Ce,
    We,
    M1,
    K,
    Q,
    T3,
    W2,
    be,
    rt,
    ot,
    Y,
    de,
    W,
    A3,
    B1,
    ve,
    pe,
    g1,
    k1,
    ht,
    xe,
    kt,
    Ze
].flat(1);
const xt = [
    ...V
];
const $t = {
    ...I,
    aria: {
        busy: 'busy="true"',
        checked: 'checked="true"',
        disabled: 'disabled="true"',
        expanded: 'expanded="true"',
        hidden: 'hidden="true"',
        pressed: 'pressed="true"',
        readonly: 'readonly="true"',
        required: 'required="true"',
        selected: 'selected="true"'
    },
    animation: {
        keyframes: {
            pulse: "{0%, 100% {opacity:1} 50% {opacity:.5}}",
            bounce: "{0%, 100% {transform:translateY(-25%);animation-timing-function:cubic-bezier(0.8,0,1,1)} 50% {transform:translateY(0);animation-timing-function:cubic-bezier(0,0,0.2,1)}}",
            spin: "{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}",
            ping: "{0%{transform:scale(1);opacity:1}75%,100%{transform:scale(2);opacity:0}}",
            "bounce-alt": "{from,20%,53%,80%,to{animation-timing-function:cubic-bezier(0.215,0.61,0.355,1);transform:translate3d(0,0,0)}40%,43%{animation-timing-function:cubic-bezier(0.755,0.05,0.855,0.06);transform:translate3d(0,-30px,0)}70%{animation-timing-function:cubic-bezier(0.755,0.05,0.855,0.06);transform:translate3d(0,-15px,0)}90%{transform:translate3d(0,-4px,0)}}",
            flash: "{from,50%,to{opacity:1}25%,75%{opacity:0}}",
            "pulse-alt": "{from{transform:scale3d(1,1,1)}50%{transform:scale3d(1.05,1.05,1.05)}to{transform:scale3d(1,1,1)}}",
            "rubber-band": "{from{transform:scale3d(1,1,1)}30%{transform:scale3d(1.25,0.75,1)}40%{transform:scale3d(0.75,1.25,1)}50%{transform:scale3d(1.15,0.85,1)}65%{transform:scale3d(0.95,1.05,1)}75%{transform:scale3d(1.05,0.95,1)}to{transform:scale3d(1,1,1)}}",
            "shake-x": "{from,to{transform:translate3d(0,0,0)}10%,30%,50%,70%,90%{transform:translate3d(-10px,0,0)}20%,40%,60%,80%{transform:translate3d(10px,0,0)}}",
            "shake-y": "{from,to{transform:translate3d(0,0,0)}10%,30%,50%,70%,90%{transform:translate3d(0,-10px,0)}20%,40%,60%,80%{transform:translate3d(0,10px,0)}}",
            "head-shake": "{0%{transform:translateX(0)}6.5%{transform:translateX(-6px) rotateY(-9deg)}18.5%{transform:translateX(5px) rotateY(7deg)}31.5%{transform:translateX(-3px) rotateY(-5deg)}43.5%{transform:translateX(2px) rotateY(3deg)}50%{transform:translateX(0)}}",
            swing: "{20%{transform:rotate3d(0,0,1,15deg)}40%{transform:rotate3d(0,0,1,-10deg)}60%{transform:rotate3d(0,0,1,5deg)}80%{transform:rotate3d(0,0,1,-5deg)}to{transform:rotate3d(0,0,1,0deg)}}",
            tada: "{from{transform:scale3d(1,1,1)}10%,20%{transform:scale3d(0.9,0.9,0.9) rotate3d(0,0,1,-3deg)}30%,50%,70%,90%{transform:scale3d(1.1,1.1,1.1) rotate3d(0,0,1,3deg)}40%,60%,80%{transform:scale3d(1.1,1.1,1.1) rotate3d(0,0,1,-3deg)}to{transform:scale3d(1,1,1)}}",
            wobble: "{from{transform:translate3d(0,0,0)}15%{transform:translate3d(-25%,0,0) rotate3d(0,0,1,-5deg)}30%{transform:translate3d(20%,0,0) rotate3d(0,0,1,3deg)}45%{transform:translate3d(-15%,0,0) rotate3d(0,0,1,-3deg)}60%{transform:translate3d(10%,0,0) rotate3d(0,0,1,2deg)}75%{transform:translate3d(-5%,0,0) rotate3d(0,0,1,-1deg)}to{transform:translate3d(0,0,0)}}",
            jello: "{from,11.1% to{transform:translate3d(0,0,0)}22.2%{transform:skewX(-12.5deg) skewY(-12.5deg)}33.3%{transform:skewX(6.25deg) skewY(6.25deg)}44.4%{transform:skewX(-3.125deg)skewY(-3.125deg)}55.5%{transform:skewX(1.5625deg) skewY(1.5625deg)}66.6%{transform:skewX(-0.78125deg) skewY(-0.78125deg)}77.7%{transform:skewX(0.390625deg) skewY(0.390625deg)}88.8%{transform:skewX(-0.1953125deg) skewY(-0.1953125deg)}}",
            "heart-beat": "{0%{transform:scale(1)}14%{transform:scale(1.3)}28%{transform:scale(1)}42%{transform:scale(1.3)}70%{transform:scale(1)}}",
            hinge: "{0%{transform-origin:top left;animation-timing-function:ease-in-out}20%,60%{transform:rotate3d(0,0,1,80deg);transform-origin:top left;animation-timing-function:ease-in-out}40%,80%{transform:rotate3d(0,0,1,60deg);transform-origin:top left;animation-timing-function:ease-in-out}to{transform:translate3d(0,700px,0);opacity:0}}",
            "jack-in-the-box": "{from{opacity:0;transform-origin:center bottom;transform:scale(0.1) rotate(30deg)}50%{transform:rotate(-10deg)}70%{transform:rotate(3deg)}to{transform:scale(1)}}",
            "light-speed-in-left": "{from{opacity:0;transform:translate3d(-100%,0,0) skewX(-30deg)}60%{opacity:1;transform:skewX(20deg)}80%{transform:skewX(-5deg)}to{transform:translate3d(0,0,0)}}",
            "light-speed-in-right": "{from{opacity:0;transform:translate3d(100%,0,0) skewX(-30deg)}60%{opacity:1;transform:skewX(20deg)}80%{transform:skewX(-5deg)}to{transform:translate3d(0,0,0)}}",
            "light-speed-out-left": "{from{opacity:1}to{opacity:0;transform:translate3d(-100%,0,0) skewX(30deg)}}",
            "light-speed-out-right": "{from{opacity:1}to{opacity:0;transform:translate3d(100%,0,0) skewX(30deg)}}",
            flip: "{from{transform:perspective(400px) scale3d(1,1,1) translate3d(0,0,0) rotate3d(0,1,0,-360deg);animation-timing-function:ease-out}40%{transform:perspective(400px) scale3d(1,1,1) translate3d(0,0,150px) rotate3d(0,1,0,-190deg);animation-timing-function:ease-out}50%{transform:perspective(400px) scale3d(1,1,1) translate3d(0,0,150px) rotate3d(0,1,0,-170deg);animation-timing-function:ease-in}80%{transform:perspective(400px) scale3d(0.95,0.95,0.95) translate3d(0,0,0) rotate3d(0,1,0,0deg);animation-timing-function:ease-in}to{transform:perspective(400px) scale3d(1,1,1) translate3d(0,0,0) rotate3d(0,1,0,0deg);animation-timing-function:ease-in}}",
            "flip-in-x": "{from{transform:perspective(400px) rotate3d(1,0,0,90deg);animation-timing-function:ease-in;opacity:0}40%{transform:perspective(400px) rotate3d(1,0,0,-20deg);animation-timing-function:ease-in}60%{transform:perspective(400px) rotate3d(1,0,0,10deg);opacity:1}80%{transform:perspective(400px) rotate3d(1,0,0,-5deg)}to{transform:perspective(400px)}}",
            "flip-in-y": "{from{transform:perspective(400px) rotate3d(0,1,0,90deg);animation-timing-function:ease-in;opacity:0}40%{transform:perspective(400px) rotate3d(0,1,0,-20deg);animation-timing-function:ease-in}60%{transform:perspective(400px) rotate3d(0,1,0,10deg);opacity:1}80%{transform:perspective(400px) rotate3d(0,1,0,-5deg)}to{transform:perspective(400px)}}",
            "flip-out-x": "{from{transform:perspective(400px)}30%{transform:perspective(400px) rotate3d(1,0,0,-20deg);opacity:1}to{transform:perspective(400px) rotate3d(1,0,0,90deg);opacity:0}}",
            "flip-out-y": "{from{transform:perspective(400px)}30%{transform:perspective(400px) rotate3d(0,1,0,-15deg);opacity:1}to{transform:perspective(400px) rotate3d(0,1,0,90deg);opacity:0}}",
            "rotate-in": "{from{transform-origin:center;transform:rotate3d(0,0,1,-200deg);opacity:0}to{transform-origin:center;transform:translate3d(0,0,0);opacity:1}}",
            "rotate-in-down-left": "{from{transform-origin:left bottom;transform:rotate3d(0,0,1,-45deg);opacity:0}to{transform-origin:left bottom;transform:translate3d(0,0,0);opacity:1}}",
            "rotate-in-down-right": "{from{transform-origin:right bottom;transform:rotate3d(0,0,1,45deg);opacity:0}to{transform-origin:right bottom;transform:translate3d(0,0,0);opacity:1}}",
            "rotate-in-up-left": "{from{transform-origin:left top;transform:rotate3d(0,0,1,45deg);opacity:0}to{transform-origin:left top;transform:translate3d(0,0,0);opacity:1}}",
            "rotate-in-up-right": "{from{transform-origin:right bottom;transform:rotate3d(0,0,1,-90deg);opacity:0}to{transform-origin:right bottom;transform:translate3d(0,0,0);opacity:1}}",
            "rotate-out": "{from{transform-origin:center;opacity:1}to{transform-origin:center;transform:rotate3d(0,0,1,200deg);opacity:0}}",
            "rotate-out-down-left": "{from{transform-origin:left bottom;opacity:1}to{transform-origin:left bottom;transform:rotate3d(0,0,1,45deg);opacity:0}}",
            "rotate-out-down-right": "{from{transform-origin:right bottom;opacity:1}to{transform-origin:right bottom;transform:rotate3d(0,0,1,-45deg);opacity:0}}",
            "rotate-out-up-left": "{from{transform-origin:left bottom;opacity:1}to{transform-origin:left bottom;transform:rotate3d(0,0,1,-45deg);opacity:0}}",
            "rotate-out-up-right": "{from{transform-origin:right bottom;opacity:1}to{transform-origin:left bottom;transform:rotate3d(0,0,1,90deg);opacity:0}}",
            "roll-in": "{from{opacity:0;transform:translate3d(-100%,0,0) rotate3d(0,0,1,-120deg)}to{opacity:1;transform:translate3d(0,0,0)}}",
            "roll-out": "{from{opacity:1}to{opacity:0;transform:translate3d(100%,0,0) rotate3d(0,0,1,120deg)}}",
            "zoom-in": "{from{opacity:0;transform:scale3d(0.3,0.3,0.3)}50%{opacity:1}}",
            "zoom-in-down": "{from{opacity:0;transform:scale3d(0.1,0.1,0.1) translate3d(0,-1000px,0);animation-timing-function:cubic-bezier(0.55,0.055,0.675,0.19)}60%{opacity:1;transform:scale3d(0.475,0.475,0.475) translate3d(0,60px,0);animation-timing-function:cubic-bezier(0.175,0.885,0.32,1)}}",
            "zoom-in-left": "{from{opacity:0;transform:scale3d(0.1,0.1,0.1) translate3d(-1000px,0,0);animation-timing-function:cubic-bezier(0.55,0.055,0.675,0.19)}60%{opacity:1;transform:scale3d(0.475,0.475,0.475) translate3d(10px,0,0);animation-timing-function:cubic-bezier(0.175,0.885,0.32,1)}}",
            "zoom-in-right": "{from{opacity:0;transform:scale3d(0.1,0.1,0.1) translate3d(1000px,0,0);animation-timing-function:cubic-bezier(0.55,0.055,0.675,0.19)}60%{opacity:1;transform:scale3d(0.475,0.475,0.475) translate3d(-10px,0,0);animation-timing-function:cubic-bezier(0.175,0.885,0.32,1)}}",
            "zoom-in-up": "{from{opacity:0;transform:scale3d(0.1,0.1,0.1) translate3d(0,1000px,0);animation-timing-function:cubic-bezier(0.55,0.055,0.675,0.19)}60%{opacity:1;transform:scale3d(0.475,0.475,0.475) translate3d(0,-60px,0);animation-timing-function:cubic-bezier(0.175,0.885,0.32,1)}}",
            "zoom-out": "{from{opacity:1}50%{opacity:0;transform:scale3d(0.3,0.3,0.3)}to{opacity:0}}",
            "zoom-out-down": "{40%{opacity:1;transform:scale3d(0.475,0.475,0.475) translate3d(0,-60px,0);animation-timing-function:cubic-bezier(0.55,0.055,0.675,0.19)}to{opacity:0;transform:scale3d(0.1,0.1,0.1) translate3d(0,2000px,0);transform-origin:center bottom;animation-timing-function:cubic-bezier(0.175,0.885,0.32,1)}}",
            "zoom-out-left": "{40%{opacity:1;transform:scale3d(0.475,0.475,0.475) translate3d(42px,0,0)}to{opacity:0;transform:scale(0.1) translate3d(-2000px,0,0);transform-origin:left center}}",
            "zoom-out-right": "{40%{opacity:1;transform:scale3d(0.475,0.475,0.475) translate3d(-42px,0,0)}to{opacity:0;transform:scale(0.1) translate3d(2000px,0,0);transform-origin:right center}}",
            "zoom-out-up": "{40%{opacity:1;transform:scale3d(0.475,0.475,0.475) translate3d(0,60px,0);animation-timing-function:cubic-bezier(0.55,0.055,0.675,0.19)}to{opacity:0;transform:scale3d(0.1,0.1,0.1) translate3d(0,-2000px,0);transform-origin:center bottom;animation-timing-function:cubic-bezier(0.175,0.885,0.32,1)}}",
            "bounce-in": "{from,20%,40%,60%,80%,to{animation-timing-function:ease-in-out}0%{opacity:0;transform:scale3d(0.3,0.3,0.3)}20%{transform:scale3d(1.1,1.1,1.1)}40%{transform:scale3d(0.9,0.9,0.9)}60%{transform:scale3d(1.03,1.03,1.03);opacity:1}80%{transform:scale3d(0.97,0.97,0.97)}to{opacity:1;transform:scale3d(1,1,1)}}",
            "bounce-in-down": "{from,60%,75%,90%,to{animation-timing-function:cubic-bezier(0.215,0.61,0.355,1)}0%{opacity:0;transform:translate3d(0,-3000px,0)}60%{opacity:1;transform:translate3d(0,25px,0)}75%{transform:translate3d(0,-10px,0)}90%{transform:translate3d(0,5px,0)}to{transform:translate3d(0,0,0)}}",
            "bounce-in-left": "{from,60%,75%,90%,to{animation-timing-function:cubic-bezier(0.215,0.61,0.355,1)}0%{opacity:0;transform:translate3d(-3000px,0,0)}60%{opacity:1;transform:translate3d(25px,0,0)}75%{transform:translate3d(-10px,0,0)}90%{transform:translate3d(5px,0,0)}to{transform:translate3d(0,0,0)}}",
            "bounce-in-right": "{from,60%,75%,90%,to{animation-timing-function:cubic-bezier(0.215,0.61,0.355,1)}0%{opacity:0;transform:translate3d(3000px,0,0)}60%{opacity:1;transform:translate3d(-25px,0,0)}75%{transform:translate3d(10px,0,0)}90%{transform:translate3d(-5px,0,0)}to{transform:translate3d(0,0,0)}}",
            "bounce-in-up": "{from,60%,75%,90%,to{animation-timing-function:cubic-bezier(0.215,0.61,0.355,1)}0%{opacity:0;transform:translate3d(0,3000px,0)}60%{opacity:1;transform:translate3d(0,-20px,0)}75%{transform:translate3d(0,10px,0)}90%{transform:translate3d(0,-5px,0)}to{transform:translate3d(0,0,0)}}",
            "bounce-out": "{20%{transform:scale3d(0.9,0.9,0.9)}50%,55%{opacity:1;transform:scale3d(1.1,1.1,1.1)}to{opacity:0;transform:scale3d(0.3,0.3,0.3)}}",
            "bounce-out-down": "{20%{transform:translate3d(0,10px,0)}40%,45%{opacity:1;transform:translate3d(0,-20px,0)}to{opacity:0;transform:translate3d(0,2000px,0)}}",
            "bounce-out-left": "{20%{opacity:1;transform:translate3d(20px,0,0)}to{opacity:0;transform:translate3d(-2000px,0,0)}}",
            "bounce-out-right": "{20%{opacity:1;transform:translate3d(-20px,0,0)}to{opacity:0;transform:translate3d(2000px,0,0)}}",
            "bounce-out-up": "{20%{transform:translate3d(0,-10px,0)}40%,45%{opacity:1;transform:translate3d(0,20px,0)}to{opacity:0;transform:translate3d(0,-2000px,0)}}",
            "slide-in-down": "{from{transform:translate3d(0,-100%,0);visibility:visible}to{transform:translate3d(0,0,0)}}",
            "slide-in-left": "{from{transform:translate3d(-100%,0,0);visibility:visible}to{transform:translate3d(0,0,0)}}",
            "slide-in-right": "{from{transform:translate3d(100%,0,0);visibility:visible}to{transform:translate3d(0,0,0)}}",
            "slide-in-up": "{from{transform:translate3d(0,100%,0);visibility:visible}to{transform:translate3d(0,0,0)}}",
            "slide-out-down": "{from{transform:translate3d(0,0,0)}to{visibility:hidden;transform:translate3d(0,100%,0)}}",
            "slide-out-left": "{from{transform:translate3d(0,0,0)}to{visibility:hidden;transform:translate3d(-100%,0,0)}}",
            "slide-out-right": "{from{transform:translate3d(0,0,0)}to{visibility:hidden;transform:translate3d(100%,0,0)}}",
            "slide-out-up": "{from{transform:translate3d(0,0,0)}to{visibility:hidden;transform:translate3d(0,-100%,0)}}",
            "fade-in": "{from{opacity:0}to{opacity:1}}",
            "fade-in-down": "{from{opacity:0;transform:translate3d(0,-100%,0)}to{opacity:1;transform:translate3d(0,0,0)}}",
            "fade-in-down-big": "{from{opacity:0;transform:translate3d(0,-2000px,0)}to{opacity:1;transform:translate3d(0,0,0)}}",
            "fade-in-left": "{from{opacity:0;transform:translate3d(-100%,0,0)}to{opacity:1;transform:translate3d(0,0,0)}}",
            "fade-in-left-big": "{from{opacity:0;transform:translate3d(-2000px,0,0)}to{opacity:1;transform:translate3d(0,0,0)}}",
            "fade-in-right": "{from{opacity:0;transform:translate3d(100%,0,0)}to{opacity:1;transform:translate3d(0,0,0)}}",
            "fade-in-right-big": "{from{opacity:0;transform:translate3d(2000px,0,0)}to{opacity:1;transform:translate3d(0,0,0)}}",
            "fade-in-up": "{from{opacity:0;transform:translate3d(0,100%,0)}to{opacity:1;transform:translate3d(0,0,0)}}",
            "fade-in-up-big": "{from{opacity:0;transform:translate3d(0,2000px,0)}to{opacity:1;transform:translate3d(0,0,0)}}",
            "fade-in-top-left": "{from{opacity:0;transform:translate3d(-100%,-100%,0)}to{opacity:1;transform:translate3d(0,0,0)}}",
            "fade-in-top-right": "{from{opacity:0;transform:translate3d(100%,-100%,0)}to{opacity:1;transform:translate3d(0,0,0)}}",
            "fade-in-bottom-left": "{from{opacity:0;transform:translate3d(-100%,100%,0)}to{opacity:1;transform:translate3d(0,0,0)}}",
            "fade-in-bottom-right": "{from{opacity:0;transform:translate3d(100%,100%,0)}to{opacity:1;transform:translate3d(0,0,0)}}",
            "fade-out": "{from{opacity:1}to{opacity:0}}",
            "fade-out-down": "{from{opacity:1}to{opacity:0;transform:translate3d(0,100%,0)}}",
            "fade-out-down-big": "{from{opacity:1}to{opacity:0;transform:translate3d(0,2000px,0)}}",
            "fade-out-left": "{from{opacity:1}to{opacity:0;transform:translate3d(-100%,0,0)}}",
            "fade-out-left-big": "{from{opacity:1}to{opacity:0;transform:translate3d(-2000px,0,0)}}",
            "fade-out-right": "{from{opacity:1}to{opacity:0;transform:translate3d(100%,0,0)}}",
            "fade-out-right-big": "{from{opacity:1}to{opacity:0;transform:translate3d(2000px,0,0)}}",
            "fade-out-up": "{from{opacity:1}to{opacity:0;transform:translate3d(0,-100%,0)}}",
            "fade-out-up-big": "{from{opacity:1}to{opacity:0;transform:translate3d(0,-2000px,0)}}",
            "fade-out-top-left": "{from{opacity:1;transform:translate3d(0,0,0)}to{opacity:0;transform:translate3d(-100%,-100%,0)}}",
            "fade-out-top-right": "{from{opacity:1;transform:translate3d(0,0,0)}to{opacity:0;transform:translate3d(100%,-100%,0)}}",
            "fade-out-bottom-left": "{from{opacity:1;transform:translate3d(0,0,0)}to{opacity:0;transform:translate3d(-100%,100%,0)}}",
            "fade-out-bottom-right": "{from{opacity:1;transform:translate3d(0,0,0)}to{opacity:0;transform:translate3d(100%,100%,0)}}",
            "back-in-up": "{0%{opacity:0.7;transform:translateY(1200px) scale(0.7)}80%{opacity:0.7;transform:translateY(0px) scale(0.7)}100%{opacity:1;transform:scale(1)}}",
            "back-in-down": "{0%{opacity:0.7;transform:translateY(-1200px) scale(0.7)}80%{opacity:0.7;transform:translateY(0px) scale(0.7)}100%{opacity:1;transform:scale(1)}}",
            "back-in-right": "{0%{opacity:0.7;transform:translateX(2000px) scale(0.7)}80%{opacity:0.7;transform:translateY(0px) scale(0.7)}100%{opacity:1;transform:scale(1)}}",
            "back-in-left": "{0%{opacity:0.7;transform:translateX(-2000px) scale(0.7)}80%{opacity:0.7;transform:translateX(0px) scale(0.7)}100%{opacity:1;transform:scale(1)}}",
            "back-out-up": "{0%{opacity:1;transform:scale(1)}80%{opacity:0.7;transform:translateY(0px) scale(0.7)}100%{opacity:0.7;transform:translateY(-700px) scale(0.7)}}",
            "back-out-down": "{0%{opacity:1;transform:scale(1)}80%{opacity:0.7;transform:translateY(0px) scale(0.7)}100%{opacity:0.7;transform:translateY(700px) scale(0.7)}}",
            "back-out-right": "{0%{opacity:1;transform:scale(1)}80%{opacity:0.7;transform:translateY(0px) scale(0.7)}100%{opacity:0.7;transform:translateX(2000px) scale(0.7)}}",
            "back-out-left": "{0%{opacity:1;transform:scale(1)}80%{opacity:0.7;transform:translateX(-2000px) scale(0.7)}100%{opacity:0.7;transform:translateY(-700px) scale(0.7)}}"
        },
        durations: {
            pulse: "2s",
            "heart-beat": "1.3s",
            "bounce-in": "0.75s",
            "bounce-out": "0.75s",
            "flip-out-x": "0.75s",
            "flip-out-y": "0.75s",
            hinge: "2s"
        },
        timingFns: {
            pulse: "cubic-bezier(0.4,0,.6,1)",
            ping: "cubic-bezier(0,0,.2,1)",
            "head-shake": "ease-in-out",
            "heart-beat": "ease-in-out",
            "pulse-alt": "ease-in-out",
            "light-speed-in-left": "ease-out",
            "light-speed-in-right": "ease-out",
            "light-speed-out-left": "ease-in",
            "light-speed-out-right": "ease-in"
        },
        properties: {
            "bounce-alt": {
                "transform-origin": "center bottom"
            },
            jello: {
                "transform-origin": "center"
            },
            swing: {
                "transform-origin": "top center"
            },
            flip: {
                "backface-visibility": "visible"
            },
            "flip-in-x": {
                "backface-visibility": "visible !important"
            },
            "flip-in-y": {
                "backface-visibility": "visible !important"
            },
            "flip-out-x": {
                "backface-visibility": "visible !important"
            },
            "flip-out-y": {
                "backface-visibility": "visible !important"
            },
            "rotate-in": {
                "transform-origin": "center"
            },
            "rotate-in-down-left": {
                "transform-origin": "left bottom"
            },
            "rotate-in-down-right": {
                "transform-origin": "right bottom"
            },
            "rotate-in-up-left": {
                "transform-origin": "left bottom"
            },
            "rotate-in-up-right": {
                "transform-origin": "right bottom"
            },
            "rotate-out": {
                "transform-origin": "center"
            },
            "rotate-out-down-left": {
                "transform-origin": "left bottom"
            },
            "rotate-out-down-right": {
                "transform-origin": "right bottom"
            },
            "rotate-out-up-left": {
                "transform-origin": "left bottom"
            },
            "rotate-out-up-right": {
                "transform-origin": "right bottom"
            },
            hinge: {
                "transform-origin": "top left"
            },
            "zoom-out-down": {
                "transform-origin": "center bottom"
            },
            "zoom-out-left": {
                "transform-origin": "left center"
            },
            "zoom-out-right": {
                "transform-origin": "right center"
            },
            "zoom-out-up": {
                "transform-origin": "center bottom"
            }
        },
        counts: {
            spin: "infinite",
            ping: "infinite",
            pulse: "infinite",
            "pulse-alt": "infinite",
            bounce: "infinite",
            "bounce-alt": "infinite"
        }
    },
    media: {
        portrait: "(orientation: portrait)",
        landscape: "(orientation: landscape)",
        os_dark: "(prefers-color-scheme: dark)",
        os_light: "(prefers-color-scheme: light)",
        motion_ok: "(prefers-reduced-motion: no-preference)",
        motion_not_ok: "(prefers-reduced-motion: reduce)",
        high_contrast: "(prefers-contrast: high)",
        low_contrast: "(prefers-contrast: low)",
        opacity_ok: "(prefers-reduced-transparency: no-preference)",
        opacity_not_ok: "(prefers-reduced-transparency: reduce)",
        useData_ok: "(prefers-reduced-data: no-preference)",
        useData_not_ok: "(prefers-reduced-data: reduce)",
        touch: "(hover: none) and (pointer: coarse)",
        stylus: "(hover: none) and (pointer: fine)",
        pointer: "(hover) and (pointer: coarse)",
        mouse: "(hover) and (pointer: fine)",
        hd_color: "(dynamic-range: high)"
    },
    supports: {
        grid: "(display: grid)"
    },
    preflightBase: {
        ...U,
        ...ft,
        ...gt,
        ...pt,
        ...at,
        ...X,
        ...q,
        ...P1,
        ...I2
    }
};
const wt = [
    variantMatcher("svg", (t)=>({
            selector: `${t.selector} svg`
        }))
];
const zt = [
    variantMatcher(".dark", (t)=>({
            prefix: `.dark $$ ${t.prefix}`
        })),
    variantMatcher(".light", (t)=>({
            prefix: `.light $$ ${t.prefix}`
        })),
    variantParentMatcher("@dark", "@media (prefers-color-scheme: dark)"),
    variantParentMatcher("@light", "@media (prefers-color-scheme: light)")
];
const jt = [
    variantMatcher("@hover", (t)=>{
        warnOnce("The @hover variant is experimental and may not follow semver.");
        return {
            parent: (t.parent ? `${t.parent} $$ ` : "") + "@media (hover: hover) and (pointer: fine)",
            selector: `${t.selector || ""}:hover`
        };
    })
];
const Xt = [
    variantParentMatcher("contrast-more", "@media (prefers-contrast: more)"),
    variantParentMatcher("contrast-less", "@media (prefers-contrast: less)")
];
const Yt = [
    variantParentMatcher("motion-reduce", "@media (prefers-reduced-motion: reduce)"),
    variantParentMatcher("motion-safe", "@media (prefers-reduced-motion: no-preference)")
];
const _t = [
    variantParentMatcher("landscape", "@media (orientation: landscape)"),
    variantParentMatcher("portrait", "@media (orientation: portrait)")
];
const variantSpaceAndDivide = (t)=>{
    if (!t.startsWith("_")) return /space-?([xy])-?(-?.+)$/.test(t) || /divide-/.test(t) ? {
        matcher: t,
        selector: (t)=>{
            const e = ">:not([hidden])~:not([hidden])";
            return t.includes(e) ? t : `${t}${e}`;
        }
    } : void 0;
};
const placeholderModifier = (t, { theme: e })=>{
    const r = t.match(/^(.*)\b(placeholder-)(.+)$/);
    if (r) {
        const [, t = "", o, a] = r;
        if (hasParseableColor(a, e) || hasOpacityValue(a)) return {
            matcher: `${t}placeholder-$ ${o}${a}`
        };
    }
};
function hasOpacityValue(t) {
    const e = t.match(/^op(?:acity)?-?(.+)$/);
    return !(!e || null == e[1]) && null != N.bracket.percent(e[1]);
}
function variants1(t) {
    return [
        placeholderModifier,
        variantSpaceAndDivide,
        ...variants(t),
        ...Xt,
        ..._t,
        ...Yt,
        ...wt,
        ...zt,
        ...jt
    ];
}
const Ft = definePreset((t = {})=>({
        ...m4(t),
        name: "@unocss/preset-wind",
        theme: $t,
        rules: vt,
        shortcuts: xt,
        variants: variants1(t)
    }));
function mixComponent(t, n, o) {
    return `calc(${n} + (${t} - ${n}) * ${o} / 100)`;
}
function mixColor(t, n, r) {
    const e = [
        t,
        n
    ];
    const s = [];
    for(let t = 0; t < 2; ++t){
        const n = "string" === typeof e[t] ? parseCssColor(e[t]) : e[t];
        if (!n || ![
            "rgb",
            "rgba"
        ].includes(n.type)) return;
        s.push(n);
    }
    const i = [];
    for(let t = 0; t < 3; ++t)i.push(mixComponent(s[0].components[t], s[1].components[t], r));
    return {
        type: "rgb",
        components: i,
        alpha: mixComponent(s[0].alpha ?? 1, s[1].alpha ?? 1, r)
    };
}
function tint(t, n) {
    return mixColor("#fff", t, n);
}
function shade(t, n) {
    return mixColor("#000", t, n);
}
function shift(t, n) {
    const o = Number.parseFloat(`${n}`);
    if (!Number.isNaN(o)) return o > 0 ? shade(t, n) : tint(t, -o);
}
const e2 = {
    tint: tint,
    shade: shade,
    shift: shift
};
function variantColorMix() {
    let t;
    return {
        name: "mix",
        match (n, s) {
            t || (t = new RegExp(`^mix-(tint|shade|shift)-(-?\\d{1,3})(?:${s.generator.config.separators.join("|")})`));
            const i = n.match(t);
            if (i) return {
                matcher: n.slice(i[0].length),
                body: (t)=>{
                    t.forEach((t)=>{
                        if (t[1]) {
                            const n = parseCssColor(`${t[1]}`);
                            if (n) {
                                const o = e2[i[1]](n, i[2]);
                                o && (t[1] = colorToString(o));
                            }
                        }
                    });
                    return t;
                }
            };
        }
    };
}
const s4 = definePreset((t = {})=>{
    const o = Ft(t);
    return {
        ...o,
        name: "@unocss/preset-uno",
        variants: [
            ...o.variants,
            variantColorMix()
        ]
    };
});
const darkTheme = JSON.parse(await Deno.readTextFile("./kleur-dark.json"));
const flattenTheme = (theme)=>{
    const flattenedTheme = {};
    for (const [key, value] of Object.entries(theme)){
        if (typeof value === 'string') {
            flattenedTheme[key] = value;
        } else {
            for (const [number, color] of Object.entries(value)){
                flattenedTheme[`${key}_${number}`] = color;
            }
        }
    }
    return flattenedTheme;
};
const __default = {
    presets: [
        s4({
            preflight: false
        })
    ],
    theme: {
        colors: flattenTheme(darkTheme)
    },
    preflights: false
};
function escapeSelector1(e) {
    const t = e.length;
    let r = -1;
    let n;
    let s = "";
    const o = e.charCodeAt(0);
    while(++r < t){
        n = e.charCodeAt(r);
        0 !== n ? s += 37 !== n ? 44 !== n ? n >= 1 && n <= 31 || 127 === n || 0 === r && n >= 48 && n <= 57 || 1 === r && n >= 48 && n <= 57 && 45 === o ? `\\${n.toString(16)} ` : (0 !== r || 1 !== t || 45 !== n) && (n >= 128 || 45 === n || 95 === n || n >= 48 && n <= 57 || n >= 65 && n <= 90 || n >= 97 && n <= 122) ? e.charAt(r) : `\\${e.charAt(r)}` : "\\," : "\\%" : s += "�";
    }
    return s;
}
const e3 = escapeSelector1;
function toArray1(e = []) {
    return Array.isArray(e) ? e : [
        e
    ];
}
function uniq(e) {
    return Array.from(new Set(e));
}
function uniqueBy(e, t) {
    return e.reduce((e, r)=>{
        const n = e.findIndex((e)=>t(r, e));
        -1 === n && e.push(r);
        return e;
    }, []);
}
function isString1(e) {
    return "string" === typeof e;
}
function normalizeCSSEntries(e) {
    return isString1(e) ? e : (Array.isArray(e) ? e : Object.entries(e)).filter((e)=>null != e[1]);
}
function normalizeCSSValues(e) {
    return Array.isArray(e) ? e.find((e)=>!Array.isArray(e) || Array.isArray(e[0])) ? e.map((e)=>normalizeCSSEntries(e)) : [
        e
    ] : [
        normalizeCSSEntries(e)
    ];
}
function clearIdenticalEntries1(e) {
    return e.filter(([t, r], n)=>{
        if (t.startsWith("$$")) return false;
        for(let s = n - 1; s >= 0; s--)if (e[s][0] === t && e[s][1] === r) return false;
        return true;
    });
}
function entriesToCss1(e) {
    return null == e ? "" : clearIdenticalEntries1(e).map(([e, t])=>null != t ? `${e}:${t};` : void 0).filter(Boolean).join("");
}
function isObject(e) {
    return e && "object" === typeof e && !Array.isArray(e);
}
function mergeDeep(e, t, r = false) {
    const n = e;
    const s = t;
    if (Array.isArray(s)) return r && Array.isArray(s) ? [
        ...n,
        ...s
    ] : [
        ...s
    ];
    const o = {
        ...n
    };
    isObject(n) && isObject(s) && Object.keys(s).forEach((e)=>{
        isObject(n[e]) && isObject(s[e]) || Array.isArray(n[e]) && Array.isArray(s[e]) ? o[e] = mergeDeep(n[e], s[e], r) : Object.assign(o, {
            [e]: s[e]
        });
    });
    return o;
}
function clone(e) {
    let t, r, n;
    if (Array.isArray(e)) {
        r = Array(t = e.length);
        while(t--)r[t] = (n = e[t]) && "object" === typeof n ? clone(n) : n;
        return r;
    }
    if ("[object Object]" === Object.prototype.toString.call(e)) {
        r = {};
        for(t in e)"__proto__" === t ? Object.defineProperty(r, t, {
            value: clone(e[t]),
            configurable: true,
            enumerable: true,
            writable: true
        }) : r[t] = (n = e[t]) && "object" === typeof n ? clone(n) : n;
        return r;
    }
    return e;
}
function isStaticRule(e) {
    return isString1(e[0]);
}
function isStaticShortcut(e) {
    return isString1(e[0]);
}
const s5 = "$$shortcut-no-merge";
function normalizeVariant(e) {
    return "function" === typeof e ? {
        match: e
    } : e;
}
function isRawUtil(e) {
    return 3 === e.length;
}
function notNull(e) {
    return null != e;
}
function noop() {}
var o2 = Object.defineProperty;
var __defNormalProp$2 = (e, t, r)=>t in e ? o2(e, t, {
        enumerable: true,
        configurable: true,
        writable: true,
        value: r
    }) : e[t] = r;
var __publicField$2 = (e, t, r)=>{
    __defNormalProp$2(e, "symbol" !== typeof t ? t + "" : t, r);
    return r;
};
class TwoKeyMap {
    constructor(){
        __publicField$2(this, "_map", new Map);
    }
    get(e, t) {
        const r = this._map.get(e);
        if (r) return r.get(t);
    }
    getFallback(e, t, r) {
        let n = this._map.get(e);
        if (!n) {
            n = new Map;
            this._map.set(e, n);
        }
        n.has(t) || n.set(t, r);
        return n.get(t);
    }
    set(e, t, r) {
        let n = this._map.get(e);
        if (!n) {
            n = new Map;
            this._map.set(e, n);
        }
        n.set(t, r);
        return this;
    }
    has(e, t) {
        return this._map.get(e)?.has(t);
    }
    delete(e, t) {
        return this._map.get(e)?.delete(t) || false;
    }
    deleteTop(e) {
        return this._map.delete(e);
    }
    map(e) {
        return Array.from(this._map.entries()).flatMap(([t, r])=>Array.from(r.entries()).map(([r, n])=>e(n, t, r)));
    }
}
var a3 = Object.defineProperty;
var __defNormalProp$1 = (e, t, r)=>t in e ? a3(e, t, {
        enumerable: true,
        configurable: true,
        writable: true,
        value: r
    }) : e[t] = r;
var __publicField$1 = (e, t, r)=>{
    __defNormalProp$1(e, "symbol" !== typeof t ? t + "" : t, r);
    return r;
};
class CountableSet extends Set {
    constructor(e){
        super(e);
        __publicField$1(this, "_map");
        this._map ?? (this._map = new Map);
    }
    add(e) {
        this._map ?? (this._map = new Map);
        this._map.set(e, (this._map.get(e) ?? 0) + 1);
        return super.add(e);
    }
    delete(e) {
        this._map.delete(e);
        return super.delete(e);
    }
    clear() {
        this._map.clear();
        super.clear();
    }
    getCount(e) {
        return this._map.get(e) ?? 0;
    }
    setCount(e, t) {
        this._map.set(e, t);
        return super.add(e);
    }
}
function isCountableSet(e) {
    return e instanceof CountableSet;
}
const i1 = {};
function makeRegexClassGroup(e = [
    "-",
    ":"
]) {
    const t = e.join("|");
    i1[t] || (i1[t] = new RegExp(`((?:[!@<~\\w+:_/-]|\\[&?>?:?\\S*\\])+?)(${t})\\(((?:[~!<>\\w\\s:/\\\\,%#.$?-]|\\[.*?\\])+?)\\)(?!\\s*?=>)`, "gm"));
    i1[t].lastIndex = 0;
    return i1[t];
}
function parseVariantGroup(e, t = [
    "-",
    ":"
], r = 5) {
    const n = makeRegexClassGroup(t);
    let s;
    let o = e.toString();
    const a = new Set;
    const i = new Map;
    do {
        s = false;
        o = o.replace(n, (e, r, n, o, c)=>{
            if (!t.includes(n)) return e;
            s = true;
            a.add(r + n);
            const l = c + r.length + n.length + 1;
            const u = {
                length: e.length,
                items: []
            };
            i.set(c, u);
            for (const e of [
                ...o.matchAll(/\S+/g)
            ]){
                const t = l + e.index;
                let s = i.get(t)?.items;
                s ? i.delete(t) : s = [
                    {
                        offset: t,
                        length: e[0].length,
                        className: e[0]
                    }
                ];
                for (const e of s){
                    e.className = "~" === e.className ? r : e.className.replace(/^(!?)(.*)/, `$1${r}${n}$2`);
                    u.items.push(e);
                }
            }
            return "$".repeat(e.length);
        });
        r -= 1;
    }while (s && r)
    let c;
    if ("string" === typeof e) {
        c = "";
        let t = 0;
        for (const [r, n] of i){
            c += e.slice(t, r);
            c += n.items.map((e)=>e.className).join(" ");
            t = r + n.length;
        }
        c += e.slice(t);
    } else {
        c = e;
        for (const [e, t] of i)c.overwrite(e, e + t.length, t.items.map((e)=>e.className).join(" "));
    }
    return {
        prefixes: Array.from(a),
        hasChanged: s,
        groupsByOffset: i,
        get expanded () {
            return c.toString();
        }
    };
}
function expandVariantGroup(e, t = [
    "-",
    ":"
], r = 5) {
    const n = parseVariantGroup(e, t, r);
    return "string" === typeof e ? n.expanded : e;
}
const c4 = new Set;
function warnOnce1(e) {
    if (!c4.has(e)) {
        console.warn("[unocss]", e);
        c4.add(e);
    }
}
const l5 = /[\\:]?[\s'"`;{}]+/g;
function splitCode(e) {
    return e.split(l5);
}
const f4 = {
    name: "@unocss/core/extractor-split",
    order: 0,
    extract ({ code: e }) {
        return splitCode(e);
    }
};
function createNanoEvents() {
    return {
        events: {},
        emit (e, ...t) {
            (this.events[e] || []).forEach((e)=>e(...t));
        },
        on (e, t) {
            (this.events[e] = this.events[e] || []).push(t);
            return ()=>this.events[e] = (this.events[e] || []).filter((e)=>e !== t);
        }
    };
}
const p3 = "default";
const h4 = "preflights";
const g4 = "shortcuts";
const d4 = "imports";
const m5 = {
    [d4]: -200,
    [h4]: -100,
    [g4]: -10,
    [p3]: 0
};
function resolveShortcuts(e) {
    return toArray1(e).flatMap((e)=>Array.isArray(e) ? [
            e
        ] : Object.entries(e));
}
const y2 = "_uno_resolved";
function resolvePreset(e) {
    let t = "function" === typeof e ? e() : e;
    if (y2 in t) return t;
    t = {
        ...t
    };
    Object.defineProperty(t, y2, {
        value: true,
        enumerable: false
    });
    const r = t.shortcuts ? resolveShortcuts(t.shortcuts) : void 0;
    t.shortcuts = r;
    if (t.prefix || t.layer) {
        const apply = (e)=>{
            e[2] || (e[2] = {});
            const r = e[2];
            null == r.prefix && t.prefix && (r.prefix = toArray1(t.prefix));
            null == r.layer && t.layer && (r.layer = t.layer);
        };
        r?.forEach(apply);
        t.rules?.forEach(apply);
    }
    return t;
}
function resolvePresets(e) {
    const t = resolvePreset(e);
    if (!t.presets) return [
        t
    ];
    const r = (t.presets || []).flatMap(toArray1).flatMap(resolvePresets);
    return [
        t,
        ...r
    ];
}
function resolveConfig(e = {}, t = {}) {
    const r = Object.assign({}, t, e);
    const n = uniqueBy((r.presets || []).flatMap(toArray1).flatMap(resolvePresets), (e, t)=>e.name === t.name);
    const s = [
        ...n.filter((e)=>"pre" === e.enforce),
        ...n.filter((e)=>!e.enforce),
        ...n.filter((e)=>"post" === e.enforce)
    ];
    const o = [
        ...s,
        r
    ];
    const a = [
        ...o
    ].reverse();
    const i = Object.assign({}, m5, ...o.map((e)=>e.layers));
    function getMerged(e) {
        return uniq(o.flatMap((t)=>toArray1(t[e] || [])));
    }
    const c = getMerged("extractors");
    let l = a.find((e)=>void 0 !== e.extractorDefault)?.extractorDefault;
    void 0 === l && (l = f4);
    l && !c.includes(l) && c.unshift(l);
    c.sort((e, t)=>(e.order || 0) - (t.order || 0));
    const u = getMerged("rules");
    const p = {};
    const h = u.length;
    const g = u.map((e, t)=>{
        if (!isStaticRule(e)) return [
            t,
            ...e
        ];
        {
            const r = toArray1(e[2]?.prefix || "");
            r.forEach((r)=>{
                p[r + e[0]] = [
                    t,
                    e[1],
                    e[2],
                    e
                ];
            });
        }
    }).filter(Boolean).reverse();
    let d = mergeThemes(o.map((e)=>e.theme));
    const y = getMerged("extendTheme");
    for (const e of y)d = e(d) || d;
    const S = {
        templates: uniq(o.flatMap((e)=>toArray1(e.autocomplete?.templates))),
        extractors: o.flatMap((e)=>toArray1(e.autocomplete?.extractors)).sort((e, t)=>(e.order || 0) - (t.order || 0)),
        shorthands: mergeAutocompleteShorthands(o.map((e)=>e.autocomplete?.shorthands || {}))
    };
    let v = getMerged("separators");
    v.length || (v = [
        ":",
        "-"
    ]);
    const w = {
        mergeSelectors: true,
        warn: true,
        blocklist: [],
        sortLayers: (e)=>e,
        ...r,
        presets: s,
        envMode: r.envMode || "build",
        shortcutsLayer: r.shortcutsLayer || "shortcuts",
        layers: i,
        theme: d,
        rulesSize: h,
        rulesDynamic: g,
        rulesStaticMap: p,
        preprocess: getMerged("preprocess"),
        postprocess: getMerged("postprocess"),
        preflights: getMerged("preflights"),
        autocomplete: S,
        variants: getMerged("variants").map(normalizeVariant).sort((e, t)=>(e.order || 0) - (t.order || 0)),
        shortcuts: resolveShortcuts(getMerged("shortcuts")).reverse(),
        extractors: c,
        safelist: getMerged("safelist"),
        separators: v,
        details: r.details ?? "dev" === r.envMode
    };
    for (const e of o)e?.configResolved?.(w);
    return w;
}
function mergeThemes(e) {
    return e.map((e)=>e ? clone(e) : {}).reduce((e, t)=>mergeDeep(e, t), {});
}
function mergeAutocompleteShorthands(e) {
    return e.reduce((e, t)=>{
        const r = {};
        for(const e in t){
            const n = t[e];
            Array.isArray(n) ? r[e] = `(${n.join("|")})` : r[e] = n;
        }
        return {
            ...e,
            ...r
        };
    }, {});
}
const S4 = "0.56.4";
var v4 = Object.defineProperty;
var __defNormalProp = (e, t, r)=>t in e ? v4(e, t, {
        enumerable: true,
        configurable: true,
        writable: true,
        value: r
    }) : e[t] = r;
var __publicField = (e, t, r)=>{
    __defNormalProp(e, "symbol" !== typeof t ? t + "" : t, r);
    return r;
};
class UnoGenerator {
    constructor(e = {}, t = {}){
        this.userConfig = e;
        this.defaults = t;
        __publicField(this, "version", S4);
        __publicField(this, "_cache", new Map);
        __publicField(this, "config");
        __publicField(this, "blocked", new Set);
        __publicField(this, "parentOrders", new Map);
        __publicField(this, "events", createNanoEvents());
        this.config = resolveConfig(e, t);
        this.events.emit("config", this.config);
    }
    setConfig(e, t) {
        if (e) {
            t && (this.defaults = t);
            this.userConfig = e;
            this.blocked.clear();
            this.parentOrders.clear();
            this._cache.clear();
            this.config = resolveConfig(e, this.defaults);
            this.events.emit("config", this.config);
        }
    }
    async applyExtractors(e, t, r = new Set) {
        const n = {
            original: e,
            code: e,
            id: t,
            extracted: r,
            envMode: this.config.envMode
        };
        for (const e of this.config.extractors){
            const t = await e.extract?.(n);
            if (t) if (isCountableSet(t) && isCountableSet(r)) for (const e of t)r.setCount(e, r.getCount(e) + t.getCount(e));
            else for (const e of t)r.add(e);
        }
        return r;
    }
    makeContext(e, t) {
        const r = {
            rawSelector: e,
            currentSelector: t[1],
            theme: this.config.theme,
            generator: this,
            variantHandlers: t[2],
            constructCSS: (...e)=>this.constructCustomCSS(r, ...e),
            variantMatch: t
        };
        return r;
    }
    async parseToken(e, t) {
        if (this.blocked.has(e)) return;
        const r = `${e}${t ? ` ${t}` : ""}`;
        if (this._cache.has(r)) return this._cache.get(r);
        let n = e;
        for (const t of this.config.preprocess)n = t(e);
        if (this.isBlocked(n)) {
            this.blocked.add(e);
            this._cache.set(r, null);
            return;
        }
        const s = await this.matchVariants(e, n);
        if (!s || this.isBlocked(s[1])) {
            this.blocked.add(e);
            this._cache.set(r, null);
            return;
        }
        const o = this.makeContext(e, [
            t || s[0],
            s[1],
            s[2],
            s[3]
        ]);
        this.config.details && (o.variants = [
            ...s[3]
        ]);
        const a = await this.expandShortcut(o.currentSelector, o);
        const i = a ? await this.stringifyShortcuts(o.variantMatch, o, a[0], a[1]) : (await this.parseUtil(o.variantMatch, o))?.map((e)=>this.stringifyUtil(e, o)).filter(notNull);
        if (i?.length) {
            this._cache.set(r, i);
            return i;
        }
        this._cache.set(r, null);
    }
    async generate(e, t = {}) {
        const { id: r, scope: n, preflights: s = true, safelist: o = true, minify: a = false, extendedInfo: i = false } = t;
        const c = isString1(e) ? await this.applyExtractors(e, r, i ? new CountableSet : new Set) : Array.isArray(e) ? new Set(e) : e;
        o && this.config.safelist.forEach((e)=>{
            c.has(e) || c.add(e);
        });
        const l = a ? "" : "\n";
        const u = new Set([
            p3
        ]);
        const f = i ? new Map : new Set;
        const g = new Map;
        let d = {};
        const m = Array.from(c).map(async (e)=>{
            if (f.has(e)) return;
            const t = await this.parseToken(e);
            if (null != t) {
                f instanceof Map ? f.set(e, {
                    data: t,
                    count: isCountableSet(c) ? c.getCount(e) : -1
                }) : f.add(e);
                for (const e of t){
                    const t = e[3] || "";
                    const r = e[4]?.layer;
                    g.has(t) || g.set(t, []);
                    g.get(t).push(e);
                    r && u.add(r);
                }
            }
        });
        await Promise.all(m);
        await (async ()=>{
            if (!s) return;
            const e = {
                generator: this,
                theme: this.config.theme
            };
            const t = new Set([]);
            this.config.preflights.forEach(({ layer: e = h4 })=>{
                u.add(e);
                t.add(e);
            });
            d = Object.fromEntries(await Promise.all(Array.from(t).map(async (t)=>{
                const r = await Promise.all(this.config.preflights.filter((e)=>(e.layer || h4) === t).map(async (t)=>await t.getCSS(e)));
                const n = r.filter(Boolean).join(l);
                return [
                    t,
                    n
                ];
            })));
        })();
        const y = this.config.sortLayers(Array.from(u).sort((e, t)=>(this.config.layers[e] ?? 0) - (this.config.layers[t] ?? 0) || e.localeCompare(t)));
        const S = {};
        const getLayer = (e)=>{
            if (S[e]) return S[e];
            let t = Array.from(g).sort((e, t)=>(this.parentOrders.get(e[0]) ?? 0) - (this.parentOrders.get(t[0]) ?? 0) || e[0]?.localeCompare(t[0] || "") || 0).map(([t, r])=>{
                const s = r.length;
                const o = r.filter((t)=>(t[4]?.layer || p3) === e).sort((e, t)=>e[0] - t[0] || (e[4]?.sort || 0) - (t[4]?.sort || 0) || e[5]?.currentSelector?.localeCompare(t[5]?.currentSelector ?? "") || e[1]?.localeCompare(t[1] || "") || e[2]?.localeCompare(t[2] || "") || 0).map(([, e, t, , r, , s])=>{
                    const o = e ? applyScope(e, n) : e;
                    return [
                        [
                            [
                                o ?? "",
                                r?.sort ?? 0
                            ]
                        ],
                        t,
                        !!(s ?? r?.noMerge)
                    ];
                });
                if (!o.length) return;
                const a = o.reverse().map(([e, t, r], n)=>{
                    if (!r && this.config.mergeSelectors) for(let r = n + 1; r < s; r++){
                        const n = o[r];
                        if (n && !n[2] && (e && n[0] || null == e && null == n[0]) && n[1] === t) {
                            e && n[0] && n[0].push(...e);
                            return null;
                        }
                    }
                    const a = e ? uniq(e.sort((e, t)=>e[1] - t[1] || e[0]?.localeCompare(t[0] || "") || 0).map((e)=>e[0]).filter(Boolean)) : [];
                    return a.length ? `${a.join(`,${l}`)}{${t}}` : t;
                }).filter(Boolean).reverse().join(l);
                if (!t) return a;
                const i = t.split(" $$ ");
                return `${i.join("{")}{${l}${a}${l}${"}".repeat(i.length)}`;
            }).filter(Boolean).join(l);
            s && (t = [
                d[e],
                t
            ].filter(Boolean).join(l));
            const r = a ? "" : `/* layer: ${e} */${l}`;
            return S[e] = t ? r + t : "";
        };
        const getLayers = (e = y, t)=>e.filter((e)=>!t?.includes(e)).map((e)=>getLayer(e) || "").filter(Boolean).join(l);
        return {
            get css () {
                return getLayers();
            },
            layers: y,
            matched: f,
            getLayers: getLayers,
            getLayer: getLayer
        };
    }
    async matchVariants(e, t) {
        const r = new Set;
        const n = [];
        let s = t || e;
        let o = true;
        const a = {
            rawSelector: e,
            theme: this.config.theme,
            generator: this
        };
        while(o){
            o = false;
            for (const e of this.config.variants){
                if (!e.multiPass && r.has(e)) continue;
                let t = await e.match(s, a);
                if (t) {
                    if (isString1(t)) {
                        if (t === s) continue;
                        t = {
                            matcher: t
                        };
                    }
                    s = t.matcher;
                    n.unshift(t);
                    r.add(e);
                    o = true;
                    break;
                }
            }
            if (!o) break;
            if (n.length > 500) throw new Error(`Too many variants applied to "${e}"`);
        }
        return [
            e,
            s,
            n,
            r
        ];
    }
    applyVariants(e, t = e[4], r = e[1]) {
        const n = t.slice().sort((e, t)=>(e.order || 0) - (t.order || 0)).reduceRight((e, t)=>(r)=>{
                const n = t.body?.(r.entries) || r.entries;
                const s = Array.isArray(t.parent) ? t.parent : [
                    t.parent,
                    void 0
                ];
                return (t.handle ?? defaultVariantHandler)({
                    ...r,
                    entries: n,
                    selector: t.selector?.(r.selector, n) || r.selector,
                    parent: s[0] || r.parent,
                    parentOrder: s[1] || r.parentOrder,
                    layer: t.layer || r.layer,
                    sort: t.sort || r.sort
                }, e);
            }, (e)=>e);
        const s = n({
            prefix: "",
            selector: toEscapedSelector(r),
            pseudo: "",
            entries: e[2]
        });
        const { parent: o, parentOrder: a } = s;
        null != o && null != a && this.parentOrders.set(o, a);
        const i = {
            selector: [
                s.prefix,
                s.selector,
                s.pseudo
            ].join(""),
            entries: s.entries,
            parent: o,
            layer: s.layer,
            sort: s.sort,
            noMerge: s.noMerge
        };
        for (const e of this.config.postprocess)e(i);
        return i;
    }
    constructCustomCSS(e, t, r) {
        const n = normalizeCSSEntries(t);
        if (isString1(n)) return n;
        const { selector: s, entries: o, parent: a } = this.applyVariants([
            0,
            r || e.rawSelector,
            n,
            void 0,
            e.variantHandlers
        ]);
        const i = `${s}{${entriesToCss1(o)}}`;
        return a ? `${a}{${i}}` : i;
    }
    async parseUtil(e, t, r = false, n) {
        const [s, o, a] = isString1(e) ? await this.matchVariants(e) : e;
        this.config.details && (t.rules = t.rules ?? []);
        const i = this.config.rulesStaticMap[o];
        if (i && i[1] && (r || !i[2]?.internal)) {
            this.config.details && t.rules.push(i[3]);
            const e = i[0];
            const r = normalizeCSSEntries(i[1]);
            const n = i[2];
            return isString1(r) ? [
                [
                    e,
                    r,
                    n
                ]
            ] : [
                [
                    e,
                    s,
                    r,
                    n,
                    a
                ]
            ];
        }
        t.variantHandlers = a;
        const { rulesDynamic: c } = this.config;
        for (const [e, i, l, u] of c){
            if (u?.internal && !r) continue;
            let c = o;
            if (u?.prefix) {
                const e = toArray1(u.prefix);
                if (n) {
                    const t = toArray1(n);
                    if (!e.some((e)=>t.includes(e))) continue;
                } else {
                    const t = e.find((e)=>o.startsWith(e));
                    if (null == t) continue;
                    c = o.slice(t.length);
                }
            }
            const f = c.match(i);
            if (!f) continue;
            const p = await l(f, t);
            if (!p) continue;
            this.config.details && t.rules.push([
                i,
                l,
                u
            ]);
            const h = normalizeCSSValues(p).filter((e)=>e.length);
            if (h.length) return h.map((t)=>isString1(t) ? [
                    e,
                    t,
                    u
                ] : [
                    e,
                    s,
                    t,
                    u,
                    a
                ]);
        }
    }
    stringifyUtil(e, t) {
        if (!e) return;
        if (isRawUtil(e)) return [
            e[0],
            void 0,
            e[1],
            void 0,
            e[2],
            this.config.details ? t : void 0,
            void 0
        ];
        const { selector: r, entries: n, parent: s, layer: o, sort: a, noMerge: i } = this.applyVariants(e);
        const c = entriesToCss1(n);
        if (!c) return;
        const { layer: l, sort: u, ...f } = e[3] ?? {};
        const p = {
            ...f,
            layer: o ?? l,
            sort: a ?? u
        };
        return [
            e[0],
            r,
            c,
            s,
            p,
            this.config.details ? t : void 0,
            i
        ];
    }
    async expandShortcut(e, t, r = 5) {
        if (0 === r) return;
        const n = this.config.details ? (e)=>{
            t.shortcuts = t.shortcuts ?? [];
            t.shortcuts.push(e);
        } : noop;
        let s;
        let o;
        for (const r of this.config.shortcuts){
            let a = e;
            if (r[2]?.prefix) {
                const t = toArray1(r[2].prefix);
                const n = t.find((t)=>e.startsWith(t));
                if (null == n) continue;
                a = e.slice(n.length);
            }
            if (isStaticShortcut(r)) {
                if (r[0] === a) {
                    s = s || r[2];
                    o = r[1];
                    n(r);
                    break;
                }
            } else {
                const e = a.match(r[0]);
                e && (o = r[1](e, t));
                if (o) {
                    s = s || r[2];
                    n(r);
                    break;
                }
            }
        }
        isString1(o) && (o = expandVariantGroup(o.trim()).split(/\s+/g));
        if (!o) {
            const [n, s] = isString1(e) ? await this.matchVariants(e) : e;
            if (n !== s) {
                const e = await this.expandShortcut(s, t, r - 1);
                e && (o = e[0].map((e)=>isString1(e) ? n.replace(s, e) : e));
            }
        }
        return o ? [
            (await Promise.all(o.map(async (e)=>(isString1(e) ? (await this.expandShortcut(e, t, r - 1))?.[0] : void 0) || [
                    e
                ]))).flat(1).filter(Boolean),
            s
        ] : void 0;
    }
    async stringifyShortcuts(e, t, r, n = {
        layer: this.config.shortcutsLayer
    }) {
        const o = new TwoKeyMap;
        const a = (await Promise.all(uniq(r).map(async (r)=>{
            const s = isString1(r) ? await this.parseUtil(r, t, true, n.prefix) : [
                [
                    Number.POSITIVE_INFINITY,
                    "{inline}",
                    normalizeCSSEntries(r),
                    void 0,
                    []
                ]
            ];
            !s && this.config.warn && warnOnce1(`unmatched utility "${r}" in shortcut "${e[1]}"`);
            return s || [];
        }))).flat(1).filter(Boolean).sort((e, t)=>e[0] - t[0]);
        const [i, , c] = e;
        const l = [];
        for (const e of a){
            if (isRawUtil(e)) {
                l.push([
                    e[0],
                    void 0,
                    e[1],
                    void 0,
                    e[2],
                    t,
                    void 0
                ]);
                continue;
            }
            const { selector: r, entries: n, parent: s, sort: a, noMerge: u } = this.applyVariants(e, [
                ...e[4],
                ...c
            ], i);
            const f = o.getFallback(r, s, [
                [],
                e[0]
            ]);
            f[0].push([
                n,
                !!(u ?? e[3]?.noMerge),
                a ?? 0
            ]);
        }
        return l.concat(o.map(([e, r], o, a)=>{
            const stringify = (e, s, i)=>{
                const c = Math.max(...i.map((e)=>e[1]));
                const l = i.map((e)=>e[0]);
                return (e ? [
                    l.flat(1)
                ] : l).map((e)=>{
                    const i = entriesToCss1(e);
                    if (i) return [
                        r,
                        o,
                        i,
                        a,
                        {
                            ...n,
                            noMerge: s,
                            sort: c
                        },
                        t,
                        void 0
                    ];
                });
            };
            const i = [
                [
                    e.filter(([, e])=>e).map(([e, , t])=>[
                            e,
                            t
                        ]),
                    true
                ],
                [
                    e.filter(([, e])=>!e).map(([e, , t])=>[
                            e,
                            t
                        ]),
                    false
                ]
            ];
            return i.map(([e, t])=>[
                    ...stringify(false, t, e.filter(([e])=>e.some((e)=>e[0] === s5))),
                    ...stringify(true, t, e.filter(([e])=>e.every((e)=>e[0] !== s5)))
                ]);
        }).flat(2).filter(Boolean));
    }
    isBlocked(e) {
        return !e || this.config.blocklist.some((t)=>"function" === typeof t ? t(e) : isString1(t) ? t === e : t.test(e));
    }
}
function createGenerator(e, t) {
    return new UnoGenerator(e, t);
}
const w3 = /\s\$\$\s+/g;
function hasScopePlaceholder(e) {
    return e.match(/\s\$\$\s/);
}
function applyScope(e, t) {
    return hasScopePlaceholder(e) ? e.replace(w3, t ? ` ${t} ` : " ") : t ? `${t} ${e}` : e;
}
const b4 = /^\[(.+?)(~?=)"(.*)"\]$/;
function toEscapedSelector(t) {
    return b4.test(t) ? t.replace(b4, (t, r, n, s)=>`[${e3(r)}${n}"${e3(s)}"]`) : `.${e3(t)}`;
}
function defaultVariantHandler(e, t) {
    return t(e);
}
const osType = (()=>{
    const { Deno: Deno1 } = globalThis;
    if (typeof Deno1?.build?.os === "string") {
        return Deno1.build.os;
    }
    const { navigator } = globalThis;
    if (navigator?.appVersion?.includes?.("Win")) {
        return "windows";
    }
    return "linux";
})();
const isWindows = osType === "windows";
class AssertionError extends Error {
    name = "AssertionError";
    constructor(message){
        super(message);
    }
}
function assert(expr, msg = "") {
    if (!expr) {
        throw new AssertionError(msg);
    }
}
const CHAR_FORWARD_SLASH = 47;
function assertPath(path) {
    if (typeof path !== "string") {
        throw new TypeError(`Path must be a string. Received ${JSON.stringify(path)}`);
    }
}
function isPosixPathSeparator(code) {
    return code === 47;
}
function isPathSeparator(code) {
    return isPosixPathSeparator(code) || code === 92;
}
function isWindowsDeviceRoot(code) {
    return code >= 97 && code <= 122 || code >= 65 && code <= 90;
}
function normalizeString(path, allowAboveRoot, separator, isPathSeparator) {
    let res = "";
    let lastSegmentLength = 0;
    let lastSlash = -1;
    let dots = 0;
    let code;
    for(let i = 0, len = path.length; i <= len; ++i){
        if (i < len) code = path.charCodeAt(i);
        else if (isPathSeparator(code)) break;
        else code = CHAR_FORWARD_SLASH;
        if (isPathSeparator(code)) {
            if (lastSlash === i - 1 || dots === 1) {} else if (lastSlash !== i - 1 && dots === 2) {
                if (res.length < 2 || lastSegmentLength !== 2 || res.charCodeAt(res.length - 1) !== 46 || res.charCodeAt(res.length - 2) !== 46) {
                    if (res.length > 2) {
                        const lastSlashIndex = res.lastIndexOf(separator);
                        if (lastSlashIndex === -1) {
                            res = "";
                            lastSegmentLength = 0;
                        } else {
                            res = res.slice(0, lastSlashIndex);
                            lastSegmentLength = res.length - 1 - res.lastIndexOf(separator);
                        }
                        lastSlash = i;
                        dots = 0;
                        continue;
                    } else if (res.length === 2 || res.length === 1) {
                        res = "";
                        lastSegmentLength = 0;
                        lastSlash = i;
                        dots = 0;
                        continue;
                    }
                }
                if (allowAboveRoot) {
                    if (res.length > 0) res += `${separator}..`;
                    else res = "..";
                    lastSegmentLength = 2;
                }
            } else {
                if (res.length > 0) res += separator + path.slice(lastSlash + 1, i);
                else res = path.slice(lastSlash + 1, i);
                lastSegmentLength = i - lastSlash - 1;
            }
            lastSlash = i;
            dots = 0;
        } else if (code === 46 && dots !== -1) {
            ++dots;
        } else {
            dots = -1;
        }
    }
    return res;
}
function stripTrailingSeparators(segment, isSep) {
    if (segment.length <= 1) {
        return segment;
    }
    let end = segment.length;
    for(let i = segment.length - 1; i > 0; i--){
        if (isSep(segment.charCodeAt(i))) {
            end = i;
        } else {
            break;
        }
    }
    return segment.slice(0, end);
}
function assertArg(path) {
    assertPath(path);
    if (path.length === 0) return ".";
}
function posixNormalize(path) {
    assertArg(path);
    const isAbsolute = isPosixPathSeparator(path.charCodeAt(0));
    const trailingSeparator = isPosixPathSeparator(path.charCodeAt(path.length - 1));
    path = normalizeString(path, !isAbsolute, "/", isPosixPathSeparator);
    if (path.length === 0 && !isAbsolute) path = ".";
    if (path.length > 0 && trailingSeparator) path += "/";
    if (isAbsolute) return `/${path}`;
    return path;
}
function windowsNormalize(path) {
    assertArg(path);
    const len = path.length;
    let rootEnd = 0;
    let device;
    let isAbsolute = false;
    const code = path.charCodeAt(0);
    if (len > 1) {
        if (isPathSeparator(code)) {
            isAbsolute = true;
            if (isPathSeparator(path.charCodeAt(1))) {
                let j = 2;
                let last = j;
                for(; j < len; ++j){
                    if (isPathSeparator(path.charCodeAt(j))) break;
                }
                if (j < len && j !== last) {
                    const firstPart = path.slice(last, j);
                    last = j;
                    for(; j < len; ++j){
                        if (!isPathSeparator(path.charCodeAt(j))) break;
                    }
                    if (j < len && j !== last) {
                        last = j;
                        for(; j < len; ++j){
                            if (isPathSeparator(path.charCodeAt(j))) break;
                        }
                        if (j === len) {
                            return `\\\\${firstPart}\\${path.slice(last)}\\`;
                        } else if (j !== last) {
                            device = `\\\\${firstPart}\\${path.slice(last, j)}`;
                            rootEnd = j;
                        }
                    }
                }
            } else {
                rootEnd = 1;
            }
        } else if (isWindowsDeviceRoot(code)) {
            if (path.charCodeAt(1) === 58) {
                device = path.slice(0, 2);
                rootEnd = 2;
                if (len > 2) {
                    if (isPathSeparator(path.charCodeAt(2))) {
                        isAbsolute = true;
                        rootEnd = 3;
                    }
                }
            }
        }
    } else if (isPathSeparator(code)) {
        return "\\";
    }
    let tail;
    if (rootEnd < len) {
        tail = normalizeString(path.slice(rootEnd), !isAbsolute, "\\", isPathSeparator);
    } else {
        tail = "";
    }
    if (tail.length === 0 && !isAbsolute) tail = ".";
    if (tail.length > 0 && isPathSeparator(path.charCodeAt(len - 1))) {
        tail += "\\";
    }
    if (device === undefined) {
        if (isAbsolute) {
            if (tail.length > 0) return `\\${tail}`;
            else return "\\";
        } else if (tail.length > 0) {
            return tail;
        } else {
            return "";
        }
    } else if (isAbsolute) {
        if (tail.length > 0) return `${device}\\${tail}`;
        else return `${device}\\`;
    } else if (tail.length > 0) {
        return device + tail;
    } else {
        return device;
    }
}
function posixJoin(...paths) {
    if (paths.length === 0) return ".";
    let joined;
    for(let i = 0, len = paths.length; i < len; ++i){
        const path = paths[i];
        assertPath(path);
        if (path.length > 0) {
            if (!joined) joined = path;
            else joined += `/${path}`;
        }
    }
    if (!joined) return ".";
    return posixNormalize(joined);
}
function windowsJoin(...paths) {
    if (paths.length === 0) return ".";
    let joined;
    let firstPart = null;
    for(let i = 0; i < paths.length; ++i){
        const path = paths[i];
        assertPath(path);
        if (path.length > 0) {
            if (joined === undefined) joined = firstPart = path;
            else joined += `\\${path}`;
        }
    }
    if (joined === undefined) return ".";
    let needsReplace = true;
    let slashCount = 0;
    assert(firstPart !== null);
    if (isPathSeparator(firstPart.charCodeAt(0))) {
        ++slashCount;
        const firstLen = firstPart.length;
        if (firstLen > 1) {
            if (isPathSeparator(firstPart.charCodeAt(1))) {
                ++slashCount;
                if (firstLen > 2) {
                    if (isPathSeparator(firstPart.charCodeAt(2))) ++slashCount;
                    else {
                        needsReplace = false;
                    }
                }
            }
        }
    }
    if (needsReplace) {
        for(; slashCount < joined.length; ++slashCount){
            if (!isPathSeparator(joined.charCodeAt(slashCount))) break;
        }
        if (slashCount >= 2) joined = `\\${joined.slice(slashCount)}`;
    }
    return windowsNormalize(joined);
}
function join(...paths) {
    return isWindows ? windowsJoin(...paths) : posixJoin(...paths);
}
function normalize(path) {
    return isWindows ? windowsNormalize(path) : posixNormalize(path);
}
function posixResolve(...pathSegments) {
    let resolvedPath = "";
    let resolvedAbsolute = false;
    for(let i = pathSegments.length - 1; i >= -1 && !resolvedAbsolute; i--){
        let path;
        if (i >= 0) path = pathSegments[i];
        else {
            const { Deno: Deno1 } = globalThis;
            if (typeof Deno1?.cwd !== "function") {
                throw new TypeError("Resolved a relative path without a CWD.");
            }
            path = Deno1.cwd();
        }
        assertPath(path);
        if (path.length === 0) {
            continue;
        }
        resolvedPath = `${path}/${resolvedPath}`;
        resolvedAbsolute = isPosixPathSeparator(path.charCodeAt(0));
    }
    resolvedPath = normalizeString(resolvedPath, !resolvedAbsolute, "/", isPosixPathSeparator);
    if (resolvedAbsolute) {
        if (resolvedPath.length > 0) return `/${resolvedPath}`;
        else return "/";
    } else if (resolvedPath.length > 0) return resolvedPath;
    else return ".";
}
function windowsResolve(...pathSegments) {
    let resolvedDevice = "";
    let resolvedTail = "";
    let resolvedAbsolute = false;
    for(let i = pathSegments.length - 1; i >= -1; i--){
        let path;
        const { Deno: Deno1 } = globalThis;
        if (i >= 0) {
            path = pathSegments[i];
        } else if (!resolvedDevice) {
            if (typeof Deno1?.cwd !== "function") {
                throw new TypeError("Resolved a drive-letter-less path without a CWD.");
            }
            path = Deno1.cwd();
        } else {
            if (typeof Deno1?.env?.get !== "function" || typeof Deno1?.cwd !== "function") {
                throw new TypeError("Resolved a relative path without a CWD.");
            }
            path = Deno1.cwd();
            if (path === undefined || path.slice(0, 3).toLowerCase() !== `${resolvedDevice.toLowerCase()}\\`) {
                path = `${resolvedDevice}\\`;
            }
        }
        assertPath(path);
        const len = path.length;
        if (len === 0) continue;
        let rootEnd = 0;
        let device = "";
        let isAbsolute = false;
        const code = path.charCodeAt(0);
        if (len > 1) {
            if (isPathSeparator(code)) {
                isAbsolute = true;
                if (isPathSeparator(path.charCodeAt(1))) {
                    let j = 2;
                    let last = j;
                    for(; j < len; ++j){
                        if (isPathSeparator(path.charCodeAt(j))) break;
                    }
                    if (j < len && j !== last) {
                        const firstPart = path.slice(last, j);
                        last = j;
                        for(; j < len; ++j){
                            if (!isPathSeparator(path.charCodeAt(j))) break;
                        }
                        if (j < len && j !== last) {
                            last = j;
                            for(; j < len; ++j){
                                if (isPathSeparator(path.charCodeAt(j))) break;
                            }
                            if (j === len) {
                                device = `\\\\${firstPart}\\${path.slice(last)}`;
                                rootEnd = j;
                            } else if (j !== last) {
                                device = `\\\\${firstPart}\\${path.slice(last, j)}`;
                                rootEnd = j;
                            }
                        }
                    }
                } else {
                    rootEnd = 1;
                }
            } else if (isWindowsDeviceRoot(code)) {
                if (path.charCodeAt(1) === 58) {
                    device = path.slice(0, 2);
                    rootEnd = 2;
                    if (len > 2) {
                        if (isPathSeparator(path.charCodeAt(2))) {
                            isAbsolute = true;
                            rootEnd = 3;
                        }
                    }
                }
            }
        } else if (isPathSeparator(code)) {
            rootEnd = 1;
            isAbsolute = true;
        }
        if (device.length > 0 && resolvedDevice.length > 0 && device.toLowerCase() !== resolvedDevice.toLowerCase()) {
            continue;
        }
        if (resolvedDevice.length === 0 && device.length > 0) {
            resolvedDevice = device;
        }
        if (!resolvedAbsolute) {
            resolvedTail = `${path.slice(rootEnd)}\\${resolvedTail}`;
            resolvedAbsolute = isAbsolute;
        }
        if (resolvedAbsolute && resolvedDevice.length > 0) break;
    }
    resolvedTail = normalizeString(resolvedTail, !resolvedAbsolute, "\\", isPathSeparator);
    return resolvedDevice + (resolvedAbsolute ? "\\" : "") + resolvedTail || ".";
}
function windowsIsAbsolute(path) {
    assertPath(path);
    const len = path.length;
    if (len === 0) return false;
    const code = path.charCodeAt(0);
    if (isPathSeparator(code)) {
        return true;
    } else if (isWindowsDeviceRoot(code)) {
        if (len > 2 && path.charCodeAt(1) === 58) {
            if (isPathSeparator(path.charCodeAt(2))) return true;
        }
    }
    return false;
}
function posixIsAbsolute(path) {
    assertPath(path);
    return path.length > 0 && isPosixPathSeparator(path.charCodeAt(0));
}
function assertArgs(from, to) {
    assertPath(from);
    assertPath(to);
    if (from === to) return "";
}
function posixRelative(from, to) {
    assertArgs(from, to);
    from = posixResolve(from);
    to = posixResolve(to);
    if (from === to) return "";
    let fromStart = 1;
    const fromEnd = from.length;
    for(; fromStart < fromEnd; ++fromStart){
        if (!isPosixPathSeparator(from.charCodeAt(fromStart))) break;
    }
    const fromLen = fromEnd - fromStart;
    let toStart = 1;
    const toEnd = to.length;
    for(; toStart < toEnd; ++toStart){
        if (!isPosixPathSeparator(to.charCodeAt(toStart))) break;
    }
    const toLen = toEnd - toStart;
    const length = fromLen < toLen ? fromLen : toLen;
    let lastCommonSep = -1;
    let i = 0;
    for(; i <= length; ++i){
        if (i === length) {
            if (toLen > length) {
                if (isPosixPathSeparator(to.charCodeAt(toStart + i))) {
                    return to.slice(toStart + i + 1);
                } else if (i === 0) {
                    return to.slice(toStart + i);
                }
            } else if (fromLen > length) {
                if (isPosixPathSeparator(from.charCodeAt(fromStart + i))) {
                    lastCommonSep = i;
                } else if (i === 0) {
                    lastCommonSep = 0;
                }
            }
            break;
        }
        const fromCode = from.charCodeAt(fromStart + i);
        const toCode = to.charCodeAt(toStart + i);
        if (fromCode !== toCode) break;
        else if (isPosixPathSeparator(fromCode)) lastCommonSep = i;
    }
    let out = "";
    for(i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i){
        if (i === fromEnd || isPosixPathSeparator(from.charCodeAt(i))) {
            if (out.length === 0) out += "..";
            else out += "/..";
        }
    }
    if (out.length > 0) return out + to.slice(toStart + lastCommonSep);
    else {
        toStart += lastCommonSep;
        if (isPosixPathSeparator(to.charCodeAt(toStart))) ++toStart;
        return to.slice(toStart);
    }
}
function windowsRelative(from, to) {
    assertArgs(from, to);
    const fromOrig = windowsResolve(from);
    const toOrig = windowsResolve(to);
    if (fromOrig === toOrig) return "";
    from = fromOrig.toLowerCase();
    to = toOrig.toLowerCase();
    if (from === to) return "";
    let fromStart = 0;
    let fromEnd = from.length;
    for(; fromStart < fromEnd; ++fromStart){
        if (from.charCodeAt(fromStart) !== 92) break;
    }
    for(; fromEnd - 1 > fromStart; --fromEnd){
        if (from.charCodeAt(fromEnd - 1) !== 92) break;
    }
    const fromLen = fromEnd - fromStart;
    let toStart = 0;
    let toEnd = to.length;
    for(; toStart < toEnd; ++toStart){
        if (to.charCodeAt(toStart) !== 92) break;
    }
    for(; toEnd - 1 > toStart; --toEnd){
        if (to.charCodeAt(toEnd - 1) !== 92) break;
    }
    const toLen = toEnd - toStart;
    const length = fromLen < toLen ? fromLen : toLen;
    let lastCommonSep = -1;
    let i = 0;
    for(; i <= length; ++i){
        if (i === length) {
            if (toLen > length) {
                if (to.charCodeAt(toStart + i) === 92) {
                    return toOrig.slice(toStart + i + 1);
                } else if (i === 2) {
                    return toOrig.slice(toStart + i);
                }
            }
            if (fromLen > length) {
                if (from.charCodeAt(fromStart + i) === 92) {
                    lastCommonSep = i;
                } else if (i === 2) {
                    lastCommonSep = 3;
                }
            }
            break;
        }
        const fromCode = from.charCodeAt(fromStart + i);
        const toCode = to.charCodeAt(toStart + i);
        if (fromCode !== toCode) break;
        else if (fromCode === 92) lastCommonSep = i;
    }
    if (i !== length && lastCommonSep === -1) {
        return toOrig;
    }
    let out = "";
    if (lastCommonSep === -1) lastCommonSep = 0;
    for(i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i){
        if (i === fromEnd || from.charCodeAt(i) === 92) {
            if (out.length === 0) out += "..";
            else out += "\\..";
        }
    }
    if (out.length > 0) {
        return out + toOrig.slice(toStart + lastCommonSep, toEnd);
    } else {
        toStart += lastCommonSep;
        if (toOrig.charCodeAt(toStart) === 92) ++toStart;
        return toOrig.slice(toStart, toEnd);
    }
}
function posixToNamespacedPath(path) {
    return path;
}
function windowsToNamespacedPath(path) {
    if (typeof path !== "string") return path;
    if (path.length === 0) return "";
    const resolvedPath = windowsResolve(path);
    if (resolvedPath.length >= 3) {
        if (resolvedPath.charCodeAt(0) === 92) {
            if (resolvedPath.charCodeAt(1) === 92) {
                const code = resolvedPath.charCodeAt(2);
                if (code !== 63 && code !== 46) {
                    return `\\\\?\\UNC\\${resolvedPath.slice(2)}`;
                }
            }
        } else if (isWindowsDeviceRoot(resolvedPath.charCodeAt(0))) {
            if (resolvedPath.charCodeAt(1) === 58 && resolvedPath.charCodeAt(2) === 92) {
                return `\\\\?\\${resolvedPath}`;
            }
        }
    }
    return path;
}
function assertArg1(path) {
    assertPath(path);
    if (path.length === 0) return ".";
}
function posixDirname(path) {
    assertArg1(path);
    let end = -1;
    let matchedNonSeparator = false;
    for(let i = path.length - 1; i >= 1; --i){
        if (isPosixPathSeparator(path.charCodeAt(i))) {
            if (matchedNonSeparator) {
                end = i;
                break;
            }
        } else {
            matchedNonSeparator = true;
        }
    }
    if (end === -1) {
        return isPosixPathSeparator(path.charCodeAt(0)) ? "/" : ".";
    }
    return stripTrailingSeparators(path.slice(0, end), isPosixPathSeparator);
}
function windowsDirname(path) {
    assertArg1(path);
    const len = path.length;
    let rootEnd = -1;
    let end = -1;
    let matchedSlash = true;
    let offset = 0;
    const code = path.charCodeAt(0);
    if (len > 1) {
        if (isPathSeparator(code)) {
            rootEnd = offset = 1;
            if (isPathSeparator(path.charCodeAt(1))) {
                let j = 2;
                let last = j;
                for(; j < len; ++j){
                    if (isPathSeparator(path.charCodeAt(j))) break;
                }
                if (j < len && j !== last) {
                    last = j;
                    for(; j < len; ++j){
                        if (!isPathSeparator(path.charCodeAt(j))) break;
                    }
                    if (j < len && j !== last) {
                        last = j;
                        for(; j < len; ++j){
                            if (isPathSeparator(path.charCodeAt(j))) break;
                        }
                        if (j === len) {
                            return path;
                        }
                        if (j !== last) {
                            rootEnd = offset = j + 1;
                        }
                    }
                }
            }
        } else if (isWindowsDeviceRoot(code)) {
            if (path.charCodeAt(1) === 58) {
                rootEnd = offset = 2;
                if (len > 2) {
                    if (isPathSeparator(path.charCodeAt(2))) rootEnd = offset = 3;
                }
            }
        }
    } else if (isPathSeparator(code)) {
        return path;
    }
    for(let i = len - 1; i >= offset; --i){
        if (isPathSeparator(path.charCodeAt(i))) {
            if (!matchedSlash) {
                end = i;
                break;
            }
        } else {
            matchedSlash = false;
        }
    }
    if (end === -1) {
        if (rootEnd === -1) return ".";
        else end = rootEnd;
    }
    return stripTrailingSeparators(path.slice(0, end), isPosixPathSeparator);
}
function stripSuffix(name, suffix) {
    if (suffix.length >= name.length) {
        return name;
    }
    const lenDiff = name.length - suffix.length;
    for(let i = suffix.length - 1; i >= 0; --i){
        if (name.charCodeAt(lenDiff + i) !== suffix.charCodeAt(i)) {
            return name;
        }
    }
    return name.slice(0, -suffix.length);
}
function lastPathSegment(path, isSep, start = 0) {
    let matchedNonSeparator = false;
    let end = path.length;
    for(let i = path.length - 1; i >= start; --i){
        if (isSep(path.charCodeAt(i))) {
            if (matchedNonSeparator) {
                start = i + 1;
                break;
            }
        } else if (!matchedNonSeparator) {
            matchedNonSeparator = true;
            end = i + 1;
        }
    }
    return path.slice(start, end);
}
function assertArgs1(path, suffix) {
    assertPath(path);
    if (path.length === 0) return path;
    if (typeof suffix !== "string") {
        throw new TypeError(`Suffix must be a string. Received ${JSON.stringify(suffix)}`);
    }
}
function posixBasename(path, suffix = "") {
    assertArgs1(path, suffix);
    const lastSegment = lastPathSegment(path, isPosixPathSeparator);
    const strippedSegment = stripTrailingSeparators(lastSegment, isPosixPathSeparator);
    return suffix ? stripSuffix(strippedSegment, suffix) : strippedSegment;
}
function windowsBasename(path, suffix = "") {
    assertArgs1(path, suffix);
    let start = 0;
    if (path.length >= 2) {
        const drive = path.charCodeAt(0);
        if (isWindowsDeviceRoot(drive)) {
            if (path.charCodeAt(1) === 58) start = 2;
        }
    }
    const lastSegment = lastPathSegment(path, isPathSeparator, start);
    const strippedSegment = stripTrailingSeparators(lastSegment, isPathSeparator);
    return suffix ? stripSuffix(strippedSegment, suffix) : strippedSegment;
}
function posixExtname(path) {
    assertPath(path);
    let startDot = -1;
    let startPart = 0;
    let end = -1;
    let matchedSlash = true;
    let preDotState = 0;
    for(let i = path.length - 1; i >= 0; --i){
        const code = path.charCodeAt(i);
        if (isPosixPathSeparator(code)) {
            if (!matchedSlash) {
                startPart = i + 1;
                break;
            }
            continue;
        }
        if (end === -1) {
            matchedSlash = false;
            end = i + 1;
        }
        if (code === 46) {
            if (startDot === -1) startDot = i;
            else if (preDotState !== 1) preDotState = 1;
        } else if (startDot !== -1) {
            preDotState = -1;
        }
    }
    if (startDot === -1 || end === -1 || preDotState === 0 || preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
        return "";
    }
    return path.slice(startDot, end);
}
function windowsExtname(path) {
    assertPath(path);
    let start = 0;
    let startDot = -1;
    let startPart = 0;
    let end = -1;
    let matchedSlash = true;
    let preDotState = 0;
    if (path.length >= 2 && path.charCodeAt(1) === 58 && isWindowsDeviceRoot(path.charCodeAt(0))) {
        start = startPart = 2;
    }
    for(let i = path.length - 1; i >= start; --i){
        const code = path.charCodeAt(i);
        if (isPathSeparator(code)) {
            if (!matchedSlash) {
                startPart = i + 1;
                break;
            }
            continue;
        }
        if (end === -1) {
            matchedSlash = false;
            end = i + 1;
        }
        if (code === 46) {
            if (startDot === -1) startDot = i;
            else if (preDotState !== 1) preDotState = 1;
        } else if (startDot !== -1) {
            preDotState = -1;
        }
    }
    if (startDot === -1 || end === -1 || preDotState === 0 || preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
        return "";
    }
    return path.slice(startDot, end);
}
function _format(sep, pathObject) {
    const dir = pathObject.dir || pathObject.root;
    const base = pathObject.base || (pathObject.name || "") + (pathObject.ext || "");
    if (!dir) return base;
    if (base === sep) return dir;
    if (dir === pathObject.root) return dir + base;
    return dir + sep + base;
}
function assertArg2(pathObject) {
    if (pathObject === null || typeof pathObject !== "object") {
        throw new TypeError(`The "pathObject" argument must be of type Object. Received type ${typeof pathObject}`);
    }
}
function posixFormat(pathObject) {
    assertArg2(pathObject);
    return _format("/", pathObject);
}
function windowsFormat(pathObject) {
    assertArg2(pathObject);
    return _format("\\", pathObject);
}
function posixParse(path) {
    assertPath(path);
    const ret = {
        root: "",
        dir: "",
        base: "",
        ext: "",
        name: ""
    };
    if (path.length === 0) return ret;
    const isAbsolute = isPosixPathSeparator(path.charCodeAt(0));
    let start;
    if (isAbsolute) {
        ret.root = "/";
        start = 1;
    } else {
        start = 0;
    }
    let startDot = -1;
    let startPart = 0;
    let end = -1;
    let matchedSlash = true;
    let i = path.length - 1;
    let preDotState = 0;
    for(; i >= start; --i){
        const code = path.charCodeAt(i);
        if (isPosixPathSeparator(code)) {
            if (!matchedSlash) {
                startPart = i + 1;
                break;
            }
            continue;
        }
        if (end === -1) {
            matchedSlash = false;
            end = i + 1;
        }
        if (code === 46) {
            if (startDot === -1) startDot = i;
            else if (preDotState !== 1) preDotState = 1;
        } else if (startDot !== -1) {
            preDotState = -1;
        }
    }
    if (startDot === -1 || end === -1 || preDotState === 0 || preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
        if (end !== -1) {
            if (startPart === 0 && isAbsolute) {
                ret.base = ret.name = path.slice(1, end);
            } else {
                ret.base = ret.name = path.slice(startPart, end);
            }
        }
        ret.base = ret.base || "/";
    } else {
        if (startPart === 0 && isAbsolute) {
            ret.name = path.slice(1, startDot);
            ret.base = path.slice(1, end);
        } else {
            ret.name = path.slice(startPart, startDot);
            ret.base = path.slice(startPart, end);
        }
        ret.ext = path.slice(startDot, end);
    }
    if (startPart > 0) {
        ret.dir = stripTrailingSeparators(path.slice(0, startPart - 1), isPosixPathSeparator);
    } else if (isAbsolute) ret.dir = "/";
    return ret;
}
function windowsParse(path) {
    assertPath(path);
    const ret = {
        root: "",
        dir: "",
        base: "",
        ext: "",
        name: ""
    };
    const len = path.length;
    if (len === 0) return ret;
    let rootEnd = 0;
    let code = path.charCodeAt(0);
    if (len > 1) {
        if (isPathSeparator(code)) {
            rootEnd = 1;
            if (isPathSeparator(path.charCodeAt(1))) {
                let j = 2;
                let last = j;
                for(; j < len; ++j){
                    if (isPathSeparator(path.charCodeAt(j))) break;
                }
                if (j < len && j !== last) {
                    last = j;
                    for(; j < len; ++j){
                        if (!isPathSeparator(path.charCodeAt(j))) break;
                    }
                    if (j < len && j !== last) {
                        last = j;
                        for(; j < len; ++j){
                            if (isPathSeparator(path.charCodeAt(j))) break;
                        }
                        if (j === len) {
                            rootEnd = j;
                        } else if (j !== last) {
                            rootEnd = j + 1;
                        }
                    }
                }
            }
        } else if (isWindowsDeviceRoot(code)) {
            if (path.charCodeAt(1) === 58) {
                rootEnd = 2;
                if (len > 2) {
                    if (isPathSeparator(path.charCodeAt(2))) {
                        if (len === 3) {
                            ret.root = ret.dir = path;
                            ret.base = "\\";
                            return ret;
                        }
                        rootEnd = 3;
                    }
                } else {
                    ret.root = ret.dir = path;
                    return ret;
                }
            }
        }
    } else if (isPathSeparator(code)) {
        ret.root = ret.dir = path;
        ret.base = "\\";
        return ret;
    }
    if (rootEnd > 0) ret.root = path.slice(0, rootEnd);
    let startDot = -1;
    let startPart = rootEnd;
    let end = -1;
    let matchedSlash = true;
    let i = path.length - 1;
    let preDotState = 0;
    for(; i >= rootEnd; --i){
        code = path.charCodeAt(i);
        if (isPathSeparator(code)) {
            if (!matchedSlash) {
                startPart = i + 1;
                break;
            }
            continue;
        }
        if (end === -1) {
            matchedSlash = false;
            end = i + 1;
        }
        if (code === 46) {
            if (startDot === -1) startDot = i;
            else if (preDotState !== 1) preDotState = 1;
        } else if (startDot !== -1) {
            preDotState = -1;
        }
    }
    if (startDot === -1 || end === -1 || preDotState === 0 || preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
        if (end !== -1) {
            ret.base = ret.name = path.slice(startPart, end);
        }
    } else {
        ret.name = path.slice(startPart, startDot);
        ret.base = path.slice(startPart, end);
        ret.ext = path.slice(startDot, end);
    }
    ret.base = ret.base || "\\";
    if (startPart > 0 && startPart !== rootEnd) {
        ret.dir = path.slice(0, startPart - 1);
    } else ret.dir = ret.root;
    return ret;
}
function assertArg3(url) {
    url = url instanceof URL ? url : new URL(url);
    if (url.protocol !== "file:") {
        throw new TypeError("Must be a file URL.");
    }
    return url;
}
function posixFromFileUrl(url) {
    url = assertArg3(url);
    return decodeURIComponent(url.pathname.replace(/%(?![0-9A-Fa-f]{2})/g, "%25"));
}
function windowsFromFileUrl(url) {
    url = assertArg3(url);
    let path = decodeURIComponent(url.pathname.replace(/\//g, "\\").replace(/%(?![0-9A-Fa-f]{2})/g, "%25")).replace(/^\\*([A-Za-z]:)(\\|$)/, "$1\\");
    if (url.hostname !== "") {
        path = `\\\\${url.hostname}${path}`;
    }
    return path;
}
const WHITESPACE_ENCODINGS = {
    "\u0009": "%09",
    "\u000A": "%0A",
    "\u000B": "%0B",
    "\u000C": "%0C",
    "\u000D": "%0D",
    "\u0020": "%20"
};
function encodeWhitespace(string) {
    return string.replaceAll(/[\s]/g, (c)=>{
        return WHITESPACE_ENCODINGS[c] ?? c;
    });
}
function posixToFileUrl(path) {
    if (!posixIsAbsolute(path)) {
        throw new TypeError("Must be an absolute path.");
    }
    const url = new URL("file:///");
    url.pathname = encodeWhitespace(path.replace(/%/g, "%25").replace(/\\/g, "%5C"));
    return url;
}
function windowsToFileUrl(path) {
    if (!windowsIsAbsolute(path)) {
        throw new TypeError("Must be an absolute path.");
    }
    const [, hostname, pathname] = path.match(/^(?:[/\\]{2}([^/\\]+)(?=[/\\](?:[^/\\]|$)))?(.*)/);
    const url = new URL("file:///");
    url.pathname = encodeWhitespace(pathname.replace(/%/g, "%25"));
    if (hostname !== undefined && hostname !== "localhost") {
        url.hostname = hostname;
        if (!url.hostname) {
            throw new TypeError("Invalid hostname.");
        }
    }
    return url;
}
const sep = "\\";
const delimiter = ";";
const mod = {
    resolve: windowsResolve,
    normalize: windowsNormalize,
    isAbsolute: windowsIsAbsolute,
    join: windowsJoin,
    relative: windowsRelative,
    toNamespacedPath: windowsToNamespacedPath,
    dirname: windowsDirname,
    basename: windowsBasename,
    extname: windowsExtname,
    format: windowsFormat,
    parse: windowsParse,
    fromFileUrl: windowsFromFileUrl,
    toFileUrl: windowsToFileUrl,
    sep: sep,
    delimiter: delimiter
};
const sep1 = "/";
const delimiter1 = ":";
const mod1 = {
    resolve: posixResolve,
    normalize: posixNormalize,
    isAbsolute: posixIsAbsolute,
    join: posixJoin,
    relative: posixRelative,
    toNamespacedPath: posixToNamespacedPath,
    dirname: posixDirname,
    basename: posixBasename,
    extname: posixExtname,
    format: posixFormat,
    parse: posixParse,
    fromFileUrl: posixFromFileUrl,
    toFileUrl: posixToFileUrl,
    sep: sep1,
    delimiter: delimiter1
};
function basename(path, suffix = "") {
    return isWindows ? windowsBasename(path, suffix) : posixBasename(path, suffix);
}
function fromFileUrl(url) {
    return isWindows ? windowsFromFileUrl(url) : posixFromFileUrl(url);
}
const path = isWindows ? mod : mod1;
const { join: join1, normalize: normalize1 } = path;
isWindows ? mod.delimiter : mod1.delimiter;
async function createWalkEntry(path) {
    path = toPathString(path);
    path = normalize(path);
    const name = basename(path);
    const info = await Deno.stat(path);
    return {
        path,
        name,
        isFile: info.isFile,
        isDirectory: info.isDirectory,
        isSymlink: info.isSymlink
    };
}
function toPathString(pathUrl) {
    return pathUrl instanceof URL ? fromFileUrl(pathUrl) : pathUrl;
}
class WalkError extends Error {
    cause;
    name = "WalkError";
    path;
    constructor(cause, path){
        super(`${cause instanceof Error ? cause.message : cause} for path "${path}"`);
        this.path = path;
        this.cause = cause;
    }
}
function include(path, exts, match, skip) {
    if (exts && !exts.some((ext)=>path.endsWith(ext))) {
        return false;
    }
    if (match && !match.some((pattern)=>!!path.match(pattern))) {
        return false;
    }
    if (skip && skip.some((pattern)=>!!path.match(pattern))) {
        return false;
    }
    return true;
}
function wrapErrorWithPath(err, root) {
    if (err instanceof WalkError) return err;
    return new WalkError(err, root);
}
async function* walk(root, { maxDepth = Infinity, includeFiles = true, includeDirs = true, includeSymlinks = true, followSymlinks = false, exts = undefined, match = undefined, skip = undefined } = {}) {
    if (maxDepth < 0) {
        return;
    }
    root = toPathString(root);
    if (includeDirs && include(root, exts, match, skip)) {
        yield await createWalkEntry(root);
    }
    if (maxDepth < 1 || !include(root, undefined, undefined, skip)) {
        return;
    }
    try {
        for await (const entry of Deno.readDir(root)){
            let path = join(root, entry.name);
            let { isSymlink, isDirectory } = entry;
            if (isSymlink) {
                if (!followSymlinks) {
                    if (includeSymlinks && include(path, exts, match, skip)) {
                        yield {
                            path,
                            ...entry
                        };
                    }
                    continue;
                }
                path = await Deno.realPath(path);
                ({ isSymlink, isDirectory } = await Deno.lstat(path));
            }
            if (isSymlink || isDirectory) {
                yield* walk(path, {
                    maxDepth: maxDepth - 1,
                    includeFiles,
                    includeDirs,
                    includeSymlinks,
                    followSymlinks,
                    exts,
                    match,
                    skip
                });
            } else if (includeFiles && include(path, exts, match, skip)) {
                yield {
                    path,
                    ...entry
                };
            }
        }
    } catch (err) {
        throw wrapErrorWithPath(err, normalize(root));
    }
}
const codeFiles = [];
const dir = Deno.cwd() + "/config";
for await (const walkEntry of walk(dir)){
    if (walkEntry.isFile && walkEntry.path.endsWith(".js")) {
        const fileContents = await Deno.readTextFile(walkEntry.path);
        codeFiles.push(fileContents);
    }
}
const code = codeFiles.join("\n");
const generator = createGenerator(__default);
const { css } = await generator.generate(code, {
    preflights: false
});
const propertiesToYeet = [
    "line-height"
];
const classesToYeet = [
    ".text-shadow",
    ".visible",
    ".static",
    ".filter",
    ".transition",
    ".truncate"
];
const propertyRegex = new RegExp(`(${propertiesToYeet.join("|")})\\s*:\\s*([^;]+);`, "g");
const classesRegex = new RegExp(`(${classesToYeet.join("|")})\\s*{[^}]+}`, "g");
const newCss = css.replaceAll(propertyRegex, "").replaceAll(classesRegex, "");
const outputCssLocation = Deno.cwd() + "/config/uno.css";
await Deno.writeTextFile(outputCssLocation, newCss);
