#!Makefile

HUGO=hugo-extended
HUGO_NUMWORKERMULTIPLIER=64
HUGO_MEMORYLIMIT=32
BUILDNAME:=$(shell git rev-parse --abbrev-ref HEAD)
BASEURL:=$(shell basename `pwd` | sed 's/_/./g')
BRANCHES:=$(shell git branch -r | sed 's/origin\///g' | sed 's/pr\//pr-/' | sed '/HEAD/d' | sed '/master/d' | sed '/main/d')
BRANCHNAMES:=$(foreach branch,$(BRANCHES),$(branch))

default all: build

.PHONY: build
build:
	HUGO_NUMWORKERMULTIPLIER=$(HUGO_NUMWORKERMULTIPLIER) HUGO_MEMORYLIMIT=$(HUGO_MEMORYLIMIT) $(HUGO) --environment=production --minify --templateMetrics --logLevel info
	@find public/ -name '*.html' ! -name '*.gz' -type f -exec sh -c "gzip -c -9 < {} > {}.gz" \;
	@find public/ -name '*.css' ! -name '*.gz' -type f -exec sh -c "gzip -c -9 < {} > {}.gz" \;
	@find public/ -name '*.js' ! -name '*.gz' -type f -exec sh -c "gzip -c -9 < {} > {}.gz" \;

.PHONY: build-staging
build-staging:
	rm -rf builds/*
	@for branch in $(BRANCHNAMES) ; do \
		echo -e "Building branch \e[1;33m"$${branch}"\e[0m" ; \
		git checkout $${branch} ; \
		git pull ; \
		$(HUGO) --environment=production --minify --templateMetrics --baseURL https://$(BASEURL)/$${branch}/ --destination builds/$${branch} ; \
	done
	@git checkout master

.PHONY: test
test: clean
	HUGO_NUMWORKERMULTIPLIER=$(HUGO_NUMWORKERMULTIPLIER) HUGO_MEMORYLIMIT=$(HUGO_MEMORYLIMIT) $(HUGO) --environment=development --minify --printMemoryUsage --printPathWarnings --printUnusedTemplates --templateMetrics --templateMetricsHints --logLevel debug

.PHONY: draft
draft:
	$(HUGO) --environment=development --minify --buildDrafts --buildFuture --buildExpired

.PHONY: debug
debug:
	$(HUGO) --debug

.PHONY: serve
serve:
	$(HUGO) server --environment=development --port 1314 --watch --noHTTPCache --disableFastRender

.PHONY: servedraft
servedraft:
	$(HUGO) server --environment=development --port 1314 --watch --noHTTPCache --disableFastRender --buildDrafts --buildFuture --buildExpired

.PHONY: clean
clean:
	@rm -rf public/
	@rm -rf builds/
	@rm -rf resources/
