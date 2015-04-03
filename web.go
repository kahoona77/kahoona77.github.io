package main

import (
	"flag"
	"fmt"
	"io/ioutil"
	"net/http"
	"strings"

	"github.com/zenazn/goji"
)


func main() {

	// Setup static files

	//http.Handle("/", http.FileServer(http.Dir("/")))
	goji.Handle("/*", http.FileServer(http.Dir("./")))
	goji.NotFound(notFound)

	// bind := fmt.Sprintf("%s:%s", os.Getenv("HOST"), os.Getenv("PORT"))
	bind := ":8080"
	flag.Set("bind", bind)
	goji.Serve()
}

func notFound(w http.ResponseWriter, r *http.Request) {
	p := r.URL.Path
	fmt.Printf("url: %v", p)
	if p == "/" || strings.HasPrefix(p, "/home") {
		body, _ := ioutil.ReadFile("./index.html")
		fmt.Fprintf(w, string(body))
		return
	}
	if strings.HasPrefix(p, "/admin") {
		body, _ := ioutil.ReadFile("./admin/index.html")
		fmt.Fprintf(w, string(body))
		return
	}
	w.WriteHeader(http.StatusNotFound)
	fmt.Fprintf(w, "404 Not found.")
}
