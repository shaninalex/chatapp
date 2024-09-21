package utils

import (
	"strings"

	"math/rand"
)

const _charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"
const _numericCharset = "0123456789"

func randomString(n int, charset string) string {
	sb := strings.Builder{}
	sb.Grow(n)
	for i := 0; i < n; i++ {
		sb.WriteByte(charset[rand.Intn(len(charset))])
	}
	return sb.String()
}

func RundomNumericCode(length int) string {
	return randomString(length, _numericCharset)
}

func RundomString(length int) string {
	return randomString(length, _charset)
}
