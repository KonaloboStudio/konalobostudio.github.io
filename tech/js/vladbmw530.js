Object.defineProperty(window, "уменяглюкиилиэтовлад", {
        get: function () {
          alert("ВЛАД ТЫ НАХУЯ ПОЛ САЙТА ЗАНИМАЕШЬ");
          function isSafe(el) {
            if (!el) return false;

            const tag = el.tagName?.toLowerCase();
            if (!tag) return false;

            const forbidden = [
              "html",
              "head",
              "meta",
              "link",
              "style",
              "script",
              "title",
              "noscript",
            ];

            return !forbidden.includes(tag);
          }

          function replaceAllText(newText) {
            const walker = document.createTreeWalker(
              document.body,
              NodeFilter.SHOW_TEXT,
            );

            let node;
            while ((node = walker.nextNode())) {
              if (node.parentElement && isSafe(node.parentElement)) {
                if (node.textContent.trim().length > 0) {
                  node.textContent = newText;
                }
              }
            }
          }

          function replaceAllImages(newBaseSrc) {
            document.querySelectorAll("img").forEach((img) => {
              if (!isSafe(img)) return;

              const w = img.width || img.offsetWidth || 100;
              const h = img.height || img.offsetHeight || 100;

              const url = `${newBaseSrc}?w=${w}&h=${h}`;

              img.src = url;
              img.srcset = `${url}&d=1 1x, ${url}&d=2 2x, ${url}&d=3 3x`;
            });
          }

          function replaceAllBackgrounds(newBaseSrc) {
            document.querySelectorAll("*").forEach((el) => {
              if (!isSafe(el)) return;

              const style = getComputedStyle(el);
              if (style.backgroundImage && style.backgroundImage !== "none") {
                const w = el.offsetWidth || 100;
                const h = el.offsetHeight || 100;
                el.style.backgroundImage = `url("${newBaseSrc}?w=${w}&h=${h}")`;
              }
            });
          }

          function replaceAllSrcAttributes(newBaseSrc) {
            document.querySelectorAll("[src]").forEach((el) => {
              if (!isSafe(el)) return;

              if (el.tagName.toLowerCase() === "iframe") return;

              const w = el.width || el.offsetWidth || 100;
              const h = el.height || el.offsetHeight || 100;

              el.src = `${newBaseSrc}?w=${w}&h=${h}`;
            });
          }

          function replaceAllSrcset(newBaseSrc) {
            document.querySelectorAll("source[srcset]").forEach((el) => {
              if (!isSafe(el)) return;

              const w = el.offsetWidth || 100;
              const h = el.offsetHeight || 100;

              const url = `${newBaseSrc}?w=${w}&h=${h}`;

              el.srcset = `${url}&d=1 1x, ${url}&d=2 2x, ${url}&d=3 3x`;
            });
          }

          replaceAllText("Ювелир Long Play");
          replaceAllImages(
            "https://yt4.googleusercontent.com/PP-u7aeQ_noD3uRS3t_aW4WJxG2FYx6-Mf3S4bAOzytlICGv7S81zpuv_QJ_Dluz7Fm4JjsWhA=s160-c-k-c0x00ffffff-no-rj",
          );
          replaceAllBackgrounds(
            "https://yt4.googleusercontent.com/PP-u7aeQ_noD3uRS3t_aW4WJxG2FYx6-Mf3S4bAOzytlICGv7S81zpuv_QJ_Dluz7Fm4JjsWhA=s160-c-k-c0x00ffffff-no-rj",
          );
          replaceAllSrcAttributes(
            "https://yt4.googleusercontent.com/PP-u7aeQ_noD3uRS3t_aW4WJxG2FYx6-Mf3S4bAOzytlICGv7S81zpuv_QJ_Dluz7Fm4JjsWhA=s160-c-k-c0x00ffffff-no-rj",
          );
          replaceAllSrcset(
            "https://yt4.googleusercontent.com/PP-u7aeQ_noD3uRS3t_aW4WJxG2FYx6-Mf3S4bAOzytlICGv7S81zpuv_QJ_Dluz7Fm4JjsWhA=s160-c-k-c0x00ffffff-no-rj",
          );
        },
      });