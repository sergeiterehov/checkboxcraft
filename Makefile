build:
	docker build -t sergeiterehov/checkboxcraft .

build_linux:
	docker build --platform linux/amd64 -t sergeiterehov/checkboxcraft .

run:
	docker run --rm -t --name checkboxcraft -p 8080:8080 -d sergeiterehov/checkboxcraft