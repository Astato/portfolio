/* eslint-disable */
//@ts-nocheck
import QuienAnimation from "../images/quien-soy-anim.svg?react";

export default function executeAboutAnimationSpanish() {
  !(function (t, n) {
    "object" == typeof exports && "undefined" != typeof module
      ? (module.exports = n())
      : "function" == typeof __SVGATOR_DEFINE__ && __SVGATOR_DEFINE__.amd
      ? __SVGATOR_DEFINE__(n)
      : (((t =
          "undefined" != typeof globalThis
            ? globalThis
            : t || self).__SVGATOR_PLAYER__ = t.__SVGATOR_PLAYER__ || {}),
        (t.__SVGATOR_PLAYER__["5c7f360c"] = n()));
  })(this, function () {
    "use strict";
    function t(t, n) {
      var e = Object.keys(t);
      if (Object.getOwnPropertySymbols) {
        var r = Object.getOwnPropertySymbols(t);
        n &&
          (r = r.filter(function (n) {
            return Object.getOwnPropertyDescriptor(t, n).enumerable;
          })),
          e.push.apply(e, r);
      }
      return e;
    }
    function n(n) {
      for (var e = 1; e < arguments.length; e++) {
        var r = null != arguments[e] ? arguments[e] : {};
        e % 2
          ? t(Object(r), !0).forEach(function (t) {
              o(n, t, r[t]);
            })
          : Object.getOwnPropertyDescriptors
          ? Object.defineProperties(n, Object.getOwnPropertyDescriptors(r))
          : t(Object(r)).forEach(function (t) {
              Object.defineProperty(
                n,
                t,
                Object.getOwnPropertyDescriptor(r, t)
              );
            });
      }
      return n;
    }
    function e(t) {
      return (e =
        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
          ? function (t) {
              return typeof t;
            }
          : function (t) {
              return t &&
                "function" == typeof Symbol &&
                t.constructor === Symbol &&
                t !== Symbol.prototype
                ? "symbol"
                : typeof t;
            })(t);
    }
    function r(t, n) {
      if (!(t instanceof n))
        throw new TypeError("Cannot call a class as a function");
    }
    function i(t, n) {
      for (var e = 0; e < n.length; e++) {
        var r = n[e];
        (r.enumerable = r.enumerable || !1),
          (r.configurable = !0),
          "value" in r && (r.writable = !0),
          Object.defineProperty(t, r.key, r);
      }
    }
    function u(t, n, e) {
      return n && i(t.prototype, n), e && i(t, e), t;
    }
    function o(t, n, e) {
      return (
        n in t
          ? Object.defineProperty(t, n, {
              value: e,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (t[n] = e),
        t
      );
    }
    function a(t) {
      return (a = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function (t) {
            return t.__proto__ || Object.getPrototypeOf(t);
          })(t);
    }
    function l(t, n) {
      return (l =
        Object.setPrototypeOf ||
        function (t, n) {
          return (t.__proto__ = n), t;
        })(t, n);
    }
    function s() {
      if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
      if (Reflect.construct.sham) return !1;
      if ("function" == typeof Proxy) return !0;
      try {
        return (
          Boolean.prototype.valueOf.call(
            Reflect.construct(Boolean, [], function () {})
          ),
          !0
        );
      } catch (t) {
        return !1;
      }
    }
    function f(t, n, e) {
      return (f = s()
        ? Reflect.construct
        : function (t, n, e) {
            var r = [null];
            r.push.apply(r, n);
            var i = new (Function.bind.apply(t, r))();
            return e && l(i, e.prototype), i;
          }).apply(null, arguments);
    }
    function c(t, n) {
      if (n && ("object" == typeof n || "function" == typeof n)) return n;
      if (void 0 !== n)
        throw new TypeError(
          "Derived constructors may only return object or undefined"
        );
      return (function (t) {
        if (void 0 === t)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return t;
      })(t);
    }
    function h(t, n, e) {
      return (h =
        "undefined" != typeof Reflect && Reflect.get
          ? Reflect.get
          : function (t, n, e) {
              var r = (function (t, n) {
                for (
                  ;
                  !Object.prototype.hasOwnProperty.call(t, n) &&
                  null !== (t = a(t));

                );
                return t;
              })(t, n);
              if (r) {
                var i = Object.getOwnPropertyDescriptor(r, n);
                return i.get ? i.get.call(e) : i.value;
              }
            })(t, n, e || t);
    }
    function v(t) {
      return (
        (function (t) {
          if (Array.isArray(t)) return d(t);
        })(t) ||
        (function (t) {
          if (
            ("undefined" != typeof Symbol && null != t[Symbol.iterator]) ||
            null != t["@@iterator"]
          )
            return Array.from(t);
        })(t) ||
        (function (t, n) {
          if (!t) return;
          if ("string" == typeof t) return d(t, n);
          var e = Object.prototype.toString.call(t).slice(8, -1);
          "Object" === e && t.constructor && (e = t.constructor.name);
          if ("Map" === e || "Set" === e) return Array.from(t);
          if (
            "Arguments" === e ||
            /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)
          )
            return d(t, n);
        })(t) ||
        (function () {
          throw new TypeError(
            "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
          );
        })()
      );
    }
    function d(t, n) {
      (null == n || n > t.length) && (n = t.length);
      for (var e = 0, r = new Array(n); e < n; e++) r[e] = t[e];
      return r;
    }
    function y(t, n, e) {
      if (Number.isInteger(t)) return t;
      var r = Math.pow(10, n);
      return Math[e]((+t + Number.EPSILON) * r) / r;
    }
    Number.isInteger ||
      (Number.isInteger = function (t) {
        return "number" == typeof t && isFinite(t) && Math.floor(t) === t;
      }),
      Number.EPSILON || (Number.EPSILON = 2220446049250313e-31);
    var g = p(Math.pow(10, -6));
    function p(t) {
      var n =
        arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 6;
      return y(t, n, "round");
    }
    function m(t, n) {
      var e =
        arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : g;
      return Math.abs(t - n) < e;
    }
    p(Math.pow(10, -2)), p(Math.pow(10, -4));
    var b = Math.PI / 180;
    function w(t) {
      return t * b;
    }
    function A(t) {
      return t / b;
    }
    function k(t) {
      return t;
    }
    function _(t, n, e) {
      var r = 1 - e;
      return 3 * e * r * (t * r + n * e) + e * e * e;
    }
    function x() {
      var t =
          arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
        n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
        e = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1,
        r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 1;
      return t < 0 || t > 1 || e < 0 || e > 1
        ? null
        : m(t, n) && m(e, r)
        ? k
        : function (i) {
            if (i <= 0)
              return t > 0 ? (i * n) / t : 0 === n && e > 0 ? (i * r) / e : 0;
            if (i >= 1)
              return e < 1
                ? 1 + ((i - 1) * (r - 1)) / (e - 1)
                : 1 === e && t < 1
                ? 1 + ((i - 1) * (n - 1)) / (t - 1)
                : 1;
            for (var u, o = 0, a = 1; o < a; ) {
              var l = _(t, e, (u = (o + a) / 2));
              if (m(i, l)) break;
              l < i ? (o = u) : (a = u);
            }
            return _(n, r, u);
          };
    }
    function S() {
      return 1;
    }
    function O(t) {
      return 1 === t ? 1 : 0;
    }
    function E() {
      var t =
          arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1,
        n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
      if (1 === t) {
        if (0 === n) return O;
        if (1 === n) return S;
      }
      var e = 1 / t;
      return function (t) {
        return t >= 1 ? 1 : (t += n * e) - (t % e);
      };
    }
    var M = Math.sin,
      j = Math.cos,
      I = Math.acos,
      B = Math.asin,
      P = Math.tan,
      N = Math.atan2,
      R = Math.sqrt,
      T = (function () {
        function t() {
          var n =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : 1,
            e =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : 0,
            i =
              arguments.length > 2 && void 0 !== arguments[2]
                ? arguments[2]
                : 0,
            u =
              arguments.length > 3 && void 0 !== arguments[3]
                ? arguments[3]
                : 1,
            o =
              arguments.length > 4 && void 0 !== arguments[4]
                ? arguments[4]
                : 0,
            a =
              arguments.length > 5 && void 0 !== arguments[5]
                ? arguments[5]
                : 0;
          r(this, t),
            (this.m = [n, e, i, u, o, a]),
            (this.i = null),
            (this.w = null),
            (this.s = null);
        }
        return (
          u(
            t,
            [
              {
                key: "determinant",
                get: function () {
                  var t = this.m;
                  return t[0] * t[3] - t[1] * t[2];
                },
              },
              {
                key: "isIdentity",
                get: function () {
                  if (null === this.i) {
                    var t = this.m;
                    this.i =
                      1 === t[0] &&
                      0 === t[1] &&
                      0 === t[2] &&
                      1 === t[3] &&
                      0 === t[4] &&
                      0 === t[5];
                  }
                  return this.i;
                },
              },
              {
                key: "point",
                value: function (t, n) {
                  var e = this.m;
                  return {
                    x: e[0] * t + e[2] * n + e[4],
                    y: e[1] * t + e[3] * n + e[5],
                  };
                },
              },
              {
                key: "translateSelf",
                value: function () {
                  var t =
                      arguments.length > 0 && void 0 !== arguments[0]
                        ? arguments[0]
                        : 0,
                    n =
                      arguments.length > 1 && void 0 !== arguments[1]
                        ? arguments[1]
                        : 0;
                  if (!t && !n) return this;
                  var e = this.m;
                  return (
                    (e[4] += e[0] * t + e[2] * n),
                    (e[5] += e[1] * t + e[3] * n),
                    (this.w = this.s = this.i = null),
                    this
                  );
                },
              },
              {
                key: "rotateSelf",
                value: function () {
                  var t =
                    arguments.length > 0 && void 0 !== arguments[0]
                      ? arguments[0]
                      : 0;
                  if ((t %= 360)) {
                    t = w(t);
                    var n = M(t),
                      e = j(t),
                      r = this.m,
                      i = r[0],
                      u = r[1];
                    (r[0] = i * e + r[2] * n),
                      (r[1] = u * e + r[3] * n),
                      (r[2] = r[2] * e - i * n),
                      (r[3] = r[3] * e - u * n),
                      (this.w = this.s = this.i = null);
                  }
                  return this;
                },
              },
              {
                key: "scaleSelf",
                value: function () {
                  var t =
                      arguments.length > 0 && void 0 !== arguments[0]
                        ? arguments[0]
                        : 1,
                    n =
                      arguments.length > 1 && void 0 !== arguments[1]
                        ? arguments[1]
                        : 1;
                  if (1 !== t || 1 !== n) {
                    var e = this.m;
                    (e[0] *= t),
                      (e[1] *= t),
                      (e[2] *= n),
                      (e[3] *= n),
                      (this.w = this.s = this.i = null);
                  }
                  return this;
                },
              },
              {
                key: "skewSelf",
                value: function (t, n) {
                  if (((n %= 360), (t %= 360) || n)) {
                    var e = this.m,
                      r = e[0],
                      i = e[1],
                      u = e[2],
                      o = e[3];
                    t && ((t = P(w(t))), (e[2] += r * t), (e[3] += i * t)),
                      n && ((n = P(w(n))), (e[0] += u * n), (e[1] += o * n)),
                      (this.w = this.s = this.i = null);
                  }
                  return this;
                },
              },
              {
                key: "resetSelf",
                value: function () {
                  var t =
                      arguments.length > 0 && void 0 !== arguments[0]
                        ? arguments[0]
                        : 1,
                    n =
                      arguments.length > 1 && void 0 !== arguments[1]
                        ? arguments[1]
                        : 0,
                    e =
                      arguments.length > 2 && void 0 !== arguments[2]
                        ? arguments[2]
                        : 0,
                    r =
                      arguments.length > 3 && void 0 !== arguments[3]
                        ? arguments[3]
                        : 1,
                    i =
                      arguments.length > 4 && void 0 !== arguments[4]
                        ? arguments[4]
                        : 0,
                    u =
                      arguments.length > 5 && void 0 !== arguments[5]
                        ? arguments[5]
                        : 0,
                    o = this.m;
                  return (
                    (o[0] = t),
                    (o[1] = n),
                    (o[2] = e),
                    (o[3] = r),
                    (o[4] = i),
                    (o[5] = u),
                    (this.w = this.s = this.i = null),
                    this
                  );
                },
              },
              {
                key: "recomposeSelf",
                value: function () {
                  var t =
                      arguments.length > 0 && void 0 !== arguments[0]
                        ? arguments[0]
                        : null,
                    n =
                      arguments.length > 1 && void 0 !== arguments[1]
                        ? arguments[1]
                        : null,
                    e =
                      arguments.length > 2 && void 0 !== arguments[2]
                        ? arguments[2]
                        : null,
                    r =
                      arguments.length > 3 && void 0 !== arguments[3]
                        ? arguments[3]
                        : null,
                    i =
                      arguments.length > 4 && void 0 !== arguments[4]
                        ? arguments[4]
                        : null;
                  return (
                    this.isIdentity || this.resetSelf(),
                    t && (t.x || t.y) && this.translateSelf(t.x, t.y),
                    n && this.rotateSelf(n),
                    e &&
                      (e.x && this.skewSelf(e.x, 0),
                      e.y && this.skewSelf(0, e.y)),
                    !r || (1 === r.x && 1 === r.y) || this.scaleSelf(r.x, r.y),
                    i && (i.x || i.y) && this.translateSelf(i.x, i.y),
                    this
                  );
                },
              },
              {
                key: "decompose",
                value: function () {
                  var t =
                      arguments.length > 0 && void 0 !== arguments[0]
                        ? arguments[0]
                        : 0,
                    n =
                      arguments.length > 1 && void 0 !== arguments[1]
                        ? arguments[1]
                        : 0,
                    e = this.m,
                    r = e[0] * e[0] + e[1] * e[1],
                    i = [
                      [e[0], e[1]],
                      [e[2], e[3]],
                    ],
                    u = R(r);
                  if (0 === u)
                    return {
                      origin: { x: p(e[4]), y: p(e[5]) },
                      translate: { x: p(t), y: p(n) },
                      scale: { x: 0, y: 0 },
                      skew: { x: 0, y: 0 },
                      rotate: 0,
                    };
                  (i[0][0] /= u), (i[0][1] /= u);
                  var o = e[0] * e[3] - e[1] * e[2] < 0;
                  o && (u = -u);
                  var a = i[0][0] * i[1][0] + i[0][1] * i[1][1];
                  (i[1][0] -= i[0][0] * a), (i[1][1] -= i[0][1] * a);
                  var l,
                    s = R(i[1][0] * i[1][0] + i[1][1] * i[1][1]);
                  return 0 === s
                    ? {
                        origin: { x: p(e[4]), y: p(e[5]) },
                        translate: { x: p(t), y: p(n) },
                        scale: { x: p(u), y: 0 },
                        skew: { x: 0, y: 0 },
                        rotate: 0,
                      }
                    : ((i[1][0] /= s),
                      (i[1][1] /= s),
                      (a /= s),
                      i[1][1] < 0
                        ? ((l = A(I(i[1][1]))), i[0][1] < 0 && (l = 360 - l))
                        : (l = A(B(i[0][1]))),
                      o && (l = -l),
                      (a = A(N(a, R(i[0][0] * i[0][0] + i[0][1] * i[0][1])))),
                      o && (a = -a),
                      {
                        origin: { x: p(e[4]), y: p(e[5]) },
                        translate: { x: p(t), y: p(n) },
                        scale: { x: p(u), y: p(s) },
                        skew: { x: p(a), y: 0 },
                        rotate: p(l),
                      });
                },
              },
              {
                key: "multiply",
                value: function (t) {
                  return this.clone().multiplySelf(t);
                },
              },
              {
                key: "preMultiply",
                value: function (t) {
                  return t.multiply(this);
                },
              },
              {
                key: "multiplySelf",
                value: function (t) {
                  var n = F(this.m, t.m),
                    e = n.a,
                    r = n.b,
                    i = n.c,
                    u = n.d,
                    o = n.tx,
                    a = n.ty;
                  return this.resetSelf(e, r, i, u, o, a), this;
                },
              },
              {
                key: "preMultiplySelf",
                value: function (t) {
                  var n = F(t.m, this.m),
                    e = n.a,
                    r = n.b,
                    i = n.c,
                    u = n.d,
                    o = n.tx,
                    a = n.ty;
                  return this.resetSelf(e, r, i, u, o, a), this;
                },
              },
              {
                key: "clone",
                value: function () {
                  var t = this.m;
                  return new this.constructor(
                    t[0],
                    t[1],
                    t[2],
                    t[3],
                    t[4],
                    t[5]
                  );
                },
              },
              {
                key: "toString",
                value: function () {
                  var t =
                    arguments.length > 0 && void 0 !== arguments[0]
                      ? arguments[0]
                      : " ";
                  if (null === this.s) {
                    var n = this.m.map(function (t) {
                      return p(t);
                    });
                    1 === n[0] && 0 === n[1] && 0 === n[2] && 1 === n[3]
                      ? (this.s = "translate(" + n[4] + t + n[5] + ")")
                      : (this.s = "matrix(" + n.join(t) + ")");
                  }
                  return this.s;
                },
              },
            ],
            [
              {
                key: "create",
                value: function (t) {
                  return t
                    ? Array.isArray(t)
                      ? f(this, v(t))
                      : t instanceof this
                      ? t.clone()
                      : new this().recomposeSelf(
                          t.origin,
                          t.rotate,
                          t.skew,
                          t.scale,
                          t.translate
                        )
                    : new this();
                },
              },
            ]
          ),
          t
        );
      })();
    function F(t, n) {
      return {
        a: t[0] * n[0] + t[2] * n[1],
        b: t[1] * n[0] + t[3] * n[1],
        c: t[0] * n[2] + t[2] * n[3],
        d: t[1] * n[2] + t[3] * n[3],
        tx: t[0] * n[4] + t[2] * n[5] + t[4],
        ty: t[1] * n[4] + t[3] * n[5] + t[5],
      };
    }
    function C(t, n, e) {
      return t >= 0.5 ? e : n;
    }
    function D(t, n, e) {
      return 0 === t || n === e ? n : t * (e - n) + n;
    }
    function L(t, n, e) {
      var r = D(t, n, e);
      return r <= 0 ? 0 : r;
    }
    function V(t, n, e) {
      var r = D(t, n, e);
      return r <= 0 ? 0 : r >= 1 ? 1 : r;
    }
    function q(t, n, e) {
      return 0 === t
        ? n
        : 1 === t
        ? e
        : { x: D(t, n.x, e.x), y: D(t, n.y, e.y) };
    }
    function G(t, n, e) {
      return 0 === t
        ? n
        : 1 === t
        ? e
        : { x: L(t, n.x, e.x), y: L(t, n.y, e.y) };
    }
    function z(t, n, e) {
      var r = (function (t, n, e) {
        return Math.round(D(t, n, e));
      })(t, n, e);
      return r <= 0 ? 0 : r >= 255 ? 255 : r;
    }
    function Y(t, n, e) {
      return 0 === t
        ? n
        : 1 === t
        ? e
        : {
            r: z(t, n.r, e.r),
            g: z(t, n.g, e.g),
            b: z(t, n.b, e.b),
            a: D(t, null == n.a ? 1 : n.a, null == e.a ? 1 : e.a),
          };
    }
    function U(t, n, e) {
      var r = n.length;
      if (r !== e.length) return C(t, n, e);
      for (var i = new Array(r), u = 0; u < r; u++) i[u] = D(t, n[u], e[u]);
      return i;
    }
    function W(t, n) {
      for (var e = [], r = 0; r < t; r++) e.push(n);
      return e;
    }
    function $(t, n) {
      if (--n <= 0) return t;
      var e = (t = Object.assign([], t)).length;
      do {
        for (var r = 0; r < e; r++) t.push(t[r]);
      } while (--n > 0);
      return t;
    }
    var H,
      Q = (function () {
        function t(n) {
          r(this, t), (this.list = n), (this.length = n.length);
        }
        return (
          u(t, [
            {
              key: "setAttribute",
              value: function (t, n) {
                for (var e = this.list, r = 0; r < this.length; r++)
                  e[r].setAttribute(t, n);
              },
            },
            {
              key: "removeAttribute",
              value: function (t) {
                for (var n = this.list, e = 0; e < this.length; e++)
                  n[e].removeAttribute(t);
              },
            },
            {
              key: "style",
              value: function (t, n) {
                for (var e = this.list, r = 0; r < this.length; r++)
                  e[r].style[t] = n;
              },
            },
          ]),
          t
        );
      })(),
      X = /-./g,
      J = function (t, n) {
        return n.toUpperCase();
      };
    function Z(t) {
      return "function" == typeof t ? t : C;
    }
    function K(t) {
      return t
        ? "function" == typeof t
          ? t
          : Array.isArray(t)
          ? (function (t) {
              var n =
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : k;
              if (!Array.isArray(t)) return n;
              switch (t.length) {
                case 1:
                  return E(t[0]) || n;
                case 2:
                  return E(t[0], t[1]) || n;
                case 4:
                  return x(t[0], t[1], t[2], t[3]) || n;
              }
              return n;
            })(t, null)
          : (function (t, n) {
              var e =
                arguments.length > 2 && void 0 !== arguments[2]
                  ? arguments[2]
                  : k;
              switch (t) {
                case "linear":
                  return k;
                case "steps":
                  return E(n.steps || 1, n.jump || 0) || e;
                case "bezier":
                case "cubic-bezier":
                  return x(n.x1 || 0, n.y1 || 0, n.x2 || 0, n.y2 || 0) || e;
              }
              return e;
            })(t.type, t.value, null)
        : null;
    }
    function tt(t, n, e) {
      var r = arguments.length > 3 && void 0 !== arguments[3] && arguments[3],
        i = n.length - 1;
      if (t <= n[0].t) return r ? [0, 0, n[0].v] : n[0].v;
      if (t >= n[i].t) return r ? [i, 1, n[i].v] : n[i].v;
      var u,
        o = n[0],
        a = null;
      for (u = 1; u <= i; u++) {
        if (!(t > n[u].t)) {
          a = n[u];
          break;
        }
        o = n[u];
      }
      return null == a
        ? r
          ? [i, 1, n[i].v]
          : n[i].v
        : o.t === a.t
        ? r
          ? [u, 1, a.v]
          : a.v
        : ((t = (t - o.t) / (a.t - o.t)),
          o.e && (t = o.e(t)),
          r ? [u, t, e(t, o.v, a.v)] : e(t, o.v, a.v));
    }
    function nt(t, n) {
      var e =
        arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null;
      return t && t.length
        ? "function" != typeof n
          ? null
          : ("function" != typeof e && (e = null),
            function (r) {
              var i = tt(r, t, n);
              return null != i && e && (i = e(i)), i;
            })
        : null;
    }
    function et(t, n) {
      return t.t - n.t;
    }
    function rt(t, n, r, i, u) {
      var o,
        a = "@" === r[0],
        l = "#" === r[0],
        s = H[r],
        f = C;
      switch (
        (a
          ? ((o = r.substr(1)), (r = o.replace(X, J)))
          : l && (r = r.substr(1)),
        e(s))
      ) {
        case "function":
          if (((f = s(i, u, tt, K, r, a, n, t)), l)) return f;
          break;
        case "string":
          f = nt(i, Z(s));
          break;
        case "object":
          if ((f = nt(i, Z(s.i), s.f)) && "function" == typeof s.u)
            return s.u(n, f, r, a, t);
      }
      return f
        ? (function (t, n, e) {
            if (arguments.length > 3 && void 0 !== arguments[3] && arguments[3])
              return t instanceof Q
                ? function (r) {
                    return t.style(n, e(r));
                  }
                : function (r) {
                    return (t.style[n] = e(r));
                  };
            if (Array.isArray(n)) {
              var r = n.length;
              return function (i) {
                var u = e(i);
                if (null == u)
                  for (var o = 0; o < r; o++) t[o].removeAttribute(n);
                else for (var a = 0; a < r; a++) t[a].setAttribute(n, u);
              };
            }
            return function (r) {
              var i = e(r);
              null == i ? t.removeAttribute(n) : t.setAttribute(n, i);
            };
          })(n, r, f, a)
        : null;
    }
    function it(t, n, r, i) {
      if (!i || "object" !== e(i)) return null;
      var u = null,
        o = null;
      return (
        Array.isArray(i)
          ? (o = (function (t) {
              if (!t || !t.length) return null;
              for (var n = 0; n < t.length; n++) t[n].e && (t[n].e = K(t[n].e));
              return t.sort(et);
            })(i))
          : ((o = i.keys), (u = i.data || null)),
        o ? rt(t, n, r, o, u) : null
      );
    }
    function ut(t, n, e) {
      if (!e) return null;
      var r = [];
      for (var i in e)
        if (e.hasOwnProperty(i)) {
          var u = it(t, n, i, e[i]);
          u && r.push(u);
        }
      return r.length ? r : null;
    }
    function ot(t, n) {
      if (!n.settings.duration || n.settings.duration < 0) return null;
      var e,
        r,
        i,
        u,
        o,
        a = (function (t, n) {
          if (!n) return null;
          var e = [];
          if (Array.isArray(n))
            for (var r = n.length, i = 0; i < r; i++) {
              var u = n[i];
              if (2 === u.length) {
                var o = null;
                if ("string" == typeof u[0]) o = t.getElementById(u[0]);
                else if (Array.isArray(u[0])) {
                  o = [];
                  for (var a = 0; a < u[0].length; a++)
                    if ("string" == typeof u[0][a]) {
                      var l = t.getElementById(u[0][a]);
                      l && o.push(l);
                    }
                  o = o.length ? (1 === o.length ? o[0] : new Q(o)) : null;
                }
                if (o) {
                  var s = ut(t, o, u[1]);
                  s && (e = e.concat(s));
                }
              }
            }
          else
            for (var f in n)
              if (n.hasOwnProperty(f)) {
                var c = t.getElementById(f);
                if (c) {
                  var h = ut(t, c, n[f]);
                  h && (e = e.concat(h));
                }
              }
          return e.length ? e : null;
        })(t, n.elements);
      return a
        ? ((e = a),
          (r = n.settings),
          (i = r.duration),
          (u = e.length),
          (o = null),
          function (t, n) {
            var a = r.iterations || 1 / 0,
              l = (r.alternate && a % 2 == 0) ^ (r.direction > 0) ? i : 0,
              s = t % i,
              f = 1 + (t - s) / i;
            (n *= r.direction), r.alternate && f % 2 == 0 && (n = -n);
            var c = !1;
            if (f > a)
              (s = l), (c = !0), -1 === r.fill && (s = r.direction > 0 ? 0 : i);
            else if ((n < 0 && (s = i - s), s === o)) return !1;
            o = s;
            for (var h = 0; h < u; h++) e[h](s);
            return c;
          })
        : null;
    }
    function at(t, n) {
      for (var e = n.querySelectorAll("svg"), r = 0; r < e.length; r++)
        if (e[r].id === t.root && !e[r].svgatorAnimation)
          return (e[r].svgatorAnimation = !0), e[r];
      return null;
    }
    function lt(t) {
      var n = function (t) {
        return t.shadowRoot;
      };
      return document
        ? Array.from(
            t.querySelectorAll(
              ":not(" +
                [
                  "a",
                  "area",
                  "audio",
                  "br",
                  "canvas",
                  "circle",
                  "datalist",
                  "embed",
                  "g",
                  "head",
                  "hr",
                  "iframe",
                  "img",
                  "input",
                  "link",
                  "object",
                  "path",
                  "polygon",
                  "rect",
                  "script",
                  "source",
                  "style",
                  "svg",
                  "title",
                  "track",
                  "video",
                ].join() +
                ")"
            )
          )
            .filter(n)
            .map(n)
        : [];
    }
    function st(t) {
      var n =
          arguments.length > 1 && void 0 !== arguments[1]
            ? arguments[1]
            : document,
        e = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0,
        r = at(t, n);
      if (r) return r;
      if (e >= 20) return null;
      for (var i = lt(n), u = 0; u < i.length; u++) {
        var o = st(t, i[u], e + 1);
        if (o) return o;
      }
      return null;
    }
    function ft(t, n) {
      if (((H = n), !t || !t.root || !Array.isArray(t.animations))) return null;
      var e = st(t);
      if (!e) return null;
      var r = t.animations
        .map(function (t) {
          return ot(e, t);
        })
        .filter(function (t) {
          return !!t;
        });
      return r.length
        ? {
            svg: e,
            animations: r,
            animationSettings: t.animationSettings,
            options: t.options || void 0,
          }
        : null;
    }
    function ct(t) {
      var n =
          arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null,
        e =
          arguments.length > 2 && void 0 !== arguments[2]
            ? arguments[2]
            : Number,
        r =
          arguments.length > 3 && void 0 !== arguments[3]
            ? arguments[3]
            : "undefined" != typeof BigInt && BigInt,
        i = "0x" + (t.replace(/[^0-9a-fA-F]+/g, "") || 27);
      return n && r && e.isSafeInteger && !e.isSafeInteger(+i)
        ? (e(r(i)) % n) + n
        : +i;
    }
    function ht(t, n, e) {
      return !t || !e || n > t.length
        ? t
        : t.substring(0, n) + ht(t.substring(n + 1), e, e);
    }
    function vt(t) {
      var n =
        arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 27;
      return !t || t % n ? t % n : [0, 1].includes(n) ? n : vt(t / n, n);
    }
    function dt(t, n, e) {
      if (t && t.length) {
        var r = ct(e),
          i = vt(r) + 5,
          u = ht(t, vt(r, 5), i);
        return (
          (u = u.replace(/\x7c$/g, "==").replace(/\x2f$/g, "=")),
          (u = (function (t, n, e) {
            var r = +("0x" + t.substring(0, 4));
            t = t.substring(4);
            for (
              var i = (ct(n, r) % r) + (e % 27), u = [], o = 0;
              o < t.length;
              o += 2
            )
              if ("|" !== t[o]) {
                var a = +("0x" + t[o] + t[o + 1]) - i;
                u.push(a);
              } else {
                var l = +("0x" + t.substring(o + 1, o + 1 + 4)) - i;
                (o += 3), u.push(l);
              }
            return String.fromCharCode.apply(String, u);
          })((u = (u = atob(u)).replace(/[\x41-\x5A]/g, "")), n, r)),
          (u = JSON.parse(u))
        );
      }
    }
    var yt = [
        { key: "alternate", def: !1 },
        { key: "fill", def: 1 },
        { key: "iterations", def: 0 },
        { key: "direction", def: 1 },
        { key: "speed", def: 1 },
        { key: "fps", def: 100 },
      ],
      gt = (function () {
        function t(n, e) {
          var i = this,
            u =
              arguments.length > 2 && void 0 !== arguments[2]
                ? arguments[2]
                : null;
          r(this, t),
            (this._id = 0),
            (this._running = !1),
            (this._rollingBack = !1),
            (this._animations = n),
            (this._settings = e),
            (!u || u < "2022-05-02") && delete this._settings.speed,
            yt.forEach(function (t) {
              i._settings[t.key] = i._settings[t.key] || t.def;
            }),
            (this.duration = e.duration),
            (this.offset = e.offset || 0),
            (this.rollbackStartOffset = 0);
        }
        return (
          u(
            t,
            [
              {
                key: "alternate",
                get: function () {
                  return this._settings.alternate;
                },
              },
              {
                key: "fill",
                get: function () {
                  return this._settings.fill;
                },
              },
              {
                key: "iterations",
                get: function () {
                  return this._settings.iterations;
                },
              },
              {
                key: "direction",
                get: function () {
                  return this._settings.direction;
                },
              },
              {
                key: "speed",
                get: function () {
                  return this._settings.speed;
                },
              },
              {
                key: "fps",
                get: function () {
                  return this._settings.fps;
                },
              },
              {
                key: "maxFiniteDuration",
                get: function () {
                  return this.iterations > 0
                    ? this.iterations * this.duration
                    : this.duration;
                },
              },
              {
                key: "_apply",
                value: function (t) {
                  for (
                    var n =
                        arguments.length > 1 && void 0 !== arguments[1]
                          ? arguments[1]
                          : {},
                      e = this._animations,
                      r = e.length,
                      i = 0,
                      u = 0;
                    u < r;
                    u++
                  )
                    n[u] ? i++ : ((n[u] = e[u](t, 1)), n[u] && i++);
                  return i;
                },
              },
              {
                key: "_rollback",
                value: function (t) {
                  var n = this,
                    e = 1 / 0,
                    r = null;
                  (this.rollbackStartOffset = t),
                    (this._rollingBack = !0),
                    (this._running = !0);
                  this._id = window.requestAnimationFrame(function i(u) {
                    if (n._rollingBack) {
                      null == r && (r = u);
                      var o = Math.round(t - (u - r) * n.speed);
                      if (o > n.duration && e !== 1 / 0) {
                        var a = !!n.alternate && (o / n.duration) % 2 > 1,
                          l = o % n.duration;
                        o = (l += a ? n.duration : 0) || n.duration;
                      }
                      var s = (n.fps ? 1e3 / n.fps : 0) * n.speed,
                        f = Math.max(0, o);
                      f <= e - s && ((n.offset = f), (e = f), n._apply(f));
                      var c =
                        n.iterations > 0 &&
                        -1 === n.fill &&
                        o >= n.maxFiniteDuration;
                      (o <= 0 || n.offset < o || c) && n.stop(),
                        (n._id = window.requestAnimationFrame(i));
                    }
                  });
                },
              },
              {
                key: "_start",
                value: function () {
                  var t = this,
                    n =
                      arguments.length > 0 && void 0 !== arguments[0]
                        ? arguments[0]
                        : 0,
                    e = -1 / 0,
                    r = null,
                    i = {};
                  this._running = !0;
                  var u = function u(o) {
                    null == r && (r = o);
                    var a = Math.round((o - r) * t.speed + n),
                      l = (t.fps ? 1e3 / t.fps : 0) * t.speed;
                    if (
                      a >= e + l &&
                      !t._rollingBack &&
                      ((t.offset = a),
                      (e = a),
                      t._apply(a, i) === t._animations.length)
                    )
                      return void t.pause(!0);
                    t._id = window.requestAnimationFrame(u);
                  };
                  this._id = window.requestAnimationFrame(u);
                },
              },
              {
                key: "_pause",
                value: function () {
                  this._id && window.cancelAnimationFrame(this._id),
                    (this._running = !1);
                },
              },
              {
                key: "play",
                value: function () {
                  if (!this._running)
                    return this._rollingBack
                      ? this._rollback(this.offset)
                      : this._start(this.offset);
                },
              },
              {
                key: "stop",
                value: function () {
                  this._pause(),
                    (this.offset = 0),
                    (this.rollbackStartOffset = 0),
                    (this._rollingBack = !1),
                    this._apply(0);
                },
              },
              {
                key: "reachedToEnd",
                value: function () {
                  return (
                    this.iterations > 0 &&
                    this.offset >= this.iterations * this.duration
                  );
                },
              },
              {
                key: "restart",
                value: function () {
                  var t =
                    arguments.length > 0 &&
                    void 0 !== arguments[0] &&
                    arguments[0];
                  this.stop(t), this.play(t);
                },
              },
              {
                key: "pause",
                value: function () {
                  this._pause();
                },
              },
              {
                key: "toggle",
                value: function () {
                  return this._running
                    ? this.pause()
                    : this.reachedToEnd()
                    ? this.restart()
                    : this.play();
                },
              },
              { key: "trigger", value: function (t, n) {} },
              {
                key: "_adjustOffset",
                value: function () {
                  var t =
                      arguments.length > 0 &&
                      void 0 !== arguments[0] &&
                      arguments[0],
                    n = this.alternate ? 2 * this.duration : this.duration;
                  if (t) {
                    if (!this._rollingBack && 0 === this.offset)
                      return void (this.offset = n);
                    this._rollingBack && (this.offset, this.maxFiniteDuration);
                  }
                  !this._rollingBack ||
                  this.rollbackStartOffset <= this.duration
                    ? 0 !== this.iterations &&
                      (this.offset = Math.min(
                        this.offset,
                        this.maxFiniteDuration
                      ))
                    : ((this.offset =
                        this.rollbackStartOffset -
                        ((this.rollbackStartOffset - this.offset) % n)),
                      (this.rollbackStartOffset = 0));
                },
              },
              {
                key: "reverse",
                value: function () {
                  var t =
                    arguments.length > 0 &&
                    void 0 !== arguments[0] &&
                    arguments[0];
                  if (!this._running)
                    return (
                      this._adjustOffset(t),
                      (this._rollingBack = !this._rollingBack),
                      t && this.play(!1),
                      void this.trigger("reverse", this.offset)
                    );
                  this.pause(!1, !1),
                    this._adjustOffset(),
                    (this._rollingBack = !this._rollingBack),
                    this.play(!1),
                    this.trigger("reverse", this.offset);
                },
              },
            ],
            [
              {
                key: "build",
                value: function (t, n) {
                  delete t.animationSettings,
                    (t.options = dt(t.options, t.root, "5c7f360c")),
                    t.animations.map(function (n) {
                      (n.settings = dt(n.s, t.root, "5c7f360c")),
                        delete n.s,
                        t.animationSettings ||
                          (t.animationSettings = n.settings);
                    });
                  var e = t.version;
                  if (!(t = ft(t, n))) return null;
                  var r = t.options || {},
                    i = new this(t.animations, t.animationSettings, e);
                  return { el: t.svg, options: r, player: i };
                },
              },
              {
                key: "push",
                value: function (t) {
                  return this.build(t);
                },
              },
              {
                key: "init",
                value: function () {
                  var t = this,
                    n =
                      window.__SVGATOR_PLAYER__ &&
                      window.__SVGATOR_PLAYER__["5c7f360c"];
                  Array.isArray(n) &&
                    n.splice(0).forEach(function (n) {
                      return t.build(n);
                    });
                },
              },
            ]
          ),
          t
        );
      })();
    function pt(t) {
      return p(t) + "";
    }
    function mt(t) {
      var n =
        arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : " ";
      return t && t.length ? t.map(pt).join(n) : "";
    }
    function bt(t) {
      return pt(t.x) + "," + pt(t.y);
    }
    function wt(t) {
      return t
        ? null == t.a || t.a >= 1
          ? (function (t) {
              if (!t) return "transparent";
              var n = function (t) {
                return parseInt(t).toString(16).padStart(2, "0");
              };
              return (function (t) {
                for (
                  var n = [], e = "#" === t[0] ? n.push("#") : 0;
                  e < t.length;
                  e += 2
                ) {
                  if (t[e] !== t[e + 1]) return t;
                  n.push(t[e]);
                }
                return n.join("");
              })(
                "#" +
                  n(t.r) +
                  n(t.g) +
                  n(t.b) +
                  (null == t.a || t.a >= 1 ? "" : n(255 * t.a))
              );
            })(t)
          : "rgba(" + t.r + "," + t.g + "," + t.b + "," + t.a + ")"
        : "transparent";
    }
    function At(t) {
      return t ? "url(#" + t + ")" : "none";
    }
    !(function () {
      for (
        var t = 0, n = ["ms", "moz", "webkit", "o"], e = 0;
        e < n.length && !window.requestAnimationFrame;
        ++e
      )
        (window.requestAnimationFrame = window[n[e] + "RequestAnimationFrame"]),
          (window.cancelAnimationFrame =
            window[n[e] + "CancelAnimationFrame"] ||
            window[n[e] + "CancelRequestAnimationFrame"]);
      window.requestAnimationFrame ||
        ((window.requestAnimationFrame = function (n) {
          var e = Date.now(),
            r = Math.max(0, 16 - (e - t)),
            i = window.setTimeout(function () {
              n(e + r);
            }, r);
          return (t = e + r), i;
        }),
        (window.cancelAnimationFrame = window.clearTimeout));
    })();
    var kt = {
        f: null,
        i: G,
        u: function (t, n) {
          return function (e) {
            var r = n(e);
            t.setAttribute("rx", pt(r.x)), t.setAttribute("ry", pt(r.y));
          };
        },
      },
      _t = {
        f: null,
        i: function (t, n, e) {
          return 0 === t
            ? n
            : 1 === t
            ? e
            : {
                width: L(t, n.width, e.width),
                height: L(t, n.height, e.height),
              };
        },
        u: function (t, n) {
          return function (e) {
            var r = n(e);
            t.setAttribute("width", pt(r.width)),
              t.setAttribute("height", pt(r.height));
          };
        },
      };
    Object.freeze({
      M: 2,
      L: 2,
      Z: 0,
      H: 1,
      V: 1,
      C: 6,
      Q: 4,
      T: 2,
      S: 4,
      A: 7,
    });
    var xt = {},
      St = null;
    function Ot(t) {
      var n = (function () {
        if (St) return St;
        if (
          "object" !==
            ("undefined" == typeof document ? "undefined" : e(document)) ||
          !document.createElementNS
        )
          return {};
        var t = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        return t && t.style
          ? ((t.style.position = "absolute"),
            (t.style.opacity = "0.01"),
            (t.style.zIndex = "-9999"),
            (t.style.left = "-9999px"),
            (t.style.width = "1px"),
            (t.style.height = "1px"),
            (St = { svg: t }))
          : {};
      })().svg;
      if (!n)
        return function (t) {
          return null;
        };
      var r = document.createElementNS(n.namespaceURI, "path");
      r.setAttributeNS(null, "d", t),
        r.setAttributeNS(null, "fill", "none"),
        r.setAttributeNS(null, "stroke", "none"),
        n.appendChild(r);
      var i = r.getTotalLength();
      return function (t) {
        var n = r.getPointAtLength(i * t);
        return { x: n.x, y: n.y };
      };
    }
    function Et(t) {
      return xt[t] ? xt[t] : (xt[t] = Ot(t));
    }
    function Mt(t, n, e, r) {
      if (!t || !r) return !1;
      var i = ["M", t.x, t.y];
      if (
        (n &&
          e &&
          (i.push("C"), i.push(n.x), i.push(n.y), i.push(e.x), i.push(e.y)),
        n ? !e : e)
      ) {
        var u = n || e;
        i.push("Q"), i.push(u.x), i.push(u.y);
      }
      return n || e || i.push("L"), i.push(r.x), i.push(r.y), i.join(" ");
    }
    function jt(t, n, e, r) {
      var i =
          arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 1,
        u = Mt(t, n, e, r),
        o = Et(u);
      try {
        return o(i);
      } catch (t) {
        return null;
      }
    }
    function It(t, n, e) {
      return t + (n - t) * e;
    }
    function Bt(t, n, e) {
      var r = arguments.length > 3 && void 0 !== arguments[3] && arguments[3],
        i = { x: It(t.x, n.x, e), y: It(t.y, n.y, e) };
      return r && (i.a = Pt(t, n)), i;
    }
    function Pt(t, n) {
      return Math.atan2(n.y - t.y, n.x - t.x);
    }
    function Nt(t, n, e, r) {
      var i = 1 - r;
      return i * i * t + 2 * i * r * n + r * r * e;
    }
    function Rt(t, n, e, r) {
      return 2 * (1 - r) * (n - t) + 2 * r * (e - n);
    }
    function Tt(t, n, e, r) {
      var i = arguments.length > 4 && void 0 !== arguments[4] && arguments[4],
        u = jt(t, n, null, e, r);
      return (
        u || (u = { x: Nt(t.x, n.x, e.x, r), y: Nt(t.y, n.y, e.y, r) }),
        i && (u.a = Ft(t, n, e, r)),
        u
      );
    }
    function Ft(t, n, e, r) {
      return Math.atan2(Rt(t.y, n.y, e.y, r), Rt(t.x, n.x, e.x, r));
    }
    function Ct(t, n, e, r, i) {
      var u = i * i;
      return (
        i * u * (r - t + 3 * (n - e)) +
        3 * u * (t + e - 2 * n) +
        3 * i * (n - t) +
        t
      );
    }
    function Dt(t, n, e, r, i) {
      var u = 1 - i;
      return 3 * (u * u * (n - t) + 2 * u * i * (e - n) + i * i * (r - e));
    }
    function Lt(t, n, e, r, i) {
      var u = arguments.length > 5 && void 0 !== arguments[5] && arguments[5],
        o = jt(t, n, e, r, i);
      return (
        o ||
          (o = { x: Ct(t.x, n.x, e.x, r.x, i), y: Ct(t.y, n.y, e.y, r.y, i) }),
        u && (o.a = Vt(t, n, e, r, i)),
        o
      );
    }
    function Vt(t, n, e, r, i) {
      return Math.atan2(Dt(t.y, n.y, e.y, r.y, i), Dt(t.x, n.x, e.x, r.x, i));
    }
    function qt(t, n, e) {
      var r = arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
      if (zt(n)) {
        if (Yt(e)) return Tt(n, e.start, e, t, r);
      } else if (zt(e)) {
        if (Ut(n)) return Tt(n, n.end, e, t, r);
      } else {
        if (Ut(n))
          return Yt(e) ? Lt(n, n.end, e.start, e, t, r) : Tt(n, n.end, e, t, r);
        if (Yt(e)) return Tt(n, e.start, e, t, r);
      }
      return Bt(n, e, t, r);
    }
    function Gt(t, n, e) {
      var r = qt(t, n, e, !0);
      return (
        (r.a = A(
          (function (t) {
            return arguments.length > 1 &&
              void 0 !== arguments[1] &&
              arguments[1]
              ? t + Math.PI
              : t;
          })(r.a)
        )),
        r
      );
    }
    function zt(t) {
      return !t.type || "corner" === t.type;
    }
    function Yt(t) {
      return null != t.start && !zt(t);
    }
    function Ut(t) {
      return null != t.end && !zt(t);
    }
    var Wt = new T();
    var $t = {
        f: function (t) {
          return t ? t.join(" ") : "";
        },
        i: function (t, n, r) {
          if (0 === t) return n;
          if (1 === t) return r;
          var i = n.length;
          if (i !== r.length) return C(t, n, r);
          for (var u, o = new Array(i), a = 0; a < i; a++) {
            if ((u = e(n[a])) !== e(r[a])) return C(t, n, r);
            if ("number" === u) o[a] = D(t, n[a], r[a]);
            else {
              if (n[a] !== r[a]) return C(t, n, r);
              o[a] = n[a];
            }
          }
          return o;
        },
      },
      Ht = {
        f: null,
        i: U,
        u: function (t, n) {
          return function (e) {
            var r = n(e);
            t.setAttribute("x1", pt(r[0])),
              t.setAttribute("y1", pt(r[1])),
              t.setAttribute("x2", pt(r[2])),
              t.setAttribute("y2", pt(r[3]));
          };
        },
      },
      Qt = { f: pt, i: D },
      Xt = { f: pt, i: V },
      Jt = {
        f: function (t) {
          var n =
            arguments.length > 1 && void 0 !== arguments[1]
              ? arguments[1]
              : " ";
          return (
            t &&
              t.length > 0 &&
              (t = t.map(function (t) {
                return p(t, 4);
              })),
            mt(t, n)
          );
        },
        i: function (t, n, e) {
          var r,
            i,
            u,
            o = n.length,
            a = e.length;
          if (o !== a)
            if (0 === o) n = W((o = a), 0);
            else if (0 === a) (a = o), (e = W(o, 0));
            else {
              var l =
                (u =
                  ((r = o) * (i = a)) /
                  (function (t, n) {
                    for (var e; n; ) (e = n), (n = t % n), (t = e);
                    return t || 1;
                  })(r, i)) < 0
                  ? -u
                  : u;
              (n = $(n, Math.floor(l / o))),
                (e = $(e, Math.floor(l / a))),
                (o = a = l);
            }
          for (var s = [], f = 0; f < o; f++) s.push(p(L(t, n[f], e[f])));
          return s;
        },
      };
    function Zt(t, n, e) {
      return t.map(function (t) {
        return (function (t, n, e) {
          var r = t.v;
          if (!r || "g" !== r.t || r.s || !r.v || !r.r) return t;
          var i = e.getElementById(r.r),
            u = (i && i.querySelectorAll("stop")) || [];
          return (
            (r.s = r.v.map(function (t, n) {
              var e = u[n] && u[n].getAttribute("offset");
              return { c: t, o: (e = p(parseInt(e) / 100)) };
            })),
            delete r.v,
            t
          );
        })(t, 0, e);
      });
    }
    var Kt = {
      gt: "gradientTransform",
      c: { x: "cx", y: "cy" },
      rd: "r",
      f: { x: "x1", y: "y1" },
      to: { x: "x2", y: "y2" },
    };
    function tn(t, n, r, i, u, o, a, l) {
      return (
        Zt(t, 0, l),
        (n = (function (t, n, e) {
          for (var r, i, u, o = t.length - 1, a = {}, l = 0; l <= o; l++)
            (r = t[l]).e && (r.e = n(r.e)),
              r.v &&
                "g" === (i = r.v).t &&
                i.r &&
                (u = e.getElementById(i.r)) &&
                (a[i.r] = { e: u, s: u.querySelectorAll("stop") });
          return a;
        })(t, i, l)),
        function (i) {
          var u = r(i, t, nn);
          if (!u) return "none";
          if ("c" === u.t) return wt(u.v);
          if ("g" === u.t) {
            if (!n[u.r]) return At(u.r);
            var o = n[u.r];
            return (
              (function (t, n) {
                for (var e = t.s, r = e.length; r < n.length; r++) {
                  var i = e[e.length - 1].cloneNode();
                  (i.id = un(i.id)),
                    t.e.appendChild(i),
                    (e = t.s = t.e.querySelectorAll("stop"));
                }
                for (var u = 0, o = e.length, a = n.length - 1; u < o; u++)
                  e[u].setAttribute("stop-color", wt(n[Math.min(u, a)].c)),
                    e[u].setAttribute("offset", n[Math.min(u, a)].o);
              })(o, u.s),
              Object.keys(Kt).forEach(function (t) {
                if (void 0 !== u[t])
                  if ("object" !== e(Kt[t])) {
                    var n,
                      r =
                        "gt" === t
                          ? ((n = u[t]),
                            Array.isArray(n)
                              ? "matrix(" + n.join(" ") + ")"
                              : "")
                          : u[t],
                      i = Kt[t];
                    o.e.setAttribute(i, r);
                  } else
                    Object.keys(Kt[t]).forEach(function (n) {
                      if (void 0 !== u[t][n]) {
                        var e = u[t][n],
                          r = Kt[t][n];
                        o.e.setAttribute(r, e);
                      }
                    });
              }),
              At(u.r)
            );
          }
          return "none";
        }
      );
    }
    function nn(t, e, r) {
      if (0 === t) return e;
      if (1 === t) return r;
      if (e && r) {
        var i = e.t;
        if (i === r.t)
          switch (e.t) {
            case "c":
              return { t: i, v: Y(t, e.v, r.v) };
            case "g":
              if (e.r === r.r) {
                var u = { t: i, s: en(t, e.s, r.s), r: e.r };
                return (
                  e.gt && r.gt && (u.gt = U(t, e.gt, r.gt)),
                  e.c
                    ? ((u.c = q(t, e.c, r.c)), (u.rd = L(t, e.rd, r.rd)))
                    : e.f &&
                      ((u.f = q(t, e.f, r.f)), (u.to = q(t, e.to, r.to))),
                  u
                );
              }
          }
        if (("c" === e.t && "g" === r.t) || ("c" === r.t && "g" === e.t)) {
          var o = "c" === e.t ? e : r,
            a = "g" === e.t ? n({}, e) : n({}, r),
            l = a.s.map(function (t) {
              return { c: o.v, o: t.o };
            });
          return (a.s = "c" === e.t ? en(t, l, a.s) : en(t, a.s, l)), a;
        }
      }
      return C(t, e, r);
    }
    function en(t, n, e) {
      if (n.length === e.length)
        return n.map(function (n, r) {
          return rn(t, n, e[r]);
        });
      for (var r = Math.max(n.length, e.length), i = [], u = 0; u < r; u++) {
        var o = rn(
          t,
          n[Math.min(u, n.length - 1)],
          e[Math.min(u, e.length - 1)]
        );
        i.push(o);
      }
      return i;
    }
    function rn(t, n, e) {
      return { o: V(t, n.o, e.o || 0), c: Y(t, n.c, e.c || {}) };
    }
    function un(t) {
      return t.replace(/-fill-([0-9]+)$/, function (t, n) {
        return "-fill-" + (+n + 1);
      });
    }
    function on(t, n, e) {
      return 0 === t
        ? n
        : 1 === t
        ? e
        : {
            blur: G(t, n.blur, e.blur),
            offset: q(t, n.offset, e.offset),
            color: Y(t, n.color, e.color),
          };
    }
    var an = {
      blur: G,
      brightness: L,
      contrast: L,
      "drop-shadow": on,
      "inner-shadow": on,
      grayscale: L,
      "hue-rotate": D,
      invert: L,
      opacity: L,
      saturate: L,
      sepia: L,
    };
    function ln(t, n, e) {
      if (0 === t) return n;
      if (1 === t) return e;
      var r = n.length;
      if (r !== e.length) return C(t, n, e);
      for (var i, u = [], o = 0; o < r; o++) {
        if (n[o].type !== e[o].type) return n;
        if (!(i = an[n[o].type])) return C(t, n, e);
        u.push({ type: n.type, value: i(t, n[o].value, e[o].value) });
      }
      return u;
    }
    var sn = {
      blur: function (t) {
        return t
          ? function (n) {
              t.setAttribute("stdDeviation", bt(n));
            }
          : null;
      },
      brightness: function (t, n, e) {
        return (t = cn(e, n))
          ? function (n) {
              (n = pt(n)),
                t.map(function (t) {
                  return t.setAttribute("slope", n);
                });
            }
          : null;
      },
      contrast: function (t, n, e) {
        return (t = cn(e, n))
          ? function (n) {
              var e = pt((1 - n) / 2);
              (n = pt(n)),
                t.map(function (t) {
                  t.setAttribute("slope", n), t.setAttribute("intercept", e);
                });
            }
          : null;
      },
      "drop-shadow": function (t, n, e) {
        var r = e.getElementById(n + "-blur");
        if (!r) return null;
        var i = e.getElementById(n + "-offset");
        if (!i) return null;
        var u = e.getElementById(n + "-flood");
        return u
          ? function (t) {
              r.setAttribute("stdDeviation", bt(t.blur)),
                i.setAttribute("dx", pt(t.offset.x)),
                i.setAttribute("dy", pt(t.offset.y)),
                u.setAttribute("flood-color", wt(t.color));
            }
          : null;
      },
      "inner-shadow": function (t, n, e) {
        var r = e.getElementById(n + "-blur");
        if (!r) return null;
        var i = e.getElementById(n + "-offset");
        if (!i) return null;
        var u = e.getElementById(n + "-color-matrix");
        return u
          ? function (t) {
              r.setAttribute("stdDeviation", bt(t.blur)),
                i.setAttribute("dx", pt(t.offset.x)),
                i.setAttribute("dy", pt(t.offset.y));
              var n = [
                0,
                0,
                0,
                0,
                t.color.r / 255,
                0,
                0,
                0,
                0,
                t.color.g / 255,
                0,
                0,
                0,
                0,
                t.color.b / 255,
                0,
                0,
                0,
                t.color.a,
                0,
              ];
              u.setAttribute("values", mt(n));
            }
          : null;
      },
      grayscale: function (t) {
        return t
          ? function (n) {
              t.setAttribute(
                "values",
                mt(
                  (function (t) {
                    return [
                      0.2126 + 0.7874 * (t = 1 - t),
                      0.7152 - 0.7152 * t,
                      0.0722 - 0.0722 * t,
                      0,
                      0,
                      0.2126 - 0.2126 * t,
                      0.7152 + 0.2848 * t,
                      0.0722 - 0.0722 * t,
                      0,
                      0,
                      0.2126 - 0.2126 * t,
                      0.7152 - 0.7152 * t,
                      0.0722 + 0.9278 * t,
                      0,
                      0,
                      0,
                      0,
                      0,
                      1,
                      0,
                    ];
                  })(n)
                )
              );
            }
          : null;
      },
      "hue-rotate": function (t) {
        return t
          ? function (n) {
              return t.setAttribute("values", pt(n));
            }
          : null;
      },
      invert: function (t, n, e) {
        return (t = cn(e, n))
          ? function (n) {
              (n = pt(n) + " " + pt(1 - n)),
                t.map(function (t) {
                  return t.setAttribute("tableValues", n);
                });
            }
          : null;
      },
      opacity: function (t, n, e) {
        return (t = e.getElementById(n + "-A"))
          ? function (n) {
              return t.setAttribute("tableValues", "0 " + pt(n));
            }
          : null;
      },
      saturate: function (t) {
        return t
          ? function (n) {
              return t.setAttribute("values", pt(n));
            }
          : null;
      },
      sepia: function (t) {
        return t
          ? function (n) {
              return t.setAttribute(
                "values",
                mt(
                  (function (t) {
                    return [
                      0.393 + 0.607 * (t = 1 - t),
                      0.769 - 0.769 * t,
                      0.189 - 0.189 * t,
                      0,
                      0,
                      0.349 - 0.349 * t,
                      0.686 + 0.314 * t,
                      0.168 - 0.168 * t,
                      0,
                      0,
                      0.272 - 0.272 * t,
                      0.534 - 0.534 * t,
                      0.131 + 0.869 * t,
                      0,
                      0,
                      0,
                      0,
                      0,
                      1,
                      0,
                    ];
                  })(n)
                )
              );
            }
          : null;
      },
    };
    var fn = ["R", "G", "B"];
    function cn(t, n) {
      var e = fn.map(function (e) {
        return t.getElementById(n + "-" + e) || null;
      });
      return -1 !== e.indexOf(null) ? null : e;
    }
    var hn = {
        fill: tn,
        "fill-opacity": Xt,
        stroke: tn,
        "stroke-opacity": Xt,
        "stroke-width": Qt,
        "stroke-dashoffset": { f: pt, i: D },
        "stroke-dasharray": Jt,
        opacity: Xt,
        transform: function (t, n, r, i) {
          if (
            !(t = (function (t, n) {
              if (!t || "object" !== e(t)) return null;
              var r = !1;
              for (var i in t)
                t.hasOwnProperty(i) &&
                  (t[i] && t[i].length
                    ? (t[i].forEach(function (t) {
                        t.e && (t.e = n(t.e));
                      }),
                      (r = !0))
                    : delete t[i]);
              return r ? t : null;
            })(t, i))
          )
            return null;
          var u = function (e, i, u) {
            var o =
              arguments.length > 3 && void 0 !== arguments[3]
                ? arguments[3]
                : null;
            return t[e] ? r(i, t[e], u) : n && n[e] ? n[e] : o;
          };
          return n && n.a && t.o
            ? function (n) {
                var e = r(n, t.o, Gt);
                return Wt.recomposeSelf(
                  e,
                  u("r", n, D, 0) + e.a,
                  u("k", n, q),
                  u("s", n, q),
                  u("t", n, q)
                ).toString();
              }
            : function (t) {
                return Wt.recomposeSelf(
                  u("o", t, qt, null),
                  u("r", t, D, 0),
                  u("k", t, q),
                  u("s", t, q),
                  u("t", t, q)
                ).toString();
              };
        },
        "#filter": function (t, n, e, r, i, u, o, a) {
          if (!n.items || !t || !t.length) return null;
          var l = (function (t, n) {
            var e = (t = t.map(function (t) {
              return t && sn[t[0]]
                ? (n.getElementById(t[1]),
                  sn[t[0]](n.getElementById(t[1]), t[1], n))
                : null;
            })).length;
            return function (n) {
              for (var r = 0; r < e; r++) t[r] && t[r](n[r].value);
            };
          })(n.items, a);
          return l
            ? ((t = (function (t, n) {
                return t.map(function (t) {
                  return (t.e = n(t.e)), t;
                });
              })(t, r)),
              function (n) {
                l(e(n, t, ln));
              })
            : null;
        },
        "#line": Ht,
        points: { f: mt, i: U },
        d: $t,
        r: Qt,
        "#size": _t,
        "#radius": kt,
        _: function (t, n) {
          if (Array.isArray(t))
            for (var e = 0; e < t.length; e++) this[t[e]] = n;
          else this[t] = n;
        },
      },
      vn = (function () {
        function t(n, e, i) {
          r(this, t);
          var u = (function (t) {
            var n,
              e,
              r,
              i =
                t &&
                1 ===
                  (null === (n = t.ownerDocument) ||
                  void 0 === n ||
                  null === (e = n.childNodes) ||
                  void 0 === e
                    ? void 0
                    : e.length) &&
                window.parent !== window,
              u = { el: t, window: window };
            if (!i) return u;
            try {
              r = window.parent.document;
            } catch (t) {
              return u;
            }
            return (
              (u.window = window.parent),
              (u.el =
                Array.from(r.querySelectorAll("iframe,object")).filter(
                  function (t) {
                    return t.contentWindow === window;
                  }
                )[0] || u.el),
              u
            );
          })(n);
          (e = Math.max(1, e || 1)),
            (e = Math.min(e, 100)),
            (this.el = u.el),
            (this._handlers = []),
            (this.onThresholdChange = i && i.call ? i : function () {}),
            (this.thresholdPercent = e || 1),
            (this.currentVisibility = null),
            (this.visibilityCalculator = (function (t, n) {
              var e =
                  arguments.length > 2 && void 0 !== arguments[2]
                    ? arguments[2]
                    : e,
                r = !1,
                i = null,
                u = function () {
                  for (
                    var u = 0,
                      o = e.innerHeight,
                      a = 0,
                      l = e.innerWidth,
                      s = t.parentNode;
                    s instanceof Element;

                  ) {
                    var f = e.getComputedStyle(s);
                    if (
                      "visible" !== f.overflowY ||
                      "visible" !== f.overflowX
                    ) {
                      var c = s.getBoundingClientRect();
                      "visible" !== f.overflowY &&
                        ((u = Math.max(u, c.top)), (o = Math.min(o, c.bottom))),
                        "visible" !== f.overflowX &&
                          ((a = Math.max(a, c.left)),
                          (l = Math.min(l, c.right)));
                    }
                    if (s === s.parentNode) break;
                    s = s.parentNode;
                  }
                  r = !1;
                  var h = t.getBoundingClientRect(),
                    v = Math.min(h.height, Math.max(0, u - h.top)),
                    d = Math.min(h.height, Math.max(0, h.bottom - o)),
                    y = Math.min(h.width, Math.max(0, a - h.left)),
                    g = Math.min(h.width, Math.max(0, h.right - l)),
                    p = (h.height - v - d) / h.height,
                    m = (h.width - y - g) / h.width,
                    b = Math.round(p * m * 100);
                  (null !== i && i === b) || ((i = b), n(b));
                };
              return function (t) {
                r && clearTimeout(r),
                  (r = setTimeout(function () {
                    return u();
                  }, 100));
              };
            })(this.el, this.onVisibilityUpdate.bind(this), u.window)),
            this.bindScrollWatchers(),
            this.visibilityCalculator();
        }
        return (
          u(t, [
            {
              key: "bindScrollWatchers",
              value: function () {
                for (
                  var t = this.el.parentNode;
                  t &&
                  (this._handlers.push({
                    element: t,
                    event: "scroll",
                    handler: this.visibilityCalculator,
                  }),
                  t.addEventListener("scroll", this.visibilityCalculator),
                  t !== t.parentNode && t !== document);

                )
                  t = t.parentNode;
              },
            },
            {
              key: "onVisibilityUpdate",
              value: function (t) {
                var n = this.currentVisibility >= this.thresholdPercent,
                  e = t >= this.thresholdPercent;
                if (null === this.currentVisibility || n !== e)
                  return (
                    (this.currentVisibility = t), void this.onThresholdChange(e)
                  );
                this.currentVisibility = t;
              },
            },
            {
              key: "destruct",
              value: function () {
                this._handlers.forEach(function (t) {
                  t.element.removeEventListener(t.event, t.handler);
                });
              },
            },
          ]),
          t
        );
      })(),
      dn = (function () {
        function t() {
          r(this, t);
        }
        return (
          u(t, null, [
            {
              key: "adjustLink",
              value: function (t) {
                var n,
                  e,
                  r =
                    t &&
                    1 ===
                      (null === (n = t.ownerDocument) ||
                      void 0 === n ||
                      null === (e = n.childNodes) ||
                      void 0 === e
                        ? void 0
                        : e.length) &&
                    window.parent !== window,
                  i = null == t ? void 0 : t.firstElementChild;
                r &&
                  i &&
                  "a" === i.tagName &&
                  !i.getAttribute("target") &&
                  i.setAttributeNS(null, "target", "_parent");
              },
            },
            {
              key: "autoPlay",
              value: function (t, n, e) {
                var r =
                  arguments.length > 3 && void 0 !== arguments[3]
                    ? arguments[3]
                    : [];
                if ("click" === e.start) {
                  var i = function () {
                    switch (e.click) {
                      case "freeze":
                        return !t._running && t.reachedToEnd()
                          ? t.restart()
                          : t.toggle();
                      case "restart":
                        return t.offset > 0 ? t.restart() : t.play();
                      case "reverse":
                        return t._running
                          ? t.reverse()
                          : t.reachedToEnd()
                          ? 1 === t.fill
                            ? t.reverse(!0)
                            : t.restart()
                          : t.play();
                      case "none":
                      default:
                        if (t._running) return;
                        return t.reachedToEnd() ? t.restart() : t.play();
                    }
                  };
                  return (
                    r.push({ element: n, event: "click", handler: i }),
                    void n.addEventListener("click", i)
                  );
                }
                if ("hover" === e.start) {
                  var u = function () {
                    return t.reachedToEnd()
                      ? t.restart()
                      : t._rollingBack
                      ? t.reverse()
                      : t.play();
                  };
                  r.push({ element: n, event: "mouseenter", handler: u }),
                    n.addEventListener("mouseenter", u);
                  var o = function () {
                    switch (e.hover) {
                      case "freeze":
                        return t.pause();
                      case "reset":
                        return t.stop();
                      case "reverse":
                        if ((t.reverse(), t._running)) return;
                        return t.play();
                      case "none":
                      default:
                        return;
                    }
                  };
                  return (
                    r.push({ element: n, event: "mouseleave", handler: o }),
                    void n.addEventListener("mouseleave", o)
                  );
                }
                if ("scroll" !== e.start)
                  "programmatic" !== e.start && t.play();
                else {
                  var a = new vn(n, e.scroll || 25, function (n) {
                    n ? (t.reachedToEnd() ? t.restart() : t.play()) : t.pause();
                  });
                  r.push({
                    callback: function () {
                      return a.destruct();
                    },
                  });
                }
              },
            },
          ]),
          t
        );
      })(),
      yn = (function (t) {
        !(function (t, n) {
          if ("function" != typeof n && null !== n)
            throw new TypeError(
              "Super expression must either be null or a function"
            );
          (t.prototype = Object.create(n && n.prototype, {
            constructor: { value: t, writable: !0, configurable: !0 },
          })),
            n && l(t, n);
        })(o, t);
        var n,
          e,
          i =
            ((n = o),
            (e = s()),
            function () {
              var t,
                r = a(n);
              if (e) {
                var i = a(this).constructor;
                t = Reflect.construct(r, arguments, i);
              } else t = r.apply(this, arguments);
              return c(this, t);
            });
        function o() {
          return r(this, o), i.apply(this, arguments);
        }
        return (
          u(o, null, [
            {
              key: "build",
              value: function (t) {
                var n = h(a(o), "build", this).call(this, t, hn);
                if (!n) return null;
                var e = n.el,
                  r = n.options,
                  i = n.player;
                dn.adjustLink(e), dn.autoPlay(i, e, r);
              },
            },
          ]),
          o
        );
      })(gt);
    return yn.init(), yn;
  });
  (function (s, i, o, w, d, a, b) {
    w[o] = w[o] || {};
    w[o][s] = w[o][s] || [];
    w[o][s].push(i);
  })(
    "5c7f360c",
    {
      root: "eJjLYS6INhE1",
      version: "2024-09-05",
      animations: [
        {
          elements: {
            eJjLYS6INhE4: {
              transform: {
                data: { s: { x: 1.02712, y: 1 } },
                keys: {
                  o: [
                    {
                      t: 0,
                      v: { x: 199.765304, y: 479.148632, type: "corner" },
                    },
                    {
                      t: 200,
                      v: { x: 199.182448, y: 496.308617, type: "corner" },
                    },
                    {
                      t: 900,
                      v: { x: 133.180131, y: 553.939269, type: "corner" },
                    },
                  ],
                },
              },
            },
            eJjLYS6INhE6: {
              transform: {
                keys: {
                  o: [
                    {
                      t: 10,
                      v: { x: 258.838027, y: 480.795585, type: "corner" },
                    },
                    {
                      t: 400,
                      v: { x: 254.386707, y: 480.795585, type: "corner" },
                    },
                    {
                      t: 1300,
                      v: { x: 153.975369, y: 645.988431, type: "corner" },
                    },
                    {
                      t: 2790,
                      v: { x: 149.919257, y: 645.034052, type: "corner" },
                    },
                  ],
                },
              },
            },
            eJjLYS6INhE8: {
              transform: {
                keys: {
                  o: [
                    { t: 1700, v: { x: 542, y: 479.663422, type: "corner" } },
                    {
                      t: 2900,
                      v: { x: 143.703847, y: 1020.724291, type: "corner" },
                    },
                  ],
                },
              },
            },
            eJjLYS6INhE10: {
              transform: {
                keys: {
                  o: [
                    {
                      t: 600,
                      v: { x: 285.959342, y: 479.27755, type: "corner" },
                    },
                    {
                      t: 1700,
                      v: { x: 180.956128, y: 679.137432, type: "corner" },
                    },
                    {
                      t: 1900,
                      v: { x: 138.204019, y: 713.733151, type: "corner" },
                    },
                    {
                      t: 3000,
                      v: { x: 134.453067, y: 712.98296, type: "corner" },
                    },
                  ],
                },
              },
            },
            eJjLYS6INhE12: {
              transform: {
                keys: {
                  o: [
                    { t: 1000, v: { x: 346, y: 479.91761, type: "corner" } },
                    {
                      t: 1900,
                      v: { x: 141.719399, y: 782.601793, type: "corner" },
                    },
                    {
                      t: 2800,
                      v: { x: 136.610344, y: 781.239378, type: "corner" },
                    },
                  ],
                },
              },
            },
            eJjLYS6INhE14: {
              transform: {
                keys: {
                  o: [
                    { t: 1300, v: { x: 432, y: 479.663422, type: "corner" } },
                    {
                      t: 2300,
                      v: { x: 140.708689, y: 878.140246, type: "corner" },
                    },
                  ],
                },
              },
            },
            eJjLYS6INhE16: {
              transform: {
                keys: {
                  o: [
                    { t: 1400, v: { x: 487, y: 479.663422, type: "corner" } },
                    {
                      t: 2600,
                      v: { x: 141.575777, y: 949.691929, type: "corner" },
                    },
                  ],
                },
              },
            },
            eJjLYS6INhE24: {
              transform: {
                data: {
                  o: { x: 135.33781, y: 207.03926, type: "corner" },
                  t: { x: -135.33781, y: -207.03926 },
                },
                keys: {
                  r: [
                    { t: 0, v: 720, e: [0.415, 0.08, 0.115, 0.955] },
                    { t: 7700, v: 0, e: [1, 0] },
                  ],
                },
              },
              fill: [
                { t: 0, v: { t: "c", v: { r: 210, g: 219, b: 237, a: 1 } } },
                { t: 7700, v: { t: "c", v: { r: 210, g: 219, b: 236, a: 1 } } },
              ],
            },
            eJjLYS6INhE25: {
              transform: {
                data: {
                  o: { x: 11.12, y: 29.9, type: "corner" },
                  s: { x: 0.3, y: 0.3 },
                  t: { x: -95.902813, y: -108.465 },
                },
                keys: {
                  r: [
                    { t: 0, v: -720, e: [0.415, 0.08, 0.115, 0.955] },
                    { t: 7700, v: 0, e: [1, 0] },
                  ],
                },
              },
            },
          },
          s: "MIDA1ZGI5NjBhMmIzYjJA5ZmIyYTdhZGFjNjAM3ODcxNmU2ZVI2ZTZhYNjBhMk5hN2IwTWEzYHTFiMmE3YWRQYWM2MDTc4TjZmNmE2MEphN2IUyYTNiMDlmYjJhN2FkOYWNiMTYwNzg2ZjZhNBjBhNGE3YWFhYTYwNzCg2ZjZhNjA5ZmFhYjJAhM2IwWGFjOWZiMmEzTNjA3OGE0TzlmYWFiMHWEzNmE2MGIxYWVhM2MEzYTI2MDc4NmY2YTYWwYTRhZWIxNjA3ODZmXNmU2ZWJi",
        },
      ],
      options: "MEDAxMDg4MmY4MDgxNmBVHN2Y4MTJmNDcyZjcF5N2NINmU3MTJmOGE/J",
    },
    "__SVGATOR_PLAYER__",
    window,
    document
  );
}
