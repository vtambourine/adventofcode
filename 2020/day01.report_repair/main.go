package main

import (
	"bufio"
	"io/ioutil"
	"log"
	"strconv"
	"strings"
)

const TARGET_SUM = 2020

func twoSum(input []int) int {
	index := make(map[int]int)
	for _, n := range input {
		if m, ok := index[n]; ok {
			return n * m
		}
		index[TARGET_SUM-n] = n
	}

	return 0
}
func threeSum(input []int) int {
	index := make(map[int]int)
	for _, n := range input {
		index[n] = n
	}

	for i := 0; i < len(input); i++ {
		for j := i + 1; j < len(input); j++ {
			d := TARGET_SUM - (input[i] + input[j])
			if m, ok := index[d]; ok {
				return m * input[i] * input[j]
			}
		}
	}

	return 0
}

func main() {
	file, err := ioutil.ReadFile("day01.input")
	if err != nil {
		log.Fatalf("Unable to read file file: %v", err)
		return
	}

	scanner := bufio.NewScanner(strings.NewReader(string(file)))
	scanner.Split(bufio.ScanWords)
	input := make([]int, 0)
	for scanner.Scan() {
		n, _ := strconv.Atoi(strings.TrimSpace(scanner.Text()))
		input = append(input, n)
	}

	println("1:", twoSum(input))
	println("2:", threeSum(input))
}
