package main

import (
	"bufio"
	"io/ioutil"
	"log"
	"strconv"
	"strings"
)

type policy struct {
	char rune
	min  int
	max  int
}

func parsePolicy(input string) policy {
	parts := strings.Split(input, " ")
	minMax := strings.Split(parts[0], "-")

	min, err := strconv.Atoi(minMax[0])
	if err != nil {
		panic(err)
	}

	max, err := strconv.Atoi(minMax[1])
	if err != nil {
		panic(err)
	}

	return policy{
		char: rune(parts[1][0]),
		min:  min,
		max:  max,
	}
}

func (p policy) valid(password string) bool {
	c := 0
	for _, r := range password {
		if r == p.char {
			c++
		}
	}
	return c >= p.min && c <= p.max
}

func (p policy) validNew(password string) bool {
	return (rune(password[p.min-1]) == p.char) != (rune(password[p.max-1]) == p.char)
}

func main() {
	file, err := ioutil.ReadFile("./day02.input")
	if err != nil {
		log.Fatalf("Unable to read input file: %v", err)
	}

	count1 := 0
	count2 := 0

	scanner := bufio.NewScanner(strings.NewReader(string(file)))
	scanner.Split(bufio.ScanLines)
	for scanner.Scan() {
		line := scanner.Text()
		parts := strings.Split(line, ": ")
		if parsePolicy(parts[0]).valid(parts[1]) {
			count1++
		}
		if parsePolicy(parts[0]).validNew(parts[1]) {
			count2++
		}
	}

	println("Total number of valid passwords:", count1)
	println("Total number of valid passwords:", count2)
}
